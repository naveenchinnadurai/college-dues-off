from fastapi import HTTPException, Depends, UploadFile, File
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.models import Announcement, Student, Class, Subject, Attendance
from controllers.schemas import StudentCreate, StudentResponse, ClassCreate, ClassResponse, SubjectCreate, SubjectResponse
from controllers.schemas import AnnouncementResponse, StaffCreate, StaffResponse, DepartmentCreate, DepartmentResponse
from db.models import Staff, ClassStaffSubject, Department
from controllers.schemas import SubjectAssignmentRequest
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from typing import Annotated
from db.database import get_db
from utils.password_utils import hash_password
import pandas as pd
from io import BytesIO

db_type = Annotated[AsyncSession, Depends(get_db)]

async def get_announcements(db: db_type):
    async with db as session:
        result = await session.execute(select(Announcement))
        announcements = result.scalars().all()
        return JSONResponse(
            content=jsonable_encoder([AnnouncementResponse.model_validate(a) for a in announcements]),
            status_code=200
        )

async def create_staff(
    staff_data: StaffCreate, db: db_type
):
    async with db as session:
        async with session.begin():
            result = await session.execute(select(Staff).where(Staff.email == staff_data.email))
            existing_staff = result.scalars().first()

            if existing_staff:
                raise HTTPException(status_code=400, detail="Staff with this email already exists")
            staff_data.password = hash_password(staff_data.password)
            new_staff = Staff(**staff_data.model_dump())
            session.add(new_staff)
        await session.commit()
        await session.refresh(new_staff)
        
        return JSONResponse(
            content={
                "message": "Staff created successfully",
                "data": jsonable_encoder(StaffResponse.model_validate(new_staff))},
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
            status_code=200
        )
        
async def create_class(
    class_data: ClassCreate, db: db_type
):
    async with db as session:
        async with session.begin():
            result = await session.execute(select(Class).where(Class.id == class_data.id))
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
        
async def create_department(
    department_data: DepartmentCreate, db: db_type
):
    async with db as session:
        async with session.begin():
            new_department = Department(**department_data.model_dump())
            session.add(new_department)
        await session.commit()
        await session.refresh(new_department)

        return JSONResponse(
            content={
                "message": "Department created successfully",
                "data": jsonable_encoder(DepartmentResponse.model_validate(new_department))},
            status_code=201
        )

async def assign_subject_to_staff(request: SubjectAssignmentRequest, db: db_type):
    async with db as session:
        async with session.begin():
            cls = await session.execute(select(Class).filter(Class.id == request.class_id))
            subj = await session.execute(select(Subject).filter(Subject.id == request.subject_id))
            stf = await session.execute(select(Staff).filter(Staff.id == request.staff_id))
            
            if not cls.scalar():
                raise HTTPException(status_code=404, detail="Class not found")
            if not subj.scalar():
                raise HTTPException(status_code=404, detail="Subject not found")
            if not stf.scalar():
                raise HTTPException(status_code=404, detail="Staff not found")

            check_existing = await session.execute(
                select(ClassStaffSubject)
                .filter_by(class_id=request.class_id, subject_id=request.subject_id, staff_id=request.staff_id)
            )
            if check_existing.scalar():
                raise HTTPException(status_code=400, detail="Assignment already exists")

            link = ClassStaffSubject(**request.model_dump())
            session.add(link)

        await session.commit()
        return JSONResponse(content={"message": "Subject assigned to staff for class"})
        
async def insert_staff_data(db: db_type,file: UploadFile = File(...)):
    if not file.filename.endswith((".xls", ".xlsx")):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload an Excel file.")

    try:
        contents = await file.read()
        excel_data = BytesIO(contents)
        df = pd.read_excel(excel_data)

        required_columns = {"email", "name", "password", "role"}
        if not required_columns.issubset(df.columns):
            raise HTTPException(status_code=400, detail=f"Missing required columns: {required_columns - set(df.columns)}")

        staff_objects = [
            Staff(
                email=row["email"],
                name=row["name"],
                password=hash_password(row["password"]),
                role=row.get("role", "")
            )
            for _, row in df.iterrows()
        ]

        async with db as session:
            async with session.begin():
                session.add_all(staff_objects)

        return JSONResponse(content={"message": "Data inserted successfully"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

# ----------- Get Attendance ----------- #
async def get_attendance(student_id: str, db: db_type):
    result = await db.execute(
        select(Attendance)
        .filter(Attendance.student_id == student_id)
        .options(selectinload(Attendance.class_))
    )
    attendance = result.scalars().all()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")
    return JSONResponse(content=jsonable_encoder([Attendance.model_validate(a) for a in attendance]))