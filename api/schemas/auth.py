from pydantic import BaseModel, EmailStr
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None
    roles: list[str] = [] # To store user roles for authorization

class LoginRequest(BaseModel):
    email: EmailStr
    password: str