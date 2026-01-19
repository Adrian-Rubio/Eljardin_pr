from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database connection URL from environment variable or default SQLite
# Start by getting the absolute path of the directory this file is in (backend/)
current_dir = os.path.dirname(os.path.abspath(__file__))
# Get the parent directory (restaurant_app/)
project_root = os.path.dirname(current_dir)
# Define absolute path to DB in the project root
db_path = os.path.join(project_root, "restaurant.db")

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{db_path}")

# Engine configuration handling SQLite specifically for development
if "sqlite" in SQLALCHEMY_DATABASE_URL:
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """
    Dependency to get a database session.
    Yields a session and ensures it is closed after the request is processed.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
