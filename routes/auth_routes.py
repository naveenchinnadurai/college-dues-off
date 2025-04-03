from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from controllers.auth_controller import login_user #staff_login, student_login

auth_route = APIRouter(prefix="/auth", tags=["auth"])


auth_route.add_api_route(
    path = "login",
    endpoint= login_user,
    methods =["POST"]
)