from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.schemas.order import OrderInDB, OrderCreate, OrderUpdate
from api.crud import order as crud_order
from api.core.security import get_current_active_user, require_role
from api.models.user import User, UserRole
from api.models.order import OrderStatus, PaymentStatus
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderInDB, status_code=status.HTTP_201_CREATED)
async def create_order(order_create: OrderCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    try:
        order = crud_order.create_order_from_cart(db, current_user.id, order_create.shipping_address)
        return order
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/me", response_model=List[OrderInDB])
async def get_my_orders(
    skip: int = 0,
    limit: int = 100,
    status: Optional[OrderStatus] = Query(None, description="Filter by order status"),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    orders = crud_order.get_user_orders(db, current_user.id, skip=skip, limit=limit, status=status)
    return orders

@router.get("/{order_id}", response_model=OrderInDB)
async def get_order_details(order_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    order = crud_order.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    
    # Ensure user can only see their own orders unless they are admin/seller
    if current_user.role == UserRole.CUSTOMER and order.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view this order")
    
    return order

# Mock payment endpoint
@router.post("/{order_id}/pay", response_model=OrderInDB)
async def process_payment(order_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    order = crud_order.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    
    if order.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to pay for this order")
    
    if order.payment_status == PaymentStatus.COMPLETED:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Order already paid")

    # Simulate payment processing (e.g., Stripe/Paystack API call)
    # In a real application, this would involve sending payment details to a gateway
    # and handling webhooks/callbacks for status updates.
    mock_transaction_id = f"mock_txn_{order_id}_{int(datetime.now().timestamp())}"
    updated_order = crud_order.update_order_payment_status(db, order_id, PaymentStatus.COMPLETED, mock_transaction_id)
    updated_order.order_status = OrderStatus.PROCESSING # Move to processing after payment
    db.add(updated_order)
    db.commit()
    db.refresh(updated_order)
    
    return updated_order

# --- NEW SELLER-SPECIFIC ENDPOINT ---

@router.get("/seller", response_model=List[OrderInDB])
async def get_seller_orders(
    skip: int = 0,
    limit: int = 100,
    status: Optional[OrderStatus] = Query(None, description="Filter by order status"),
    current_user: User = Depends(require_role(UserRole.distributor)), # Only accessible by sellers
    db: Session = Depends(get_db)
):
    """
    Retrieve all orders that contain products sold by the authenticated seller.
    """
    orders = crud_order.get_user_orders(db, current_user.id, skip=skip, limit=limit, status=status)
    return orders