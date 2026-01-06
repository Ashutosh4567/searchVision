from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    return {"token": "dummy-token"}

@router.post("/register")
def register(data: LoginRequest):
    return {"status": "registered"}
