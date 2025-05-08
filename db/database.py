from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URI = os.getenv('DATABASE_URI',"postgresql+psycopg://postgres:admin@localhost:5432/CollegeConnect")

if DATABASE_URI is None:
    raise ValueError("DATABASE_URI is not set in the environment variables")

engine = create_async_engine(DATABASE_URI, future=True)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session