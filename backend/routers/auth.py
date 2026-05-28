from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from database import get_db
from models import User

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class RegisterRequest(BaseModel):
    email: EmailStr
    name: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


def public_user(user: User) -> dict:
    return {"id": user.id, "email": user.email, "name": user.name, "plan": user.plan}


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")
    user = User(email=payload.email, name=payload.name, password_hash=pwd_context.hash(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"user": public_user(user), "token": f"demo-token-{user.id}"}


@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not pwd_context.verify(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"user": public_user(user), "token": f"demo-token-{user.id}"}


@router.get("/me")
def me(db: Session = Depends(get_db)):
    user = db.query(User).order_by(User.id.asc()).first()
    if not user:
        user = User(email="demo@invoicepro.com", name="Demo Finance Lead", password_hash=pwd_context.hash("invoicepro-demo"), plan="Pro")
        db.add(user)
        db.commit()
        db.refresh(user)
    return public_user(user)
