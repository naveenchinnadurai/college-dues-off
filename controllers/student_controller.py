from fastapi import HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import Annotated
from .schemas import (
    StudentCreate,
    StudentResponse,
    NoDuesRequestResponse,
    OndutyRequestBase
)
from db.models import Student, NoDuesRequest, ClassStaffSubject, BonafideRequest, AdvisorBonafideApproval, HODBonafideApproval, RequestStatus, OnDutyRequest, AdvisorOnDutyApproval, HODOnDutyApproval
from db.database import get_db
from uuid import UUID
from datetime import datetime

db_type = Annotated[AsyncSession, Depends(get_db)]

# ----------- Get All Students ----------- #
async def get_all_students(db: db_type):
    result = await db.execute(select(Student))
    students = result.scalars().all()
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    return JSONResponse(content=jsonable_encoder([StudentResponse.model(s) for s in students]))

# ----------- Get Student By ID ----------- #
async def get_student_by_id(id: str, db: db_type):
    result = await db.execute(select(Student).filter(Student.reg_no == id))
    student = result.scalars().first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return JSONResponse(content=jsonable_encoder(StudentResponse.from_orm(student)))

# ----------- Update Student ----------- #
async def update_student(id: str, student_data: StudentCreate, db: db_type):
    result = await db.execute(select(Student).filter(Student.reg_no == id))
    student = result.scalars().first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    for key, value in student_data.model_dump().items():
        setattr(student, key, value)

    db.add(student)
    await db.commit()
    await db.refresh(student)
    return JSONResponse(content=jsonable_encoder(StudentResponse.model_validate(student)))

# ----------- Request No Dues ----------- #
async def request_no_dues(id: str, db: db_type):
    async with db.begin():
        student = await db.get(Student, id)
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        class_staff_subjects = await db.execute(
            select(ClassStaffSubject)
            .options(selectinload(ClassStaffSubject.staff), selectinload(ClassStaffSubject.subject))
            .filter(ClassStaffSubject.class_id == student.class_id)
        )
        class_staff_subjects = class_staff_subjects.scalars().all()

        for link in class_staff_subjects:
            if not await db.execute(
                select(NoDuesRequest)
                .filter(
                    NoDuesRequest.student_id == id,
                    NoDuesRequest.subject_id == link.subject_id,
                    NoDuesRequest.staff_id == link.staff_id
                )
            ).scalars().first():
                new_request = NoDuesRequest(
                    student_id=id,
                    subject_id=link.subject_id,
                    staff_id=link.staff_id,
                    created_on=datetime.now(),
                )
                db.add(new_request)
        await db.commit()

    return JSONResponse(
        content={
            "message": "No dues request created successfully",
            "data": jsonable_encoder([NoDuesRequestResponse.model_validate(r) for r in class_staff_subjects])},
        status_code=201
    )

# ----------- View No Dues Requests ----------- #
async def view_no_dues(id: str, db: db_type):
    result = await db.execute(select(Student).filter(Student.reg_no == id))
    student = result.scalars().first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    result = await db.execute(select(NoDuesRequest).filter(NoDuesRequest.student_id == id))
    requests = result.scalars().all()
    return JSONResponse(
        content=jsonable_encoder([NoDuesRequestResponse.model_validate(r) for r in requests])
    )
    
# ----------- Create Bonafide Request ----------- #

async def create_bonafide_request(student_id: str, bonafide_type: str, purpose: str, message: str, db: AsyncSession):
    # Fetch student with class and advisor info
    result = await db.execute(
        select(Student)
        .filter(Student.reg_no == student_id)
        .options(selectinload(Student.class_).selectinload("advisor_obj"))
    )
    student = result.scalars().first()

    if not student or not student.class_ or not student.class_.advisor:
        raise HTTPException(status_code=404, detail="Student or advisor not found")

    # Create bonafide request
    bonafide_request = BonafideRequest(
        bonafide_type=bonafide_type,
        purpose=purpose,
        message=message,
        student_id=student_id,
        created_on=datetime.now()
    )
    db.add(bonafide_request)
    await db.flush()  # to get bonafide_request.id

    # Create advisor approval
    advisor_approval = AdvisorBonafideApproval(
        bonafide_id=bonafide_request.id,
        staff_id=student.class_.advisor,
        status=RequestStatus.Pending,
        updated_on=datetime.now(),
        message=""
    )
    db.add(advisor_approval)
    await db.commit()
    return {"message": "Bonafide request submitted with advisor approval pending"}

# ----------- Generate HOD Approval ----------- #

async def generate_hod_approval(bonafide_id: UUID, db: AsyncSession):
    # Get bonafide + advisor approval
    result = await db.execute(
        select(BonafideRequest)
        .filter(BonafideRequest.id == bonafide_id)
        .options(selectinload(BonafideRequest.student).selectinload(Student.class_).selectinload("department_obj"))
    )
    bonafide = result.scalars().first()

    if not bonafide:
        raise HTTPException(status_code=404, detail="Bonafide request not found")

    advisor_status = bonafide.advisor_approval[0].status if bonafide.advisor_approval else None
    if advisor_status != RequestStatus.Approved:
        raise HTTPException(status_code=400, detail="Advisor approval not yet approved")

    hod_id = bonafide.student.class_.department_obj.HOD
    if not hod_id:
        raise HTTPException(status_code=404, detail="HOD not assigned")

    # Check if HOD approval already exists
    result = await db.execute(
        select(HODBonafideApproval).filter(HODBonafideApproval.bonafide_id == bonafide_id)
    )
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="HOD approval already exists")

    # Create HOD approval
    hod_approval = HODBonafideApproval(
        bonafide_id=bonafide_id,
        staff_id=hod_id,
        status=RequestStatus.Pending,
        updated_on=datetime.now(),
        message=""
    )
    db.add(hod_approval)
    await db.commit()
    return {"message": "HOD approval created successfully"}

# ----------- Get Bonafide Approval Status ----------- #

async def get_bonafide_approval_status(bonafide_id: UUID, db: AsyncSession):
    result = await db.execute(
        select(BonafideRequest)
        .filter(BonafideRequest.id == bonafide_id)
        .options(
            selectinload(BonafideRequest.advisor_approval),
            selectinload(BonafideRequest.hod_approval)
        )
    )
    bonafide = result.scalars().first()
    if not bonafide:
        raise HTTPException(status_code=404, detail="Bonafide request not found")

    advisor = bonafide.advisor_approval[0] if bonafide.advisor_approval else None
    hod = bonafide.hod_approval[0] if bonafide.hod_approval else None

    return {
        "advisor_status": advisor.status if advisor else "Not created",
        "hod_status": hod.status if hod else "Not created"
    }


# ----------- Create On Duty Request ----------- #

async def create_on_duty_request(student_id: str, onduty_request: OndutyRequestBase ,db: AsyncSession):
    # Fetch student with class and advisor info
    result = await db.execute(
        select(Student)
        .filter(Student.reg_no == student_id)
        .options(selectinload(Student.class_).selectinload("advisor_obj"))
    )
    student = result.scalars().first()

    if not student or not student.class_ or not student.class_.advisor:
        raise HTTPException(status_code=404, detail="Student or advisor not found")

    # Create on duty request
    on_duty_request = OnDutyRequest(
        **onduty_request.model_dump(),
        student_id=student_id,
        created_on=datetime.now()
    )
    db.add(on_duty_request)
    await db.flush()  # to get on_duty_request.id

    # Create advisor approval
    advisor_approval = AdvisorOnDutyApproval(
        onduty_id=on_duty_request.id,
        staff_id=student.class_.advisor,
        status=RequestStatus.Pending,
        updated_on=datetime.now(),
        message=""
    )
    db.add(advisor_approval)
    await db.commit()

    return {"message": "On duty request submitted with advisor approval pending"}

# ----------- Generate HOD Approval for On Duty ----------- #

async def generate_hod_approval_for_on_duty(on_duty_id: UUID, db: AsyncSession):
    # Get on duty request + advisor approval
    result = await db.execute(
        select(OnDutyRequest)
        .filter(OnDutyRequest.id == on_duty_id)
        .options(selectinload(OnDutyRequest.student).selectinload(Student.class_).selectinload("department_obj"))
    )
    on_duty_request = result.scalars().first()

    if not on_duty_request:
        raise HTTPException(status_code=404, detail="On duty request not found")

    advisor_status = on_duty_request.advisor_approval[0].status if on_duty_request.advisor_approval else None
    if advisor_status != RequestStatus.Approved:
        raise HTTPException(status_code=400, detail="Advisor approval not yet approved")

    hod_id = on_duty_request.student.class_.department_obj.HOD
    if not hod_id:
        raise HTTPException(status_code=404, detail="HOD not assigned")

    # Check if HOD approval already exists
    result = await db.execute(
        select(HODOnDutyApproval).filter(HODOnDutyApproval.onduty_id == on_duty_id)
    )
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="HOD approval already exists")

    # Create HOD approval
    hod_approval = HODOnDutyApproval(
        onduty_id=on_duty_id,
        staff_id=hod_id,
        status=RequestStatus.Pending,
        updated_on=datetime.now(),
        message=""
    )
    db.add(hod_approval)
    await db.commit()

    return {"message": "HOD approval created successfully"}

# ----------- Get On Duty Approval Status ----------- #

async def get_on_duty_approval_status(on_duty_id: UUID, db: AsyncSession):
    result = await db.execute(
        select(OnDutyRequest)
        .filter(OnDutyRequest.id == on_duty_id)
        .options(
            selectinload(OnDutyRequest.advisor_approval),
            selectinload(OnDutyRequest.hod_approval)
        )
    )
    on_duty_request = result.scalars().first()
    if not on_duty_request:
        raise HTTPException(status_code=404, detail="On duty request not found")

    advisor = on_duty_request.advisor_approval[0] if on_duty_request.advisor_approval else None
    hod = on_duty_request.hod_approval[0] if on_duty_request.hod_approval else None

    return {
        "advisor_status": advisor.status if advisor else "Not created",
        "hod_status": hod.status if hod else "Not created"
    }


