// app/products/page.tsx
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
return (
    <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality building materials, 
            hardware, and construction supplies for all your project needs.
        </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex-1"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent w-full sm:w-48">
                <option value="">All Categories</option>
                <option value="Hardware">Hardware</option>
                <option value="Fasteners">Fasteners</option>
                <option value="Drywall">Drywall Supplies</option>
                <option value="Wood">Wood Products</option>
            </select>
            </div>
            <div className="flex gap-2">
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                Sort by: Latest
            </button>
            </div>
        </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
            <Link
            href={`/products/${product.slug}`}
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
            >
            {/* Product image container */}
            <div className="relative w-full h-64 overflow-hidden bg-gray-100">
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
                
                {/* Stock Status */}
                <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                </div>
            </div>

            {/* Product content */}
            <div className="p-4 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 mr-2">
                    {product.name}
                </h3>
                <span className="text-xl font-bold text-red-600 whitespace-nowrap">
                    {product.price}
                </span>
                </div>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {product.description}
                </p>

                {/* Category */}
                <div className="mb-3">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {product.category}
                </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                {Array(5).fill(0).map((_, i) => (
                    <span key={i}>★</span>
                ))}
                <span className="text-gray-400 ml-1 text-xs">(100+)</span>
                </div>

                <button className="w-full rounded-xl bg-yellow-500 text-white font-semibold py-3 hover:bg-yellow-600 transition-colors text-sm">
                Send Inquiry
                </button>
            </div>

            {/* Hot badge for featured products */}
            {product.id <= 3 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                HOT
                </span>
            )}
            </Link>
        ))}
        </div>

        {/* Load More */}
        <div className="text-center">
        <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700">
            Load More Products
        </button>
        </div>
    </div>
    </div>
);
}