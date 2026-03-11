from fastapi import APIRouter

ping_pong_endpoint = APIRouter(prefix="", tags=["ping"])


@ping_pong_endpoint.get("")
async def ping_pong():
    return {"message": "pong"}
