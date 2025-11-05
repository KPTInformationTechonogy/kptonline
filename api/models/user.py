from sqlalchemy import Column, Integer, String, Boolean, Enum
from sqlalchemy.orm import relationship
from api.db.session import Base
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    distributor = "distributor"
    sales_representative = "sales_representative"
    customer = "customer"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), default=UserRole.customer, nullable=False)

    products = relationship("Product", back_populates="admin")
    carts = relationship("Cart", back_populates="user")
    orders = relationship("Order", back_populates="user")

    def __repr__(self):
        return f"<User(email='{self.email}', role='{self.role}')>"