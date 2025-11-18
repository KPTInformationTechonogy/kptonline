'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { BrandInDB } from '@/types/product';
import { Plus, X, Loader2, Edit, Trash2, Box, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Define proper error types
interface ApiError extends Error {
response?: {
    data?: {
    detail?: string;
    };
};
}

function isApiError(error: unknown): error is ApiError {
return error instanceof Error && typeof error === 'object' && error !== null;
}

const initialFormState = { name: '', description: '' };

export default function AdminBrandsPage() {
const [brands, setBrands] = useState<BrandInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [showForm, setShowForm] = useState(false);
const [formState, setFormState] = useState(initialFormState);
const [editingId, setEditingId] = useState<number | null>(null);
const [formLoading, setFormLoading] = useState(false);
const [formError, setFormError] = useState<string | null>(null);
const [successMsg, setSuccessMsg] = useState<string | null>(null);

const fetchBrands = async () => {
    setLoading(true);
    setError(null);
    try {
    const response = await api.get('/products/brands/');
    setBrands(response.data);
    } catch (err: unknown) {
    if (isApiError(err)) {
        setError(err?.response?.data?.detail || 'Failed to load brands.');
    } else {
        setError('Failed to load brands.');
    }
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchBrands();
}, []);

const openCreateForm = () => {
    setEditingId(null);
    setFormState(initialFormState);
    setFormError(null);
    setShowForm(true);
};

const openEditForm = (brand: BrandInDB) => {
    setEditingId(brand.id);
    setFormState({
    name: brand.name,
    description: brand.description || '',
    });
    setFormError(null);
    setShowForm(true);
};

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setSuccessMsg(null);
    const payload = {
    name: formState.name.trim(),
    description: formState.description.trim() || null,
    };
    try {
    if (editingId) {
        await api.put(`/products/brands/${editingId}`, payload);
        setSuccessMsg('Brand updated successfully');
    } else {
        await api.post('/products/brands/', payload);
        setSuccessMsg('Brand added successfully');
    }
    setShowForm(false);
    setEditingId(null);
    setFormState(initialFormState);
    fetchBrands();
    } catch (err: unknown) {
    if (isApiError(err)) {
        setFormError(err?.response?.data?.detail || 'An error occurred while saving.');
    } else {
        setFormError('An error occurred while saving.');
    }
    } finally {
    setFormLoading(false);
    }
};

const handleDeleteBrand = async (brandId: number) => {
    if (!window.confirm('Are you sure you want to delete this brand? Products assigned to it will be affected.')) return;
    setLoading(true);
    setError(null);
    try {
    await api.delete(`/products/brands/${brandId}`);
    setSuccessMsg('Brand deleted successfully');
    fetchBrands();
    } catch (err: unknown) {
    if (isApiError(err)) {
        setError(err?.response?.data?.detail || 'Failed to delete brand.');
    } else {
        setError('Failed to delete brand.');
    }
    setLoading(false);
    }
};

return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
        <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your product brands</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link
            href="/admin/product/categories"
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm hover:bg-gray-200 transition-colors text-sm font-medium"
        >
            <Box className="w-4 h-4 mr-2" />
            Categories
        </Link>
        <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-sm font-medium"
        >
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
        </button>
        </div>
    </div>

    {/* Status Messages */}
    {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex items-center">
            <div className="flex-shrink-0">
            <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            </div>
        </div>
        </div>
    )}

    {successMsg && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <div className="flex items-center">
            <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
            <p className="text-sm text-green-700">{successMsg}</p>
            </div>
        </div>
        </div>
    )}

    {/* Loading State */}
    {loading ? (
        <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
    ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {brands.length === 0 ? (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No brands found
                    </td>
                </tr>
                ) : (
                brands.map(brand => (
                    <tr key={brand.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {brand.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {brand.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {brand.description || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                        onClick={() => openEditForm(brand)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                        title="Edit"
                        >
                        <Edit className="h-5 w-5" />
                        </button>
                        <button
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                        title="Delete"
                        >
                        <Trash2 className="h-5 w-5" />
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    )}

    {/* Brand Form Modal */}
    {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Brand" : "Add New Brand"}
            </h2>
            <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-500"
            >
                <X className="h-5 w-5" />
            </button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Brand Name *
                </label>
                <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Apple"
                required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
                </label>
                <textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Optional description"
                rows={3}
                />
            </div>
            {formError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                    <p className="text-sm text-red-700">{formError}</p>
                    </div>
                </div>
                </div>
            )}
            <div className="flex justify-end space-x-3 pt-4">
                <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={formLoading}
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={formLoading}
                >
                {formLoading ? (
                    <span className="flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Saving...
                    </span>
                ) : editingId ? 'Save Changes' : 'Add Brand'}
                </button>
            </div>
            </form>
        </div>
        </div>
    )}
    </div>
);
}