from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)  # student | teacher | admin


class UserSession(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    refresh_token = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
