from fastapi import APIRouter
from controllers.profile_controller import get_announcements, create_staff, insert_staff_data, create_student, create_class, create_subject, assign_subject_to_staff, create_department

profile_route = APIRouter(prefix="/profile", tags=["profile"])

profile_route.add_api_route(
    path="/announcement",
    endpoint= get_announcements,
    methods=["GET"]
)

profile_route.add_api_route(
    path="/create_staff",
    endpoint= create_staff,
    methods=["POST"]
)

profile_route.add_api_route(
    path="/create_staffs",
    endpoint= insert_staff_data,
    methods=["POST"]
)

profile_route.add_api_route(
    path="/create_student",
    endpoint= create_student,
    methods=["POST"]
)

profile_route.add_api_route(
    path="/create_class",
    endpoint= create_class,
    methods=["POST"]
)

profile_route.add_api_route(
    path="/create_subject",
    endpoint= create_subject,
    methods=["POST"]
)

profile_route.add_api_route(
    path="/assign_subject_to_staff",
    endpoint= assign_subject_to_staff,
    methods=["POST"]
)

profile_route.add_api_route(
    path="/create_department",
    endpoint= create_department,
    methods=["POST"]
)
