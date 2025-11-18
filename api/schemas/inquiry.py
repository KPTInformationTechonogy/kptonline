# api/schemas/inquiry.py
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
from enum import Enum

class InquiryStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUOTED = "quoted"
    CONVERTED = "converted"
    ARCHIVED = "archived"

class InquiryBase(BaseModel):
    name: str
    email: str
    phone: str
    company: Optional[str] = None
    quantity: str
    message: Optional[str] = None
    product_name: str
    product_price: str

    @validator('name')
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
    
    @validator('email')
    def email_valid(cls, v):
        if not v.strip():
            raise ValueError('Email cannot be empty')
        return v.strip()
    
    @validator('phone')
    def phone_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Phone cannot be empty')
        return v.strip()
    
    @validator('quantity')
    def quantity_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Please select a quantity range')
        return v.strip()

class InquiryCreate(InquiryBase):
    pass

class InquiryUpdate(BaseModel):
    status: Optional[InquiryStatus] = None
    notes: Optional[str] = None

class InquiryInDB(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    company: Optional[str]
    quantity: str
    message: Optional[str]
    product_name: str
    product_price: str
    status: InquiryStatus
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class InquiryResponse(BaseModel):
    success: bool
    message: str
    data: Optional[InquiryInDB] = None

class InquiryListResponse(BaseModel):
    success: bool
    total: int
    data: list[InquiryInDB]