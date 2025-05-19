from fastapi import APIRouter, HTTPException, Depends
from controllers.staff_controller import get_all_staff, view_no_dues_requests, manage_no_dues_requests, create_announcement #,get_staff_by_id, update_staff, delete_staff
from utils.auth_bearer import JWTBearer

# staff_route = APIRouter(prefix="/staff", dependencies=[Depends(JWTBearer())], tags=["staff"])  # JWTBearer is a dependency that checks for a valid JWT token in the request headers
staff_route = APIRouter(prefix="/staff", tags=["staff"])

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