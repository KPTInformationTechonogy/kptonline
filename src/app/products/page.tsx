// app/products/page.tsx
'use client';
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
return (
    <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="text-center bg-blue-300 p-8 rounded-md mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-900 mb-4">
            Our Products
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of high-quality building materials, 
            hardware, and construction supplies for all your project requirements.
        </p>
        </header>

        {/* Filters Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:flex-1">
            <div className="flex-1 min-w-0">
                <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
            </div>
            <div className="sm:w-48 w-full">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200">
                <option value="">All Categories</option>
                <option value="Hardware">Hardware</option>
                <option value="Fasteners">Fasteners</option>
                <option value="Drywall">Drywall Supplies</option>
                <option value="Wood">Wood Products</option>
                </select>
            </div>
            </div>
            <div className="flex w-full lg:w-auto">
            <button className="w-full lg:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700">
                Sort by: Latest ▼
            </button>
            </div>
        </div>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
        {products.map((product) => (
            <Link
            href={`/products/${product.slug}`}
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative flex flex-col h-full"
            >
            {/* Product Image Container */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image
                src={product.secondaryImage}
                alt="Product background"
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                className="absolute object-cover group-hover:opacity-0 transition-opacity duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Stock Status Badge */}
                <div className="absolute top-3 right-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    product.inStock 
                    ? 'bg-green-100/90 text-green-800' 
                    : 'bg-red-100/90 text-red-800'
                }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                </div>

                {/* Hot Badge */}
                {product.id <= 3 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    HOT
                </span>
                )}
            </div>

            {/* Product Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3 gap-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 leading-tight">
                    {product.name}
                </h3>
                <span className="text-xl font-bold text-red-600 whitespace-nowrap flex-shrink-0 ml-2">
                    {product.price}
                </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1 leading-relaxed">
                {product.description}
                </p>

                {/* Category */}
                <div className="mb-4">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-md font-medium">
                    {product.category}
                </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-5">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                ))}
                <span className="text-gray-400 ml-2 text-xs">(100+ reviews)</span>
                </div>

                {/* CTA Button */}
                <button 
                className="w-full rounded-xl bg-yellow-500 text-white font-semibold py-3.5 hover:bg-yellow-600 transition-colors duration-200 text-sm mt-auto"
                onClick={(e) => e.preventDefault()}
                >
                Send Inquiry
                </button>
            </div>
            </Link>
        ))}
        </section>

        {/* Load More Section */}
        <section className="text-center">
        <button className="px-10 py-3.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 font-semibold text-gray-700 transition-all duration-200 text-base">
            Load More Products
        </button>
        </section>
    </div>
    </div>
);
}