from pydantic import BaseModel, EmailStr
from typing import Optional
from api.models.user import UserRole

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.customer # Default role

class UserUpdate(UserBase):
    password: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None

class UserInDB(UserBase):
    id: int
    is_active: bool
    role: UserRole

    class Config:
        from_attributes = True # Was orm_mode = True in Pydantic v1