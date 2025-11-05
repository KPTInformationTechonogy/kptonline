from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from api.models.order import OrderStatus, PaymentStatus
from api.schemas.product import ProductInDB

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemInDB(OrderItemBase):
    id: int
    order_id: int
    price_at_purchase: float
    product: ProductInDB # Include full product details

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    shipping_address: str

class OrderCreate(OrderBase):
    # Items are derived from cart, not directly provided during creation
    pass

class OrderUpdate(BaseModel):
    shipping_address: Optional[str] = None
    order_status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None

class OrderInDB(OrderBase):
    id: int
    user_id: int
    order_date: datetime
    total_amount: float
    order_status: OrderStatus
    payment_status: PaymentStatus
    transaction_id: Optional[str] = None
    items: List[OrderItemInDB] = []

    class Config:
        from_attributes = True