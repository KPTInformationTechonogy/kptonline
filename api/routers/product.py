from fastapi import APIRouter, Depends, HTTPException, status, Query, Form, UploadFile, File
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.schemas.product import (
    ProductCreate, ProductUpdate, ProductInDB,
    CategoryCreate, CategoryUpdate, CategoryInDB,
    BrandCreate, BrandUpdate, BrandInDB
)
from api.crud import product as crud_product
from api.core.security import get_current_active_user, require_role
from api.models.user import User, UserRole
from typing import List, Optional
import shutil
import os
import uuid

UPLOAD_DIR = "uploads/products"  # Customize as needed
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/products", tags=["Products"])

# --- Product Endpoints ---
@router.post("/", response_model=ProductInDB, status_code=status.HTTP_201_CREATED)
async def create_product(
    name: str = Form(...),
    description: Optional[str] = Form(None),  # <-- Use Optional[str] and set default to None
    price: float = Form(...),               
    category_id: int = Form(...),
    brand_id: Optional[int] = Form(None),
    image_file: UploadFile = File(None),     # Renamed 'image' to 'image_file' for clarity
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # The file path logic needs to be robust:
    image_url = None
    file_url = None # For PDFs

    if image_file and image_file.filename:
        # Validate file content type
        content_type = image_file.content_type
        if not (content_type.startswith("image/") or content_type == "application/pdf"):
            raise HTTPException(status_code=400, detail="Only image or PDF files are allowed.")
        
        # Save the file (using your existing logic, ensuring you read the file content)
        file_extension = image_file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # IMPORTANT: Use await image_file.read() outside of shutil.copyfileobj
        file_content = await image_file.read() 
        with open(file_path, "wb") as buffer:
            buffer.write(file_content)

        # Set image_url or file_url based on type
        relative_path = f"/static/products/{unique_filename}" # Assuming you serve files via /static/products/
        if content_type.startswith("image/"):
            image_url = relative_path
        else:
            file_url = relative_path
        
    # Validation logic (from your previous code)
    category = crud_product.get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    
    if brand_id:
        brand = crud_product.get_brand(db, brand_id)
        if not brand:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")

    # Create the product object (adjusting to ProductCreate schema)
    product_data = ProductCreate(
        name=name,
        description=description,
        price=price,
        category_id=category_id,
        brand_id=brand_id,
        image_url=image_url # Pydantic schema expects image_url
    )

    # Note: You'll need to update your Product model and create_product CRUD function 
    # to handle the optional file_url field if you want to save PDFs separately.
    
    # For now, let's pass a dictionary and include file_url if it exists
    product_dict = product_data.model_dump()
    if file_url:
        product_dict['file_url'] = file_url
        # If it's a file/PDF, it's not an image, so clear image_url
        product_dict['image_url'] = None 

    # You'll need an updated crud function that accepts the final dictionary or a custom schema:
    # return crud_product.create_product_with_file(db=db, product_data=product_dict, admin_id=current_user.id)
    
    # Assuming ProductCreate has all necessary fields, and your CRUD is updated for file_url:
    return crud_product.create_product(db=db, product=ProductCreate(**product_dict), admin_id=current_user.id)
@router.get("/", response_model=List[ProductInDB])
async def read_products(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = Query(None, description="Search by product name or description"),
    category_id: Optional[int] = Query(None, description="Filter by category ID"),
    brand_id: Optional[int] = Query(None, description="Filter by brand ID"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    db: Session = Depends(get_db)
):
    products = crud_product.get_products(
        db, skip=skip, limit=limit,
        search=search, category_id=category_id, brand_id=brand_id,
        min_price=min_price, max_price=max_price
    )
    return products

@router.get("/{product_id}", response_model=ProductInDB)
async def read_product(product_id: int, db: Session = Depends(get_db)):
    product = crud_product.get_product(db, product_id=product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductInDB, dependencies=[Depends(require_role([UserRole.admin]))])
async def update_product(
    product_id: int,
    product_update: ProductUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    product = crud_product.get_product(db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    # Seller can only update their own products unless they are admin
    if current_user.role == UserRole.distributor and product.seller_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this product")

    # Check if category exists if updated
    if product_update.category_id:
        category = crud_product.get_category(db, product_update.category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    # Check if brand exists if updated
    if product_update.brand_id:
        brand = crud_product.get_brand(db, product_update.brand_id)
        if not brand:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")

    updated_product = crud_product.update_product(db, product_id, product_update)
    return updated_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role([UserRole.admin]))])
async def delete_product(product_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    product = crud_product.get_product(db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    # Seller can only delete their own products unless they are admin
    if current_user.role == UserRole.distributor and product.seller_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this product")

    if not crud_product.delete_product(db, product_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return {"message": "Product deleted successfully"}

# --- Category Endpoints ---
@router.post("/categories/", response_model=CategoryInDB, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role([UserRole.admin]))])
async def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = crud_product.get_category_by_name(db, category.name)
    if db_category:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category with this name already exists")
    return crud_product.create_category(db, category)

@router.get("/categories/", response_model=List[CategoryInDB])
async def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud_product.get_categories(db, skip=skip, limit=limit)
    return categories

@router.get("/categories/{category_id}", response_model=CategoryInDB)
async def read_category(category_id: int, db: Session = Depends(get_db)):
    category = crud_product.get_category(db, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return category

@router.put("/categories/{category_id}", response_model=CategoryInDB, dependencies=[Depends(require_role([UserRole.admin]))])
async def update_category(category_id: int, category_update: CategoryUpdate, db: Session = Depends(get_db)):
    updated_category = crud_product.update_category(db, category_id, category_update)
    if not updated_category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return updated_category

@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role([UserRole.admin]))])
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    if not crud_product.delete_category(db, category_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return {"message": "Category deleted successfully"}

# --- Brand Endpoints ---
@router.post("/brands/", response_model=BrandInDB, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role([UserRole.admin]))])
async def create_brand(brand: BrandCreate, db: Session = Depends(get_db)):
    db_brand = crud_product.get_brand_by_name(db, brand.name)
    if db_brand:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Brand with this name already exists")
    return crud_product.create_brand(db, brand)

@router.get("/brands/", response_model=List[BrandInDB])
async def read_brands(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    brands = crud_product.get_brands(db, skip=skip, limit=limit)
    return brands

@router.get("/brands/{brand_id}", response_model=BrandInDB)
async def read_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = crud_product.get_brand(db, brand_id)
    if brand is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return brand

@router.put("/brands/{brand_id}", response_model=BrandInDB, dependencies=[Depends(require_role([UserRole.admin]))])
async def update_brand(brand_id: int, brand_update: BrandUpdate, db: Session = Depends(get_db)):
    updated_brand = crud_product.update_brand(db, brand_id, brand_update)
    if not updated_brand:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return updated_brand

@router.delete("/brands/{brand_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role([UserRole.admin]))])
async def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    if not crud_product.delete_brand(db, brand_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")
    return {"message": "Brand deleted successfully"}











from fastapi import APIRouter, Depends, HTTPException, status, Form, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional

from api.db.session import get_db
from api.schemas.product import ProductCreate, ProductInDB
from api.crud import product as crud_product
from api.core.security import get_current_active_user
from api.models.user import User







@router.post("/", response_model=ProductInDB, status_code=status.HTTP_201_CREATED)
async def create_product(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category_id: int = Form(...),
    brand_id: Optional[int] = Form(None),
    image: UploadFile = File(...),  # <-- File upload
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Validate category
    category = crud_product.get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    # Validate brand
    if brand_id:
        brand = crud_product.get_brand(db, brand_id)
        if not brand:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brand not found")

    # Save the uploaded file
    file_extension = image.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Build ProductCreate object
    product_data = ProductCreate(
        name=name,
        description=description,
        price=price,
        category_id=category_id,
        brand_id=brand_id,
        image_filename=unique_filename  # Add this field to your schema
    )

    return crud_product.create_product(db=db, product=product_data, admin_id=current_user.id)
