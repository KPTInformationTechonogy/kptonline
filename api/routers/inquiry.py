# api/routes/inquiry.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from api.db.session import get_db
from api.schemas.inquiry import (
    InquiryCreate, InquiryUpdate, InquiryInDB, 
    InquiryResponse, InquiryListResponse, InquiryStatus
)
from api.crud import inquiry as crud_inquiry
from api.core.security import get_current_active_user, require_role
from api.models.user import User, UserRole

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])

@router.post("/", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_inquiry(
    inquiry: InquiryCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new product inquiry
    """
    try:
        db_inquiry = crud_inquiry.create_inquiry(db=db, inquiry=inquiry)
        
        return InquiryResponse(
            success=True,
            message="Inquiry submitted successfully! We will contact you within 24 hours.",
            data=db_inquiry
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create inquiry: {str(e)}"
        )

@router.get("/", response_model=InquiryListResponse)
async def read_inquiries(
    skip: int = 0,
    limit: int = 100,
    status: Optional[InquiryStatus] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search by name, email, or product"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get all inquiries (Admin only)
    """
    inquiries = crud_inquiry.get_inquiries(
        db, skip=skip, limit=limit, status=status, search=search
    )
    total = crud_inquiry.get_inquiries_count(db, status=status)
    
    return InquiryListResponse(
        success=True,
        total=total,
        data=inquiries
    )

@router.get("/stats")
async def get_inquiry_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get inquiry statistics (Admin only)
    """
    stats = crud_inquiry.get_inquiry_stats(db)
    return {
        "success": True,
        "data": stats
    }

@router.get("/{inquiry_id}", response_model=InquiryResponse)
async def read_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get a specific inquiry by ID (Admin only)
    """
    inquiry = crud_inquiry.get_inquiry(db, inquiry_id=inquiry_id)
    if inquiry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    
    return InquiryResponse(
        success=True,
        message="Inquiry retrieved successfully",
        data=inquiry
    )

@router.put("/{inquiry_id}", response_model=InquiryResponse)
async def update_inquiry(
    inquiry_id: int,
    inquiry_update: InquiryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Update inquiry status (Admin only)
    """
    inquiry = crud_inquiry.get_inquiry(db, inquiry_id=inquiry_id)
    if not inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )

    updated_inquiry = crud_inquiry.update_inquiry(db, inquiry_id, inquiry_update)
    if not updated_inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )

    return InquiryResponse(
        success=True,
        message="Inquiry updated successfully",
        data=updated_inquiry
    )

@router.delete("/{inquiry_id}", status_code=status.HTTP_200_OK)
async def delete_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Delete an inquiry (Admin only)
    """
    if not crud_inquiry.delete_inquiry(db, inquiry_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found"
        )
    
    return {
        "success": True,
        "message": "Inquiry deleted successfully"
    }