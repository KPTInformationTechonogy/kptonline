
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
id: number;
name: string;
price: string;
description: string;
image_url?: string;
category?: string;
}

interface FormData {
name: string;
email: string;
phone: string;
company: string;
quantity: string;
message: string;
product_name: string;
product_price: string;
product_id?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function InquiryPage() {
const searchParams = useSearchParams();
const router = useRouter();

const [product, setProduct] = useState<Product | null>(null);
const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: '',
    product_name: '',
    product_price: '',
    product_id: undefined
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(true);

// Get product from URL parameters or fetch product data
useEffect(() => {
    const productId = searchParams.get('product_id');
    const productName = searchParams.get('product_name');
    const productPrice = searchParams.get('product_price');

    if (productId && productName && productPrice) {
    // If product details are in URL params
    const productData: Product = {
        id: parseInt(productId),
        name: productName,
        price: productPrice,
        description: '',
        category: ''
    };
    
    setProduct(productData);
    setFormData(prev => ({
        ...prev,
        product_name: productName,
        product_price: productPrice,
        product_id: parseInt(productId)
    }));
    setIsLoading(false);
    } else if (productId) {
    // Fetch product details from API
    fetchProductDetails(parseInt(productId));
    } else {
    setIsLoading(false);
    }
}, [searchParams]);

const fetchProductDetails = async (productId: number) => {
    try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
        setProduct(result.data);
        setFormData(prev => ({
            ...prev,
            product_name: result.data.name,
            product_price: result.data.price,
            product_id: result.data.id
        }));
        }
    }
    } catch (error) {
    console.error('Error fetching product details:', error);
    } finally {
    setIsLoading(false);
    }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
    }));
    if (error) setError('');
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
    const response = await fetch(`${API_BASE_URL}/inquiries/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.detail || 'Failed to submit inquiry');
    }

    if (!result.success) {
        throw new Error(result.message || 'Submission failed');
    }

    setIsSubmitted(true);
    
    // Redirect to products page after success
    setTimeout(() => {
        router.push('/products');
    }, 3000);
    } catch (error) {
    console.error('Error submitting form:', error);
    setError(error instanceof Error ? error.message : 'There was an error sending your inquiry. Please try again.');
    } finally {
    setIsSubmitting(false);
    }
};

if (isLoading) {
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    </div>
    );
}

if (isSubmitted) {
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Sent Successfully!</h1>
        <p className="text-gray-600 mb-6">We&apos;ll get back to you within 24 hours.</p>
        <Link 
            href="/products"
            className="inline-block bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
        >
            Back to Products
        </Link>
        </div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-gray-50 py-12">
    <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
            <Link href="/" className="hover:text-yellow-600 transition-colors">
                Home
            </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
            <Link href="/products" className="hover:text-yellow-600 transition-colors">
                Products
            </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Send Inquiry</li>
        </ol>
        </nav>

        <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Send Inquiry</h1>
            <p className="text-yellow-100">
                {product 
                ? `Interested in ${product.name}`
                : 'Get in touch with us about our products'
                }
            </p>
            </div>

            <div className="p-6">
            {product && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-4">
                    {product.image_url && (
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                        src={product.image_url}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        />
                    </div>
                    )}
                    <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-yellow-600 font-bold text-lg">{product.price}</p>
                    {product.category && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {product.category}
                        </span>
                    )}
                    </div>
                </div>
                </div>
            )}

            {!product && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-800 text-sm">
                    General inquiry about our products and services
                    </p>
                </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800">{error}</p>
                </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    placeholder="your@email.com"
                    />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                    </label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    placeholder="+234 XXX XXX XXXX"
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                    </label>
                    <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    placeholder="Your company name (optional)"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Quantity
                </label>
                <select
                    id="quantity"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                >
                    <option value="">Select quantity range</option>
                    <option value="1-10 units">1-10 units</option>
                    <option value="11-50 units">11-50 units</option>
                    <option value="51-100 units">51-100 units</option>
                    <option value="101-500 units">101-500 units</option>
                    <option value="500+ units">500+ units</option>
                    <option value="Bulk order">Bulk order</option>
                    <option value="Request quotation">Request quotation</option>
                </select>
                </div>

                <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    placeholder="Tell us about your project requirements, delivery timeline, or any special requests..."
                />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                    By submitting this form, you agree to our terms and privacy policy. 
                    We&apos;ll contact you within 24 hours to discuss your inquiry.
                </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-yellow-500 text-white font-semibold py-4 px-6 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg"
                >
                    {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                    </>
                    ) : (
                    'Send Inquiry'
                    )}
                </button>
                
                <Link
                    href="/products"
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center text-lg"
                >
                    Back to Products
                </Link>
                </div>
            </form>
            </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Response</h3>
            <p className="text-gray-600 text-sm">We respond to all inquiries within 24 hours</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-600 text-sm">All our products come with quality assurance</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bulk Discounts</h3>
            <p className="text-gray-600 text-sm">Special pricing available for bulk orders</p>
            </div>
        </div>
        </div>
    </div>
    </div>
);
}