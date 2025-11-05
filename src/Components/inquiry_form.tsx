// components/InquiryForm.tsx
"use client";

import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface InquiryFormProps {
product?: {
    id: number;
    name: string;
    price: string;
};
isOpen: boolean;
onClose: () => void;
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function InquiryForm({ product, isOpen, onClose }: InquiryFormProps) {
const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: '',
    product_name: product?.name || '',
    product_price: product?.price || '',
    product_id: product?.id
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const [error, setError] = useState('');

// Reset form when product changes
useEffect(() => {
    setFormData({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: '',
    product_name: product?.name || '',
    product_price: product?.price || '',
    product_id: product?.id
    });
}, [product]);

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
    // Prepare data for submission - ensure product_id is only included if product exists
    const submitData = {
        ...formData,
        product_id: product?.id || null // Use null instead of undefined
    };

    const response = await fetch(`${API_BASE_URL}/inquiries/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.detail || 'Failed to submit inquiry');
    }

    if (!result.success) {
        throw new Error(result.message || 'Submission failed');
    }

    setIsSubmitted(true);
    
    setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        message: '',
        product_name: product?.name || '',
        product_price: product?.price || '',
        product_id: product?.id
        });
    }, 3000);
    } catch (error) {
    console.error('Error submitting form:', error);
    setError(error instanceof Error ? error.message : 'There was an error sending your inquiry. Please try again.');
    } finally {
    setIsSubmitting(false);
    }
};

const resetForm = () => {
    setFormData({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: '',
    product_name: product?.name || '',
    product_price: product?.price || '',
    product_id: product?.id
    });
    setError('');
    setIsSubmitted(false);
    onClose();
};

// Don't render anything if not open
if (!isOpen) return null;

return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={resetForm}>
        <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Send Inquiry
                </Dialog.Title>
                <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isSubmitting}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                </div>

                {product && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-yellow-800">Product: {product.name}</p>
                    <p className="text-sm text-yellow-700">Price: {product.price}</p>
                </div>
                )}

                {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
                )}

                {isSubmitted ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Inquiry Sent Successfully!</h4>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        placeholder="Enter your full name"
                    />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        placeholder="+234 XXX XXX XXXX"
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        placeholder="Your company name (optional)"
                    />
                    </div>

                    <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Quantity
                    </label>
                    <select
                        id="quantity"
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        placeholder="Tell us about your project requirements, delivery timeline, or any special requests..."
                    />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">
                        By submitting this form, you agree to our terms and privacy policy. 
                        We'll contact you within 24 hours to discuss your inquiry.
                    </p>
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
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
                </form>
                )}
            </Dialog.Panel>
            </Transition.Child>
        </div>
        </div>
    </Dialog>
    </Transition>
);
}