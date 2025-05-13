from fastapi import HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.models import Announcement, Student, Class, Subject
from controllers.schemas import StudentCreate, StudentResponse, ClassCreate, ClassResponse, SubjectCreate, SubjectResponse
from controllers.schemas import AnnouncementResponse
from typing import Annotated
from db.database import get_db
from utils.password_utils import hash_password

db_type = Annotated[AsyncSession, Depends(get_db)]

async def get_announcements(db: db_type):
    async with db as session:
        result = await session.execute(select(Announcement))
        announcements = result.scalars().all()
        return JSONResponse(
            content=jsonable_encoder([AnnouncementResponse.model_validate(a) for a in announcements]),
            status_code=201
        )
        
async def create_student(
    student_data: StudentCreate, db: db_type
):
    async with db as session:
        async with session.begin():
            result = await session.execute(select(Student).where(Student.email == student_data.email))
            existing_student = result.scalars().first()

            if existing_student:
                raise HTTPException(status_code=400, detail="Student with this email already exists")
            student_data.password = hash_password(student_data.password)
            new_student = Student(**student_data.model_dump())
            session.add(new_student)
        await session.commit()
        await session.refresh(new_student)
        
        return JSONResponse(
            content={
                "message": "Student created successfully",
                "data": jsonable_encoder(StudentResponse.model_validate(new_student))},
            status_code=201
        )
        
async def create_class(
    class_data: ClassCreate, db: db_type
):
    async with db as session:
        async with session.begin():
            result = await session.execute(select(Class).where(Class.class_id == class_data.class_id))
            existing_class = result.scalars().first()

            if existing_class:
                raise HTTPException(status_code=400, detail="Class with this ID already exists")
            new_class = Class(**class_data.model_dump())
            session.add(new_class)
        await session.commit()
        await session.refresh(new_class)
        
        return JSONResponse(
            content={
                "message": "Class created successfully",
                "data": jsonable_encoder(ClassResponse.model_validate(new_class))},
            status_code=201
        )
        
async def create_subject(
    subject_data: SubjectCreate, db: db_type
):
    async with db as session:
        async with session.begin():
            result = await session.execute(select(Subject).where(Subject.code == subject_data.code))
            existing_subject = result.scalars().first()

            if existing_subject:
                raise HTTPException(status_code=400, detail="Subject with this code already exists")
            new_subject = Subject(**subject_data.model_dump())
            session.add(new_subject)
        await session.commit()
        await session.refresh(new_subject)
        
        return JSONResponse(
            content={
                "message": "Subject created successfully",
                "data": jsonable_encoder(SubjectResponse.model_validate(new_subject))},
            status_code=201
        )
