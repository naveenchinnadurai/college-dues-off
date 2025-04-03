from fastapi import HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Annotated
from .schemas import StudentCreate, StudentResponse, NoDuesRequestBase, NoDuesRequestResponse
from db.models import Student, NoDuesRequest, Subject
from db.database import get_db

db_type = Annotated[Session, Depends(get_db)]

async def get_all_students(db: db_type):
    with db as session:
        students = session.query(Student).all()
        return JSONResponse(
            content=jsonable_encoder([StudentResponse.from_orm(s) for s in students])
        )

async def get_student_by_id(id: str, db: db_type):
    with db as session:
        student = session.query(Student).filter(Student.reg_no == id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        
        return JSONResponse(
            content=jsonable_encoder(StudentResponse.from_orm(student))
        )

async def update_student(id: str, student_data: StudentCreate, db: db_type):
    with db as session:
        student = session.query(Student).filter(Student.reg_no == id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        
        for key, value in student_data.dict().items():
            setattr(student, key, value)
        
        session.commit()
        session.refresh(student)
        
        return JSONResponse(
            content=jsonable_encoder(StudentResponse.from_orm(student))
        )

async def request_no_dues(
    id: str,
    request_data: NoDuesRequestBase,
    db: db_type
):
    with db as session:
        student = session.query(Student).filter(Student.reg_no == id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        subject = session.query(Subject).filter(Subject.id == request_data.subject_id).first()
        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")

        if session.query(NoDuesRequest).filter(
            NoDuesRequest.student_reg_no == id,
            NoDuesRequest.subject_id == request_data.subject_id
        ).first():
            raise HTTPException(status_code=400, detail="A request for this subject already exists.")

        new_request = NoDuesRequest(
            student_reg_no=id,
            subject_id=request_data.subject_id,
            status="Pending"
        )
        session.add(new_request)
        session.commit()
        session.refresh(new_request)

        return JSONResponse(
            content=jsonable_encoder(NoDuesRequestResponse.from_orm(new_request)),
            status_code=201
        )

async def view_no_dues(id: str, db: db_type):
    with db as session:
        student = session.query(Student).filter(Student.reg_no == id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        
        requests = session.query(NoDuesRequest).filter(
            NoDuesRequest.student_reg_no == id
        ).all()
        
        return JSONResponse(
            content=jsonable_encoder([NoDuesRequestResponse.from_orm(request) for request in requests])
        )