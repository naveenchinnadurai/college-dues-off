from fastapi import APIRouter, HTTPException, Depends
from controllers.staff_controller import create_staff, get_all_staff, view_no_dues_requests, manage_no_dues_requests, insert_staff_data, create_announcement #,get_staff_by_id, update_staff, delete_staff
from utils.auth_bearer import JWTBearer

staff_route = APIRouter(prefix="/staff", tags=["staff"]) # ,dependencies=[Depends(JWTBearer())],

staff_route.add_api_route(
    path="/create",
    endpoint= create_staff,
    methods=["POST"]
)

staff_route.add_api_route(
    path="/create_staffs",
    endpoint= insert_staff_data,
    methods=["POST"]
)

staff_route.add_api_route(
    path="/",
    endpoint= get_all_staff,
    methods=["GET"]
)
# staff_route.add_api_route(
#     path="/{id}",
#     endpoint= get_staff_by_id,
#     methods=["GET"]
# )
# staff_route.add_api_route(
#     path="/{id}",
#     endpoint= update_staff,
#     methods=["PUT"]
# )
# staff_route.add_api_route(
#     path="/{id}",
#     endpoint= delete_staff,
#     methods=["DELETE"]
# )

staff_route.add_api_route(
    path="/{id}/no-dues",
    endpoint=view_no_dues_requests,
    methods=["GET"]
)

staff_route.add_api_route(
    path="/{id}/no-dues/{request_id}",
    endpoint=manage_no_dues_requests,
    methods=["PUT"]
)

staff_route.add_api_route(
    path="/{id}/announcement",
    endpoint= create_announcement,
    methods=["POST"]
)