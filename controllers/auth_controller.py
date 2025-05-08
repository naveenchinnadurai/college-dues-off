from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from db.database import get_db  # should return AsyncSession
from db.models import Staff, Student
from utils.auth_handler import signJWT
from utils.password_utils import verify_password
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, EmailStr

class StaffLoginSchema(BaseModel):
    email: EmailStr
    password: str

async def staffLogin(
    login_data: StaffLoginSchema, 
    db: AsyncSession = Depends(get_db)
):
    try:
        print(login_data.email, login_data.password)
        # Fetch staff using async select
        stmt = select(Staff).where(Staff.email == login_data.email)
        result = await db.execute(stmt)
        user = result.scalars().first()

        if not user or not verify_password(login_data.password, user.password):
            return JSONResponse(
                status_code=401,
                content={
                    "success": False,
                    "message": "Login failed",
                    "error": "Invalid credentials",
                    "data": None
                }
            )

        token = signJWT(user.email)
        user_data = jsonable_encoder(user)
        
        print(user_data)
        user_data.pop("password", None)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Login successful",
                "data": {
                    "user": user_data,
                    "token": token["access token"]
                }
            }
        )

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Login failed",
                "error": str(e),
                "data": None
            }
        )

class StudentLoginSchema(BaseModel):
    regNo: str
    password: str

async def studentLogin(
    login_data: StudentLoginSchema, 
    db: AsyncSession = Depends(get_db)
):
    try:
        stmt = select(Student).where(Student.reg_no == login_data.regNo)
        result = await db.execute(stmt)
        user = result.scalars().first()

        if not user or not verify_password(login_data.password, user.password):
            return JSONResponse(
                status_code=401,
                content={
                    "success": False,
                    "message": "Login failed",
                    "error": "Invalid credentials",
                    "data": None
                }
            )

        token = signJWT(user.email)
        user_data = jsonable_encoder(user)
        user_data.pop("password", None)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Login successful",
                "data": {
                    "user": user_data,
                    "token": token["access token"]
                }
            }
        )

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Login failed",
                "error": str(e),
                "data": None
            }
        )
