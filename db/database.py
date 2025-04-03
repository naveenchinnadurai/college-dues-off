from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URI = os.getenv('DATABASE_URI',"postgresql+psycopg://postgres:admin@localhost:5432/College_dues_off")

if DATABASE_URI is None:
    raise ValueError("DATABASE_URI is not set in the environment variables")

engine = create_engine(DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()