# api/crud/inquiry.py
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from api.models.inquiry import Inquiry, InquiryStatus
from api.schemas.inquiry import InquiryCreate, InquiryUpdate



def get_inquiry(db: Session, inquiry_id: int) -> Optional[Inquiry]:
    return db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()

def get_inquiries(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    status: Optional[InquiryStatus] = None,
    search: Optional[str] = None
) -> List[Inquiry]:
    query = db.query(Inquiry)
    
    if status:
        query = query.filter(Inquiry.status == status)
    
    if search:
        query = query.filter(
            (Inquiry.name.ilike(f"%{search}%")) |
            (Inquiry.email.ilike(f"%{search}%")) |
            (Inquiry.product_name.ilike(f"%{search}%"))
        )
    
    return query.order_by(desc(Inquiry.created_at)).offset(skip).limit(limit).all()

def get_inquiries_count(
    db: Session,
    status: Optional[InquiryStatus] = None
) -> int:
    query = db.query(Inquiry)
    
    if status:
        query = query.filter(Inquiry.status == status)
    
    return query.count()

def create_inquiry(db: Session, inquiry: InquiryCreate) -> Inquiry:
    db_inquiry = Inquiry(**inquiry.model_dump())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

def update_inquiry(db: Session, inquiry_id: int, inquiry_update: InquiryUpdate) -> Optional[Inquiry]:
    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not db_inquiry:
        return None
    
    for key, value in inquiry_update.model_dump(exclude_unset=True).items():
        setattr(db_inquiry, key, value)
    
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

def delete_inquiry(db: Session, inquiry_id: int) -> bool:
    db_inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if db_inquiry:
        db.delete(db_inquiry)
        db.commit()
        return True
    return False

def get_inquiry_stats(db: Session) -> dict:
    total = db.query(Inquiry).count()
    new = db.query(Inquiry).filter(Inquiry.status == InquiryStatus.NEW).count()
    contacted = db.query(Inquiry).filter(Inquiry.status == InquiryStatus.CONTACTED).count()
    quoted = db.query(Inquiry).filter(Inquiry.status == InquiryStatus.QUOTED).count()
    converted = db.query(Inquiry).filter(Inquiry.status == InquiryStatus.CONVERTED).count()
    
    return {
        "total": total,
        "new": new,
        "contacted": contacted,
        "quoted": quoted,
        "converted": converted
    }