from pydantic import BaseModel
from typing import Dict
from db.database import get_db
from db.models import Student, Staff
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from ..utils.auth_handler import signJWT
from ..utils.password_utils import verify_password

class LoginSchema(BaseModel):
    email: str
    password: str
    user_type: str  # 'student' or 'staff'


async def login_user(login_data: LoginSchema, db: Session = Depends(get_db)):
    try:
        with db as session:
            if login_data.user_type == "student":
                user = session.query(Student).filter(Student.email == login_data.email).first()
                id_field = "reg_no"
            elif login_data.user_type == "staff":
                user = session.query(Staff).filter(Staff.email == login_data.email).first()
                id_field = "email"
            else:
                return JSONResponse(
                    status_code=400,
                    content={
                        "success": False,
                        "message": "Login failed",
                        "error": "Invalid user type",
                        "data": None
                    }
                )

            if not user:
                return JSONResponse(
                    status_code=401,
                    content={
                        "success": False,
                        "message": "Login failed",
                        "error": "Invalid credentials",
                        "data": None
                    }
                )
            
            if not verify_password(login_data.password, user.password):
                return JSONResponse(
                    status_code=401,
                    content={
                        "success": False,
                        "message": "Login failed",
                        "error": "Invalid credentials",
                        "data": None
                    }
                )
            
            token = signJWT(getattr(user, id_field))

            user_data = jsonable_encoder(user)
            user_data.pop('password', None)
            
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Login successful",
                    "data": {
                        "user": user_data,
                        "token": token["access token"],
                        "user_type": login_data.user_type
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