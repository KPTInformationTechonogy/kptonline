from sqlalchemy.orm import Session, joinedload
from api.models.order import Order, OrderItem, OrderStatus, PaymentStatus
from api.models.user import User
from api.models.cart import Cart
from api.models.product import Product
from api.schemas.order import OrderCreate, OrderUpdate
from api.crud import cart as crud_cart
from api.crud import product as crud_product
from fastapi import HTTPException, status
from typing import List, Optional

def create_order_from_cart(db: Session, user_id: int, shipping_address: str):
    cart = crud_cart.get_cart_by_user_id(db, user_id)

    if not cart or not cart.items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty")

    # Check product stock before creating order
    for cart_item in cart.items:
        product = crud_product.get_product(db, cart_item.product_id)
        if not product or product.stock < cart_item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Not enough stock for product '{cart_item.product.name}'. Available: {product.stock}, Requested: {cart_item.quantity}"
            )
            
    order = Order(
        user_id=user_id,
        total_amount=cart.total_price,
        shipping_address=shipping_address,
        order_status=OrderStatus.PENDING,
        payment_status=PaymentStatus.PENDING
    )
    db.add(order)
    db.flush() # To get order.id before committing

    order_items = []
    for cart_item in cart.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price_at_purchase=cart_item.price_at_addition
        )
        order_items.append(order_item)
        # Deduct stock
        crud_product.update_product_stock(db, cart_item.product_id, -cart_item.quantity)

    db.add_all(order_items)

    # Clear the cart after order creation
    crud_cart.clear_cart(db, user_id)

    db.commit()
    db.refresh(order)
    # Eagerly load items and products for the response
    return db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category)).filter(Order.id == order.id).first()


def get_order(db: Session, order_id: int):
    return db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category)).filter(Order.id == order_id).first()

def get_user_orders(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    status: Optional[OrderStatus] = None
):
    query = db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category)).filter(Order.user_id == user_id)
    if status:
        query = query.filter(Order.order_status == status)
    return query.offset(skip).limit(limit).all()

def get_all_orders(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    user_id: Optional[int] = None,
    status: Optional[OrderStatus] = None,
    payment_status: Optional[PaymentStatus] = None
):
    query = db.query(Order).options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category), joinedload(Order.user))
    if user_id:
        query = query.filter(Order.user_id == user_id)
    if status:
        query = query.filter(Order.order_status == status)
    if payment_status:
        query = query.filter(Order.payment_status == payment_status)
    return query.offset(skip).limit(limit).all()

def update_order(db: Session, order_id: int, order_update: OrderUpdate):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        return None
    
    update_data = order_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_order, key, value)
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order_payment_status(db: Session, order_id: int, payment_status: PaymentStatus, transaction_id: Optional[str] = None):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        return None
    db_order.payment_status = payment_status
    if transaction_id:
        db_order.transaction_id = transaction_id
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order