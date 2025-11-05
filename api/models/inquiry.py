# api/models/inquiry.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from api.db.session import Base
import enum

class InquiryStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUOTED = "quoted"
    CONVERTED = "converted"
    ARCHIVED = "archived"

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    company = Column(String, nullable=True)
    quantity = Column(String, nullable=False)
    message = Column(Text, nullable=True)
    product_name = Column(String, nullable=False)
    product_price = Column(String, nullable=False)
    status = Column(SQLEnum(InquiryStatus), default=InquiryStatus.NEW)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign key to product (optional)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    # Relationship
    product = relationship("Product")