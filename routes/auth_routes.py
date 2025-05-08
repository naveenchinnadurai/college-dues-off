from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from controllers.auth_controller import staffLogin, studentLogin

auth_route = APIRouter(prefix="/auth", tags=["auth"])


auth_route.add_api_route(
    path = "/staff/login",
    endpoint= staffLogin,
    methods =["POST"]
)

auth_route.add_api_route(
    path = "/student/login",
    endpoint= studentLogin,
    methods =["POST"]
)
