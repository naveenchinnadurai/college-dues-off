from fastapi import HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Annotated
from .schemas import StaffResponse , NoDuesRequestResponse
from db.models import Staff, NoDuesRequest,OnDutyRequest,AdvisorOnDutyApproval,HODOnDutyApproval,BonafideRequest,AdvisorBonafideApproval,HODBonafideApproval, ClassStaffSubject, Subject, Class, Announcement, Attendance
from .schemas import AnnouncementCreate, AnnouncementResponse, Attendance, OnDutyRequestResponse, BonafideRequestResponse, ApprovalResponse
from db.database import get_db
from uuid import UUID

db_type = Annotated[AsyncSession, Depends(get_db)]
        

async def get_all_staff(db: db_type):
    async with db as session:
        result = await session.execute(select(Staff))
        staff = result.scalars().all()
        return JSONResponse(
            content=jsonable_encoder([StaffResponse.model_validate(s) for s in staff])
        )


async def view_no_dues_requests(id: str, db: db_type):
    print(id)
    async with db as session:
        staff = await session.execute(select(Staff).filter(Staff.id == id))
        staff = staff.scalars().first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        result = await session.execute(
            select(NoDuesRequest)
            .join(ClassStaffSubject, NoDuesRequest.subject_id == ClassStaffSubject.subject_id)
            .filter(ClassStaffSubject.staff_id == staff.id)
        )
        requests = result.scalars().all()
        return JSONResponse(
            content=jsonable_encoder([NoDuesRequestResponse.model_validate(request) for request in requests])
        )

async def manage_no_dues_requests(
    id: str, 
    request_id: int, 
    status: str,
    db: db_type
):
    async with db as session:
        staff = await session.execute(select(Staff).filter(Staff.id == id))
        staff = staff.scalars().first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        request = await session.execute(select(NoDuesRequest).filter(NoDuesRequest.id == request_id))
        request = request.scalars().first()
        if not request:
            raise HTTPException(status_code=404, detail="Request not found")
        if status not in ["Approved", "Rejected", "Pending"]:
            raise HTTPException(status_code=400, detail="Invalid status")
        request.status = status
        await session.commit()
        return JSONResponse(
            content=jsonable_encoder(NoDuesRequestResponse.model_validate(request))
        )

async def view_on_duty_requests(id: UUID, db: db_type):
    async with db as session:
        staff = await session.execute(select(Staff).filter(Staff.id == id))
        staff = staff.scalars().first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        result_advisor = await session.execute(
            select(AdvisorOnDutyApproval)
            .filter(AdvisorOnDutyApproval.staff_id == staff.id)
        ).scalars().all()
        result_hod = await session.execute(
            select(HODOnDutyApproval)
            .filter(HODOnDutyApproval.staff_id == staff.id)
        ).scalars().all()
        
        if result_advisor:
            approvals = result_advisor
        elif result_hod:
            approvals = result_hod
        else:
            raise HTTPException(status_code=404, detail="No requests found")
        
        on_duty_requests_hod = await session.execute(
            select(OnDutyRequest)
            .join(HODOnDutyApproval, OnDutyRequest.id == HODOnDutyApproval.onduty_id)
            .filter(HODOnDutyApproval.staff_id == staff.id)
        ).scalars().all()
        on_duty_requests_advisor = await session.execute(
            select(OnDutyRequest)
            .join(AdvisorOnDutyApproval, OnDutyRequest.id == AdvisorOnDutyApproval.onduty_id)
            .filter(AdvisorOnDutyApproval.staff_id == staff.id)
        ).scalars().all()
        if on_duty_requests_hod:
            on_duty_requests = on_duty_requests_hod
        elif on_duty_requests_advisor:  
            on_duty_requests = on_duty_requests_advisor
        else:
            raise HTTPException(status_code=404, detail="No requests found")
        return JSONResponse(
            content={
                    "approvals": jsonable_encoder([ApprovalResponse.model_validate(approval) for approval in approvals]),
                     "requests": jsonable_encoder([OnDutyRequestResponse.model_validate(request) for request in on_duty_requests])
            }
        )
async def view_Bonafide_requests(id: UUID, db: db_type):
    async with db as session:
        staff = await session.execute(select(Staff).filter(Staff.id == id))
        staff = staff.scalars().first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        result_advisor = await session.execute(
            select(AdvisorBonafideApproval)
            .filter(AdvisorBonafideApproval.staff_id == staff.id)
        ).scalars().all()
        result_hod = await session.execute(
            select(HODBonafideApproval)
            .filter(HODBonafideApproval.staff_id == staff.id)
        ).scalars().all()

        if result_advisor:
            approvals = result_advisor
        elif result_hod:
            approvals = result_hod
        else:
            raise HTTPException(status_code=404, detail="No requests found")

        bonafide_requests_advisor = await session.execute(
            select(BonafideRequest)
            .join(AdvisorBonafideApproval, BonafideRequest.id == AdvisorBonafideApproval.bonafide_id)
            .filter(AdvisorBonafideApproval.staff_id == staff.id)
        ).scalars().all()
        bonafide_requests_hod = await session.execute(
            select(BonafideRequest)
            .join(HODBonafideApproval, BonafideRequest.id == HODBonafideApproval.bonafide_id)
            .filter(HODBonafideApproval.staff_id == staff.id)
        ).scalars().all()
        if bonafide_requests_hod:
            bonafide_requests = bonafide_requests_hod
        elif bonafide_requests_advisor:
            bonafide_requests = bonafide_requests_advisor
        else:
            raise HTTPException(status_code=404, detail="No requests found")
        return JSONResponse(
            content={
                    "approvals": jsonable_encoder([ApprovalResponse.model_validate(approval) for approval in approvals]),
                     "requests": jsonable_encoder([BonafideRequestResponse.model_validate(request) for request in bonafide_requests])
            }
        )

async def create_announcement(
    id: UUID, 
    announcement_data: AnnouncementCreate,
    db: db_type
):
    async with db as session:
        staff = await session.execute(select(Staff).filter(Staff.id == id))
        staff = staff.scalars().first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        
        announcement = Announcement(**announcement_data.model_dump(),author=staff.id)
        session.add(announcement)
        await session.commit()
        return JSONResponse(
            content=jsonable_encoder(AnnouncementResponse.model_validate(announcement))
        )
        
# -------------------- Attendance ----------------
async def Create_Attendance(
    id: str,
    class_id: str,
    date: str,
    attendance_data: List[Attendance],
    db: db_type
):
    async with db as session:
        staff = await session.execute(select(Staff).filter(Staff.id == id))
        staff = staff.scalars().first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        
        attendance = Attendance(
            class_id=class_id,
            date=date,
            attendance_data=attendance_data
        )
        session.add(attendance)
        await session.commit()
        return JSONResponse(
            content=jsonable_encoder(attendance)
        )

        
# async def get_staff_by_id(id: str, db: db_type):
#     with db as session:
#         staff = session.query(Staff).filter(Staff.email == id).first()
#         if not staff:
#             raise HTTPException(status_code=404, detail="Staff not found")
        
#         return JSONResponse(
#             content=jsonable_encoder(StaffResponse.from_orm(staff))
#         )

# async def update_staff(id: str, staff_data: StaffCreate, db: db_type):
#     with db as session:
#         staff = session.query(Staff).filter(Staff.email == id).first()
#         if not staff:
#             raise HTTPException(status_code=404, detail="Staff not found")

#         for key, value in staff_data.dict().items():
#             setattr(staff, key, value)
        
#         session.commit()
#         session.refresh(staff)
        
#         return JSONResponse(
#             content=jsonable_encoder(StaffResponse.from_orm(staff))
#         )

# async def delete_staff(id: str, db: db_type):
#     with db as session:
#         staff = session.query(Staff).filter(Staff.email == id).first()
#         if not staff:
#             raise HTTPException(status_code=404, detail="Staff not found")
        
#         session.delete(staff)
#         session.commit()
        
#         return JSONResponse(
#             content={"message": "Staff deleted successfully"},
#             status_code=200
#         )

