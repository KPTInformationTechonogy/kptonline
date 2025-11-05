'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductForm from '@/Components/distributor/ProductForm';
import { ProductInDB, ProductCreate, ProductUpdate } from '@/types/product';
import Image from 'next/image';
import { Pencil, Trash2, PlusCircle, Search, Tag, Box } from 'lucide-react';
import Link from 'next/link';
import ProductImage from '@/Components/ProductImage';

export default function AdminProductsPage() {
const [products, setProducts] = useState<ProductInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState<ProductInDB | null>(null);
const [searchTerm, setSearchTerm] = useState('');

const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
    const response = await api.get('/products/');
    setProducts(response.data);
    } catch (err: any) {
    console.error('Failed to fetch products:', err);
    setError(err.response?.data?.detail || 'Failed to load products.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchProducts();
}, []);

const handleCreateOrUpdate = async (values: ProductCreate | ProductUpdate) => {
    try {
    if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, values);
        alert(`Product "${values.name}" has been updated.`);
    } else {
        await api.post('/products/', values);
        alert(`Product "${values.name}" has been added.`);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
    } catch (err: any) {
    console.error('Save product error:', err);
    alert(err.response?.data?.detail || 'An error occurred during save.');
    }
};

const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
    await api.delete(`/products/${productId}`);
    alert('Product has been successfully deleted.');
    fetchProducts();
    } catch (err: any) {
    console.error('Delete product error:', err);
    alert(err.response?.data?.detail || 'An error occurred during deletion.');
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

const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.brand?.name && product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
);

if (loading) {
    return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <div className="text-yellow-800 text-lg font-medium">Loading products...</div>
    </div>
    );
}

if (error) {
    return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <div className="text-red-600 bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        {error}
        </div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-yellow-50 p-6">
    <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-yellow-800">Product Management</h1>
            <p className="text-yellow-700 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
            <Link
            href="/admin/products/categories"
            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-md hover:shadow-lg"
            >
            <Tag className="mr-2 h-5 w-5" />
            <span className="font-medium">Categories</span>
            </Link>
            <Link
            href="/admin/products/brands"
            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-md hover:shadow-lg"
            >
            <Box className="mr-2 h-5 w-5" />
            <span className="font-medium">Brands</span>
            </Link>
            <button
            onClick={openCreateDialog}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
            <PlusCircle className="mr-2 h-5 w-5" />
            <span className="font-medium">Add Product</span>
            </button>
        </div>
        </div>

        {/* Product Form Modal */}
        {isFormOpen && (
        <div className="bg-white rounded-xl shadow-xl p-6 border border-yellow-200">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
            </div>
            <ProductForm
            initialData={editingProduct}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setIsFormOpen(false)}
            />
        </div>
        )}

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-yellow-100">
        {/* Search Bar */}
        <div className="p-4 bg-yellow-700">
            <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-yellow-200" />
            </div>
            <input
                placeholder="Search products by name, category, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-yellow-300 rounded-lg bg-yellow-50 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-yellow-200">
            <thead className="bg-yellow-100">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Brand
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Stock
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-yellow-800 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-yellow-200">
                {filteredProducts.length === 0 ? (
                <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-yellow-700">
                    No products found matching your search criteria.
                    </td>
                </tr>
                ) : (
                filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                        {product.image_url ? (
                            <ProductImage
                            src={product.image_url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                            />
                        ) : product.file_url ? (
                            <a
                            href={product.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                            >
                            View PDF
                            </a>
                        ) : (
                            <ProductImage
                            src="/default-product.png"
                            alt="No image"
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                            />
                        )}
                        </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-yellow-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-yellow-700">{product.category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-yellow-700">
                        {product.brand?.name || <span className="text-gray-400">N/A</span>}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-blue-600">
                        ₦{product.price.toFixed(2)}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.stock < 10 
                            ? 'bg-red-100 text-red-800' 
                            : product.stock < 20 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {product.stock}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => openEditDialog(product)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                            title="Edit"
                        >
                            <Pencil className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>
);
}