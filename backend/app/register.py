from fastapi import HTTPException
from pydantic import BaseModel
from app.auth import hash_password
import sqlite3

class RegisterRequest(BaseModel):
    email: str
    password: str
    role: str

@app.post("/register")
def register(user: RegisterRequest):
    if user.role not in ["student", "teacher"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    db = sqlite3.connect("users.db")
    cur = db.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT
        )
    """)

    try:
        cur.execute(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            (user.email, hash_password(user.password), user.role),
        )
        db.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="User already exists")

    db.close()
    return {"message": "Registered"}
