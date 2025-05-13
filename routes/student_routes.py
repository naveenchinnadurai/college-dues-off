from fastapi import APIRouter, Depends
from controllers.student_controller import get_all_students, get_student_by_id, update_student, request_no_dues, view_no_dues
from utils.auth_bearer import JWTBearer

student_route = APIRouter(prefix="/student",  tags=["student"]) #  dependencies=[Depends(JWTBearer())],

student_route.add_api_route(
    path="/",
    endpoint= get_all_students,
    methods=["GET"]
)
student_route.add_api_route(
    path="/{id}",
    endpoint= get_student_by_id,
    methods=["GET"]
)
student_route.add_api_route(
    path="/{id}",
    endpoint= update_student,
    methods=["PUT"]
)
student_route.add_api_route(
    path="/{id}/no-dues",
    endpoint= request_no_dues,
    methods=["POST"]
)
student_route.add_api_route(
    path="/{id}/no-dues",
    endpoint= view_no_dues,
    methods=["GET"]
)