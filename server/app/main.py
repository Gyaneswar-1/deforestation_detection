from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.config import settings
from app.database.config import create_db_and_tables
from app.routers.ping_route import api_router

@asynccontextmanager
async def lifespan(_: FastAPI):
    await create_db_and_tables()
    yield



app = FastAPI(
    title="python backend",
    description="deforestation project",
    version="1.0",
    lifespan=lifespan,
)


app.include_router(api_router, prefix=settings.API_V1_STR)
