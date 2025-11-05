from fastapi import APIRouter, Depends, HTTPException, status, Query,  File, UploadFile, Form 
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.schemas.user import UserInDB, UserCreate, UserUpdate
from api.schemas.product import ProductInDB, ProductCreate, ProductUpdate
from api.schemas.order import OrderInDB, OrderUpdate
from api.crud import user as crud_user
from api.crud import product as crud_product
from api.crud import order as crud_order
import os
from api.core.security import require_role
from api.core.security import get_current_active_user
from api.models.user import User

from api.models.user import UserRole
from api.models.product import Product, Category, Brand
from api.models.order import OrderStatus, PaymentStatus
from typing import List, Optional
from api.schemas.product import ProductInDB, ProductCreate, ProductUpdate

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(require_role([UserRole.admin]))])

# --- User Management (Admin) ---
@router.post("/users/", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def create_user_admin(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    return crud_user.create_user(db=db, user=user)

@router.get("/users/", response_model=List[UserInDB])
async def get_users_admin(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/users/{user_id}", response_model=UserInDB)
async def get_user_admin(user_id: int, db: Session = Depends(get_db)):
    user = crud_user.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.put("/users/{user_id}", response_model=UserInDB)
async def update_user_admin(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = crud_user.update_user(db, user_id, user_update)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_admin(user_id: int, db: Session = Depends(get_db)):
    if not crud_user.delete_user(db, user_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return {"message": "User deleted successfully"}

# --- Product Management (Admin) ---
# Admin can manage all products regardless of seller_id
# Example FastAPI endpoint


@router.post("/products/", response_model=ProductInDB)
async def create_product_admin(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock: int = Form(...),
    category_id: int = Form(...),
    brand_id: int = Form(None),
    image_file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    image_url = None
    file_url = None  # For PDFs

    if image_file:
        # Allow only image or PDF
        if not (
            image_file.content_type.startswith("image/")
            or image_file.content_type == "application/pdf"
        ):
            raise HTTPException(status_code=400, detail="Only image or PDF files are allowed.")

        os.makedirs("static/products", exist_ok=True)
        file_location = f"static/products/{image_file.filename}"
        with open(file_location, "wb") as f:
            f.write(await image_file.read())

        if image_file.content_type.startswith("image/"):
            image_url = f"/static/products/{image_file.filename}"
        else:
            file_url = f"/static/products/{image_file.filename}"

    # Create product
    db_product = Product(
        name=name,
        description=description,
        price=price,
        stock=stock,
        category_id=category_id,
        brand_id=brand_id,
        image_url=image_url,
        file_url=file_url,  # New field in Product model
        admin_id=current_user.id
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.put("/products/{product_id}", response_model=ProductInDB)
async def update_product_admin(product_id: int, product_update: ProductUpdate, db: Session = Depends(get_db)):
    # Admin can update any product
    product = crud_product.update_product(db, product_id, product_update)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product

@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product_admin(product_id: int, db: Session = Depends(get_db)):
    # Admin can delete any product
    if not crud_product.delete_product(db, product_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return {"message": "Product deleted successfully"}

# --- Order Management (Admin) ---
@router.get("/orders/", response_model=List[OrderInDB])
async def get_all_orders_admin(
    skip: int = 0,
    limit: int = 100,
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    status: Optional[OrderStatus] = Query(None, description="Filter by order status"),
    payment_status: Optional[PaymentStatus] = Query(None, description="Filter by payment status"),
    db: Session = Depends(get_db)
):
    orders = crud_order.get_all_orders(db, skip=skip, limit=limit, user_id=user_id, status=status, payment_status=payment_status)
    return orders

@router.put("/orders/{order_id}", response_model=OrderInDB)
async def update_order_admin(order_id: int, order_update: OrderUpdate, db: Session = Depends(get_db)):
    order = crud_order.update_order(db, order_id, order_update)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order

# Example: Admin manually marks an order as paid (for external payments not integrated)
@router.post("/orders/{order_id}/mark-paid", response_model=OrderInDB)
async def mark_order_paid_admin(order_id: int, transaction_id: Optional[str] = None, db: Session = Depends(get_db)):
    order = crud_order.update_order_payment_status(db, order_id, PaymentStatus.COMPLETED, transaction_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    # Optionally update order status to PROCESSING after manual payment
    if order.order_status == OrderStatus.PENDING:
        order.order_status = OrderStatus.PROCESSING
        db.add(order)
        db.commit()
        db.refresh(order)
    return order

