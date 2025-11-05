from pydantic import BaseModel
from typing import Optional, List

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryInDB(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class BrandBase(BaseModel):
    name: str
    description: Optional[str] = None

class BrandCreate(BrandBase):
    pass

class BrandUpdate(BrandBase):
    pass

class BrandInDB(BrandBase):
    id: int

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: Optional[int] = 0
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    category_id: int
    brand_id: Optional[int] = None # Optional brand

class ProductUpdate(ProductBase):
    category_id: Optional[int] = None
    brand_id: Optional[int] = None
    price: Optional[float] = None
    stock: Optional[int] = None

class ProductInDB(ProductBase):
    id: int
    category: CategoryInDB # Nested schema
    file_url: Optional[str] = None  # For PDFs
    brand: Optional[BrandInDB] = None # Nested schema

    class Config:
        from_attributes = True
        
