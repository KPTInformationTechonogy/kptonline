// Components/distributor/ProductForm.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProductInDB, ProductCreate, ProductUpdate } from '@/types/product';

// Define the form schema
const productFormSchema = z.object({
name: z.string().min(1, 'Product name is required'),
description: z.string().optional(),
price: z.number().min(0, 'Price must be a positive number'),
stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
category_id: z.number().min(1, 'Category is required'),
brand_id: z.number().optional(),
image_url: z.string().url().optional().or(z.literal('')),
file_url: z.string().url().optional().or(z.literal('')),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// Define the props for the ProductForm component
interface ProductFormProps {
initialData?: ProductInDB | null;
onSubmit: (values: ProductCreate | ProductUpdate) => Promise<void>;
onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
const isEditing = !!initialData;

const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    category_id: initialData?.category.id || 0,
    brand_id: initialData?.brand?.id || 0,
    image_url: initialData?.image_url || '',
    file_url: initialData?.file_url || '',
    },
});

const handleSubmit = async (values: ProductFormValues) => {
    await onSubmit(values);
};

return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
        </label>
        <input
            type="text"
            {...form.register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
        )}
        </div>

        {/* Price */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₦) *
        </label>
        <input
            type="number"
            step="0.01"
            {...form.register('price', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.price && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.price.message}</p>
        )}
        </div>

        {/* Stock */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity *
        </label>
        <input
            type="number"
            {...form.register('stock', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.stock && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.stock.message}</p>
        )}
        </div>

        {/* Category */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
        </label>
        <select
            {...form.register('category_id', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value={0}>Select a category</option>
            {/* You'll need to fetch categories from your API */}
        </select>
        {form.formState.errors.category_id && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.category_id.message}</p>
        )}
        </div>

        {/* Brand */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
        </label>
        <select
            {...form.register('brand_id', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value={0}>No brand</option>
            {/* You'll need to fetch brands from your API */}
        </select>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
        </label>
        <input
            type="url"
            {...form.register('image_url')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
        />
        {form.formState.errors.image_url && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.image_url.message}</p>
        )}
        </div>

        {/* File URL */}
        <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            File URL (PDF, etc.)
        </label>
        <input
            type="url"
            {...form.register('file_url')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/document.pdf"
        />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
        </label>
        <textarea
            rows={4}
            {...form.register('description')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
    </div>

    {/* Form Actions */}
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        Cancel
        </button>
        <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
        {form.formState.isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
    </div>
    </form>
);
}