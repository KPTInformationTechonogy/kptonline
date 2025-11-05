from pydantic import BaseModel
from typing import List, Optional
from api.schemas.product import ProductInDB # To represent product details in cart
from api.schemas.user import UserInDB
class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemInDB(CartItemBase):
    id: int
    cart_id: int
    price_at_addition: float
    product: ProductInDB # Include full product details

    class Config:
        from_attributes = True

class CartInDB(BaseModel):
    id: int
    user_id: int
    total_price: float
    user: Optional[UserInDB] = None
    items: List[CartItemInDB] = [] # List of cart items

    class Config:
        from_attributes = True