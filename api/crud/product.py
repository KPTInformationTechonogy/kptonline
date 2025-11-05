from sqlalchemy.orm import Session, joinedload
from api.models.product import Product, Category, Brand
from api.schemas.product import ProductCreate, ProductUpdate, CategoryCreate, CategoryUpdate, BrandCreate, BrandUpdate
from typing import List, Optional

# --- Category CRUD ---
def get_category(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()

def get_category_by_name(db: Session, name: str):
    return db.query(Category).filter(Category.name == name).first()

def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Category).offset(skip).limit(limit).all()

def create_category(db: Session, category: CategoryCreate):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def update_category(db: Session, category_id: int, category_update: CategoryUpdate):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        return None
    for key, value in category_update.model_dump(exclude_unset=True).items():
        setattr(db_category, key, value)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if db_category:
        db.delete(db_category)
        db.commit()
        return True
    return False

# --- Brand CRUD ---
def get_brand(db: Session, brand_id: int):
    return db.query(Brand).filter(Brand.id == brand_id).first()

def get_brand_by_name(db: Session, name: str):
    return db.query(Brand).filter(Brand.name == name).first()

def get_brands(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Brand).offset(skip).limit(limit).all()

def create_brand(db: Session, brand: BrandCreate):
    db_brand = Brand(**brand.model_dump())
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

def update_brand(db: Session, brand_id: int, brand_update: BrandUpdate):
    db_brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not db_brand:
        return None
    for key, value in brand_update.model_dump(exclude_unset=True).items():
        setattr(db_brand, key, value)
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

def delete_brand(db: Session, brand_id: int):
    db_brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if db_brand:
        db.delete(db_brand)
        db.commit()
        return True
    return False

# --- Product CRUD ---
def get_product(db: Session, product_id: int):
    return db.query(Product).options(joinedload(Product.category), joinedload(Product.brand)).filter(Product.id == product_id).first()

def get_products(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    category_id: Optional[int] = None,
    brand_id: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    seller_id: Optional[int] = None # Filter by seller for seller view
):
    query = db.query(Product).options(joinedload(Product.category), joinedload(Product.brand))
    
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%") | Product.description.ilike(f"%{search}%"))
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if brand_id:
        query = query.filter(Product.brand_id == brand_id)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    if seller_id:
        query = query.filter(Product.seller_id == seller_id)

    return query.offset(skip).limit(limit).all()

def create_product(db: Session, product: ProductCreate, admin_id: int):
    db_product = Product(**product.model_dump(), admin_id=admin_id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: ProductUpdate):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return None
    for key, value in product_update.model_dump(exclude_unset=True).items():
        setattr(db_product, key, value)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return True
    return False

def update_product_stock(db: Session, product_id: int, quantity: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return None
    db_product.stock += quantity # quantity can be negative for deduction
    if db_product.stock < 0:
        db_product.stock = 0 # Prevent negative stock
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product