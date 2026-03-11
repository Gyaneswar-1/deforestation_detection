from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
from database.config import engine

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_session() -> AsyncSession:
    """
    FastAPI dependency: yields a new DB session per request
    Automatically closes when request finishes
    """
    async with AsyncSessionLocal() as session:
        yield session
