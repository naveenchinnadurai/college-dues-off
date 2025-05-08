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
    NoDuesRequestResponse
)
from db.models import Student, NoDuesRequest, Subject, ClassStaffSubject
from db.database import get_db
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
