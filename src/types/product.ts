// Define types based on your FastAPI backend schemas

export interface CategoryInDB {
id: number;
name: string;
description?: string | null;
}

export interface BrandInDB {
id: number;
name: string;
description?: string | null;
}

export interface ProductBase {
name: string;
description?: string | null;
price: number;
stock: number;
image_url?: string | null;
}

export interface ProductCreate extends ProductBase {
category_id: number;
brand_id?: number | null;
}

export interface ProductUpdate extends Partial<ProductBase> {
category_id?: number;
brand_id?: number | null;
}

export interface ProductInDB extends ProductBase {
id: number;
category: CategoryInDB; // Nested object
brand?: BrandInDB | null; // Nested object, optional
file_url?: string | null; // New field for PDFs
}

// --- NEW ORDER RELATED TYPES ---

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItemInDB {
id: number;
order_id: number;
product_id: number;
quantity: number;
price_at_purchase: number;
product_name: string; // Denormalized for easier display
product_image_url?: string | null; // Denormalized for easier display
distributor_id: number; // The ID of the seller/distributor who supplies this product
}

export interface OrderInDB {
id: number;
user_id: number;
total_amount: number;
status: OrderStatus;
created_at: string; // ISO 8601 string
updated_at: string; // ISO 8601 string
items: OrderItemInDB[]; // Includes all items in the order
// Assuming basic user info is available on the order or fetched separately
user_email: string;
user_full_name?: string | null;
}

export interface OrderUpdateStatus {
status: OrderStatus;
}

