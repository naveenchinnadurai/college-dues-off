from fastapi import HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Annotated
from .schemas import StaffCreate, StaffResponse, NoDuesRequestResponse
from db.models import Staff, NoDuesRequest
from db.database import get_db
from utils.password_utils import hash_password
from utils.auth_bearer import JWTBearer

db_type = Annotated[Session, Depends(get_db)]

async def create_staff(staff_data: StaffCreate, db: db_type):
        with db as session:
            if session.query(Staff).filter(Staff.email == staff_data.email).first():
                raise HTTPException(status_code=400, detail="Staff with this email already exists")
            staff_data.password = hash_password(staff_data.password)
            new_staff = Staff(**staff_data.dict())
            session.add(new_staff)
            session.commit()
            session.refresh(new_staff)
            
            return JSONResponse(
                content=jsonable_encoder(StaffResponse.from_orm(new_staff)),
                status_code=201
            )

async def get_all_staff(db: db_type):
    with db as session:
        staff = session.query(Staff).all()
        return JSONResponse(
            content=jsonable_encoder([StaffResponse.from_orm(s) for s in staff])
        )

async def get_staff_by_id(id: str, db: db_type):
    with db as session:
        staff = session.query(Staff).filter(Staff.email == id).first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        
        return JSONResponse(
            content=jsonable_encoder(StaffResponse.from_orm(staff))
        )

async def update_staff(id: str, staff_data: StaffCreate, db: db_type):
    with db as session:
        staff = session.query(Staff).filter(Staff.email == id).first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        
        for key, value in staff_data.dict().items():
            setattr(staff, key, value)
        
        session.commit()
        session.refresh(staff)
        
        return JSONResponse(
            content=jsonable_encoder(StaffResponse.from_orm(staff))
        )

async def delete_staff(id: str, db: db_type):
    with db as session:
        staff = session.query(Staff).filter(Staff.email == id).first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        
        session.delete(staff)
        session.commit()
        
        return JSONResponse(
            content={"message": "Staff deleted successfully"},
            status_code=200
        )

async def view_no_dues_requests(id: str, db: db_type):
    with db as session:
        staff = session.query(Staff).filter(Staff.email == id).first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        
        requests = session.query(NoDuesRequest).join(Staff.subjects).filter(
            Staff.email == id
        ).all()
        
        return JSONResponse(
            content=jsonable_encoder([NoDuesRequestResponse.from_orm(request) for request in requests])
        )

async def manage_no_dues_requests(
    id: str, 
    request_id: int, 
    status: str,
    db: db_type
):
    with db as session:
        request = session.query(NoDuesRequest).filter(NoDuesRequest.id == request_id).first()
        if not request:
            raise HTTPException(status_code=404, detail="Request not found")
        
        if status not in ["Approved", "Rejected", "Pending"]:
            raise HTTPException(status_code=400, detail="Invalid status")
        
        request.status = status
        session.commit()
        session.refresh(request)
        
        return JSONResponse(
            content=jsonable_encoder(NoDuesRequestResponse.from_orm(request))
        )