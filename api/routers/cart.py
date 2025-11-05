from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.schemas.cart import CartInDB, CartItemCreate, CartItemUpdate
from api.crud import cart as crud_cart
from api.core.security import get_current_active_user, require_role
from api.models.user import User, UserRole

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("/", response_model=CartInDB)
async def get_my_cart(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    cart = crud_cart.get_cart_by_user_id(db, current_user.id)
    if not cart:
        # If user has no cart, create one and return empty cart
        cart = crud_cart.get_or_create_cart(db, current_user.id)
    return cart

@router.post("/items/", response_model=CartInDB, status_code=status.HTTP_201_CREATED)
async def add_item_to_my_cart(item: CartItemCreate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    try:
        crud_cart.add_item_to_cart(db, current_user.id, item)
        return crud_cart.get_cart_by_user_id(db, current_user.id)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/items/{item_id}", response_model=CartInDB)
async def update_item_in_my_cart(item_id: int, item_update: CartItemUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    try:
        updated_item = crud_cart.update_cart_item(db, current_user.id, item_id, item_update)
        if updated_item is None: # Means item was removed
            return crud_cart.get_cart_by_user_id(db, current_user.id)
        return crud_cart.get_cart_by_user_id(db, current_user.id)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_item_from_my_cart(item_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    try:
        if not crud_cart.remove_item_from_cart(db, current_user.id, item_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
        return {"message": "Cart item removed"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/clear", status_code=status.HTTP_204_NO_CONTENT)
async def clear_my_cart(current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    try:
        crud_cart.clear_cart(db, current_user.id)
        return {"message": "Cart cleared"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))