// app/products/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '@/data/products';

export default function ProductDetailPage() {
const params = useParams();
const slug = params.slug as string;

const [product, setProduct] = useState<Product | null>(null);
const [selectedImage, setSelectedImage] = useState<'primary' | 'secondary'>('primary');
const [quantity, setQuantity] = useState(1);
const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    setProduct(foundProduct || null);
    setIsLoading(false);
}, [slug]);

const handleInquiry = () => {
    // In a real app, this would open a contact form or redirect to inquiry page
    const message = `I&apos;m interested in ${product?.name}. Price: ${product?.price}. Minimum Order: ${product?.minOrder}.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

if (isLoading) {
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
    </div>
    );
}

if (!product) {
    return (
    <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
            Back to Products
        </Link>
        </div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-yellow-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/products" className="hover:text-yellow-600 transition-colors">Products</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <Image
                src={selectedImage === 'primary' ? product.primaryImage : product.secondaryImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                />
                {/* Stock Badge */}
                <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm ${
                    product.inStock 
                    ? 'bg-green-100/90 text-green-800 border border-green-200' 
                    : 'bg-red-100/90 text-red-800 border border-red-200'
                }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                </div>
                
                {/* Hot Badge */}
                {product.id <= 3 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    HOT
                </span>
                )}
            </div>

            {/* Thumbnail Selection */}
            <div className="flex space-x-4">
                <button
                onClick={() => setSelectedImage('primary')}
                className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === 'primary' ? 'border-yellow-500' : 'border-gray-200'
                }`}
                >
                <Image
                    src={product.primaryImage}
                    alt="Primary view"
                    fill
                    className="object-cover"
                />
                </button>
                <button
                onClick={() => setSelectedImage('secondary')}
                className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === 'secondary' ? 'border-yellow-500' : 'border-gray-200'
                }`}
                >
                <Image
                    src={product.secondaryImage}
                    alt="Secondary view"
                    fill
                    className="object-cover"
                />
                </button>
            </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
            <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                {product.category}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                    <span className="text-gray-500 text-sm ml-2">(100+ reviews)</span>
                </div>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                {product.price}
                </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
            </p>

            {/* Key Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                </div>
                ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    -
                </button>
                <span className="px-4 py-2 text-gray-900 font-medium min-w-12 text-center">
                    {quantity}
                </span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    +
                </button>
                </div>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Minimum Order:</span>
                <span className="font-medium">{product.minOrder}</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Time:</span>
                <span className="font-medium">{product.deliveryTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                onClick={handleInquiry}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                    product.inStock
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                >
                {product.inStock ? 'Send Inquiry via WhatsApp' : 'Out of Stock'}
                </button>
                <button className="py-4 px-6 border-2 border-yellow-500 text-yellow-600 rounded-xl font-semibold text-lg hover:bg-yellow-50 transition-colors">
                Request Quote
                </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                <div className="text-2xl">🚚</div>
                <div className="text-xs text-gray-600 mt-1">Fast Delivery</div>
                </div>
                <div className="text-center">
                <div className="text-2xl">💳</div>
                <div className="text-xs text-gray-600 mt-1">Secure Payment</div>
                </div>
                <div className="text-center">
                <div className="text-2xl">🏆</div>
                <div className="text-xs text-gray-600 mt-1">Quality Guarantee</div>
                </div>
            </div>
            </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
            <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'description'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                Description
            </button>
            <button
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'specifications'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                Specifications
            </button>
            <button
                onClick={() => setActiveTab('features')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'features'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                Features
            </button>
            </div>

            <div className="p-6 lg:p-8">
            {activeTab === 'description' && (
                <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                    {product.description}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Premium Quality</h4>
                    <p className="text-blue-700 text-sm">
                        Manufactured to the highest standards ensuring durability and reliability for all your construction needs.
                    </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Wide Application</h4>
                    <p className="text-green-700 text-sm">
                        Suitable for residential, commercial, and industrial projects with proven performance.
                    </p>
                    </div>
                </div>
                </div>
            )}

            {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="text-gray-900">{value}</span>
                    </div>
                ))}
                </div>
            )}

            {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
        </div>

        {/* Related Products */}
        <section className="mt-12">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
            <Link href="/products" className="text-yellow-600 hover:text-yellow-700 font-medium">
            View All →
            </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
                <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                <div className="relative aspect-square bg-gray-100">
                    <Image
                    src={relatedProduct.primaryImage}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                    {relatedProduct.name}
                    </h3>
                    <div className="flex justify-between items-center">
                    <span className="text-red-600 font-bold">{relatedProduct.price}</span>
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    </div>
                </div>
                </Link>
            ))}
        </div>
        </section>
    </div>
    </div>
);
}