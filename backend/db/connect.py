from backend.env import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = config("FLIGHT_PRICES_DATABASE_URL", cast=str, default=None)
DATABASE_URL is not None

engine = create_engine(str(DATABASE_URL))
SessionLocal = sessionmaker(bind=engine)

def get_db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()