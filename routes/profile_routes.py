from fastapi import APIRouter
from controllers.profile_controller import get_announcements

profile_route = APIRouter(prefix="/profile", tags=["profile"])

profile_route.add_api_route(
    path="/announcement",
    endpoint= get_announcements,
    methods=["GET"]
)
