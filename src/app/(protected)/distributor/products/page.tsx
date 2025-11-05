'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import ProductForm from '@/Components/distributor/ProductForm';
import { ProductInDB, ProductCreate, ProductUpdate } from '@/types/product';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function DistributorProductsPage() {
const { user, isLoading: authLoading } = useAuth();
const [products, setProducts] = useState<ProductInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState<ProductInDB | null>(null);

const fetchProducts = async () => {
    /* This code snippet is checking if the `user` object exists and has an `id` property. If the
    `user` object does not exist or if the `id` property is falsy (such as `null` or `undefined`),
    it sets the loading state to `false` and sets an error message indicating that the user
    information is not available, therefore it cannot fetch products. This is a basic error handling
    mechanism to handle cases where the user information is missing or invalid before attempting to
    fetch products. */
    
    if (!user?.id) {
    setLoading(false);
    setError("User information not available. Cannot fetch products.");
    return;
    }

    setLoading(true);
    setError(null);
    try {
    const response = await api.get(`/products/?distributor_id=${user.id}`);
    setProducts(response.data);
    } catch (err: any) {
    console.error('Failed to fetch products:', err);
    setError(err.response?.data?.detail || 'Failed to load products.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    if (!authLoading && user) {
    fetchProducts();
    }
}, [authLoading, user]);

const showToast = (title: string, description: string, isError = false) => {
    // Implement your toast notification here or use a simple alert
    console.log(`${title}: ${description}`);
    if (isError) {
    alert(`Error: ${title}\n${description}`);
    } else {
    alert(`${title}\n${description}`);
    }
};

const handleCreateOrUpdate = async (values: ProductCreate | ProductUpdate) => {
    // if (!user?.id) {
    // showToast("Authentication Error", "User not authenticated. Please log in.", true);
    // return;
    // }

    try {
    if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, values);
        showToast("Product Updated", `Product "${values.name}" has been updated.`);
    } else {
        await api.post('/products/', values);
        showToast("Product Added", `Product "${values.name}" has been added.`);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
    } catch (err: any) {
    console.error('Save product error:', err);
    showToast(
        "Operation Failed",
        err.response?.data?.detail || "An error occurred during save.",
        true
    );
    }
};

const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    try {
    await api.delete(`/products/${productId}`);
    showToast("Product Deleted", "Product has been successfully deleted.");
    fetchProducts();
    } catch (err: any) {
    console.error('Delete product error:', err);
    showToast(
        "Deletion Failed",
        err.response?.data?.detail || "An error occurred during deletion.",
        true
    );
    }
};

const openCreateDialog = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
};

const openEditDialog = (product: ProductInDB) => {
    setEditingProduct(product);
    setIsFormOpen(true);
};

if (authLoading || loading) {
    return (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
}

if (error) {
    return (
    <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p>{error}</p>
    </div>
    );
}

return (
    <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
        <button
        onClick={openCreateDialog}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Product
        </button>
    </div>

    {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="mb-4">
            <h2 className="text-xl font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-gray-500">
                {editingProduct ? 'Make changes to your product details.' : 'Create a new product to list on the store.'}
            </p>
            </div>
            <ProductForm
            initialData={editingProduct}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setIsFormOpen(false)}
            />
        </div>
        </div>
    )}

    <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">My Product Listings</h2>
        <p className="text-gray-500 mb-4">
            A list of all products you have listed for sale.
        </p>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
                <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No products found. Add your first product!
                </td>
                </tr>
            ) : (
                products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                        src={product.image_url || 'https://placehold.co/50x50/e2e8f0/000000?text=No+Img'}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                        onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/50x50/e2e8f0/000000?text=No+Img';
                        }}
                    />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.brand?.name || (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        N/A
                        </span>
                    )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock < 10 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                        {product.stock}
                    </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                        onClick={() => openEditDialog(product)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    </div>
    </div>
);
}