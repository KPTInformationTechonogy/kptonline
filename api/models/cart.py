from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from api.db.session import Base

class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True) # One cart per user

    user = relationship("User", back_populates="carts")
    items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")
    total_price = Column(Float, default=0.0) # Denormalized for quick access

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("carts.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    price_at_addition = Column(Float) # Price when added to cart

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")