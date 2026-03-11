from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from app.config import settings


engine: AsyncEngine = create_async_engine(settings.DATABASE_URL)


async def create_db_and_tables():
    """Create tables on startup if they don't exist (dev only)"""
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
