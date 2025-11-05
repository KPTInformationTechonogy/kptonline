export interface UserInDB {
id: number;
email: string;
full_name?: string | null;
is_active: boolean;
role: 'admin' | 'distributor' | 'customer' | 'sales_representative'; // Ensure these match your backend roles
}

export interface UserCreate {
email: string;
password?: string; // Optional for creation, but often required
full_name?: string;
role: 'admin' | 'distributor' | 'customer' | 'sales_representative';
}

export interface UserUpdate {
email?: string;
password?: string;
full_name?: string;
is_active?: boolean;
role?: 'admin' | 'distributor' | 'customer' | 'sales_representative';
}