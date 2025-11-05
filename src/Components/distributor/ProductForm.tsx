import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import api from '@/lib/api';
import axios from 'axios';

interface FormData {
name: string;
description: string;
price: number;
stock: number;
category_id: number;
brand_id?: number;
}

interface FileState {
file: File | null;
name: string | null;
}

interface Category {
id: number;
name: string;
}

interface Brand {
id: number;
name: string;
}

const ProductForm: React.FC = () => {
const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 0,
    brand_id: undefined,
});

const [fileState, setFileState] = useState<FileState>({
    file: null,
    name: null,
});

const [categories, setCategories] = useState<Category[]>([]);
const [brands, setBrands] = useState<Brand[]>([]);
const [message, setMessage] = useState<string>('');
const [error, setError] = useState<string>('');
const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
const [isLoading, setIsLoading] = useState<boolean>(true);

// Fetch categories and brands on component mount
useEffect(() => {
    const fetchData = async () => {
    try {
        setIsLoading(true);
        const [categoriesResponse, brandsResponse] = await Promise.all([
        api.get('http://127.0.0.1:8000/api/v1/products/categories/'),
        api.get('http://127.0.0.1:8000/api/v1/products/brands/')
        ]);
        
        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);
        
        // Set default category if available
        if (categoriesResponse.data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: categoriesResponse.data[0].id }));
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load categories and brands');
    } finally {
        setIsLoading(false);
    }
    };

    fetchData();
}, []);

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
    setFileState({
        file: selectedFile,
        name: selectedFile.name,
    });
    } else {
    setFileState({
        file: null,
        name: null,
    });
    }
};

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
    const data = new FormData();
    data.append('name', formData.name);
    if (formData.description) {
        data.append('description', formData.description);
    }
    data.append('price', formData.price.toString());
    data.append('stock', formData.stock.toString());
    data.append('category_id', formData.category_id.toString());
    if (formData.brand_id) {
        data.append('brand_id', formData.brand_id.toString());
    }
    if (fileState.file) {
        data.append('image_file', fileState.file);
    }

    const response = await api.post('http://127.0.0.1:8000/api/v1/admin/products/', data, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    });

    setMessage('Product created successfully!');
    console.log('Success:', response.data);
    
    // Reset form after successful submission
    setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category_id: categories.length > 0 ? categories[0].id : 0,
        brand_id: undefined,
    });
    setFileState({ file: null, name: null });
    } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
        setError(`Error: ${err.response.data.detail || 'An unexpected error occurred.'}`);
    } else {
        setError('An unexpected error occurred.');
    }
    console.error('Error:', err);
    } finally {
    setIsSubmitting(false);
    }
};

if (isLoading) {
    return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-2 text-gray-600">Loading categories and brands...</p>
        </div>
    </div>
    );
}

return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Product</h2>
    
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
            </label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter product name"
            />
        </div>

        {/* Description */}
        <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
            </label>
            <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter product description"
            />
        </div>

        {/* Price */}
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="0.00"
            />
            </div>
        </div>

        {/* Stock */}
        <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock <span className="text-red-500">*</span>
            </label>
            <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter stock quantity"
            />
        </div>

        {/* Category */}
        <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
            </label>
            <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
            </select>
        </div>

        {/* Brand */}
        <div>
            <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
            </label>
            <select
            id="brand_id"
            name="brand_id"
            value={formData.brand_id || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
            <option value="">Select a brand (optional)</option>
            {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                {brand.name}
                </option>
            ))}
            </select>
        </div>

        {/* File Upload */}
        <div className="col-span-2">
            <label htmlFor="image_file" className="block text-sm font-medium text-gray-700 mb-1">
            Product Image/PDF
            </label>
            <div className="mt-1 flex items-center">
            <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Choose File
                <input
                type="file"
                id="image_file"
                name="image_file"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="sr-only"
                />
            </label>
            <span className="ml-3 text-sm text-gray-500">
                {fileState.name || 'No file chosen'}
            </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, or PDF up to 10MB</p>
        </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
        <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {isSubmitting ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            </>
            ) : 'Create Product'}
        </button>
        </div>

        {/* Messages */}
        {message && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">{message}</p>
        </div>
        )}
        {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
        </div>
        )}
    </form>
    </div>
);
};

export default ProductForm;