from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.schemas.user import UserInDB, UserUpdate
from api.crud import user as crud_user
from api.core.security import get_current_active_user, require_role
from api.models.user import User, UserRole
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserInDB)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.put("/me", response_model=UserInDB)
async def update_users_me(user_update: UserUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    updated_user = crud_user.update_user(db, current_user.id, user_update)
    if not updated_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return updated_user

# Admin only endpoints (demonstrating role-based access)
@router.get("/", response_model=List[UserInDB], dependencies=[Depends(require_role([UserRole.admin]))])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/{user_id}", response_model=UserInDB, dependencies=[Depends(require_role([UserRole.admin]))])
async def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud_user.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserInDB, dependencies=[Depends(require_role([UserRole.admin]))])
async def update_user_by_admin(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = crud_user.update_user(db, user_id, user_update)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role([UserRole.admin]))])
async def delete_user_by_admin(user_id: int, db: Session = Depends(get_db)):
    if not crud_user.delete_user(db, user_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return {"message": "User deleted successfully"}