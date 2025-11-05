// components/ProductCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

interface Product {
id: number;
name: string;
price: string;
description: string;
primaryImage: any;
secondaryImage: any;
slug: string;
category: string;
inStock: boolean;
}

interface ProductCardProps {
product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
const inquiryUrl = `/inquiry?product_id=${product.id}&product_name=${encodeURIComponent(product.name)}&product_price=${encodeURIComponent(product.price)}`;

return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-100 relative">
    {/* Product image container */}
    <div className="relative w-full h-64 overflow-hidden">
        <Image
        src={product.secondaryImage}
        alt="Background image"
        fill
        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
        />
        <Image
        src={product.primaryImage}
        alt={product.name}
        fill
        className="absolute object-cover group-hover:opacity-0 transition-opacity duration-500"
        />
        
        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <Link 
            href={`/products/${product.slug}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        >
            View Details
        </Link>
        </div>
    </div>

    {/* Product content */}
    <div className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
            {product.name}
        </h3>
        <span className="text-base font-bold text-red-600">{product.price}</span>
        </div>

        <p className="text-xs text-gray-500 mb-2 truncate">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
        {Array(5).fill(0).map((_, i) => (
            <span key={i}>★</span>
        ))}
        <span className="text-gray-400 ml-1">(100+)</span>
        </div>

        <div className="flex gap-2 mt-auto">
        <Link
            href={inquiryUrl}
            className="flex-1 rounded-xl bg-yellow-500 text-white text-sm py-2 hover:bg-yellow-600 transition-colors font-semibold text-center"
        >
            Send Inquiry
        </Link>
        <Link 
            href={`/products/${product.slug}`}
            className="flex items-center justify-center px-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        </Link>
        </div>
    </div>

    {/* Hot badge */}
    {product.id <= 3 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow">
        HOT
        </span>
    )}
    </div>
);
}