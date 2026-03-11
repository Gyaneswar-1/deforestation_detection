from fastapi import APIRouter
from app.endpoints.ping_pong_endpoint import ping_pong_endpoint

api_router = APIRouter()

api_router.include_router(ping_pong_endpoint, tags=["ping"], prefix="/ping")
