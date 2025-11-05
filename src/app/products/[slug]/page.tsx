// app/products/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, Product } from "@/data/products";

interface ProductPageProps {
params: {
    slug: string;
};
}

// Generate static params for better performance
export async function generateStaticParams() {
return products.map((product) => ({
    slug: product.slug,
}));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
const product = products.find((p) => p.slug === params.slug);

if (!product) {
    return {
    title: "Product Not Found",
    };
}

return {
    title: `${product.name} | Building Materials`,
    description: product.description,
};
}

export default function ProductDetailPage({ params }: ProductPageProps) {
const product = products.find((p) => p.slug === params.slug);

if (!product) {
    notFound();
}

return (
    <div className="min-h-screen bg-gray-50 py-8">
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
            <li>
            <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
        </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                />
            </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto">
            <div className="flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 border-yellow-500 p-1">
                <Image
                src={product.primaryImage}
                alt={product.name}
                width={80}
                height={80}
                className="object-cover rounded-md w-full h-full"
                />
            </div>
            <div className="flex-shrink-0 w-20 h-20 bg-white rounded-lg border border-gray-200 p-1">
                <Image
                src={product.secondaryImage}
                alt={`${product.name} alternative`}
                width={80}
                height={80}
                className="object-cover rounded-md w-full h-full"
                />
            </div>
            </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Category and Stock */}
            <div className="flex items-center justify-between mb-4">
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
            </span>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
            <p className="text-4xl font-bold text-red-600">{product.price}</p>
            <p className="text-sm text-gray-500 mt-1">Minimum Order: {product.minOrder}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
            <div className="flex text-yellow-500 text-lg">
                {Array(5).fill(0).map((_, i) => (
                <span key={i}>★</span>
                ))}
            </div>
            <span className="ml-2 text-gray-600">4.8 (100+ reviews)</span>
            </div>

            {/* Description */}
            <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Key Features */}
            <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    {feature}
                </li>
                ))}
            </ul>
            </div>

            {/* Specifications */}
            <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-900">{value}</span>
                </div>
                ))}
            </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
                {product.inStock ? (
                    <Link
                    href={`/contact?product_id=${product.id}&product_name=${encodeURIComponent(product.name)}&product_price=${encodeURIComponent(product.price)}`}
                    className="block"
                    >
                    <button 
                        className="w-full bg-yellow-500 text-white font-semibold py-4 rounded-xl hover:bg-yellow-600 transition-colors text-lg"
                    >
                        Send Inquiry
                    </button>
                    </Link>
                ) : (
                    <button 
                    disabled
                    className="w-full bg-gray-400 text-white font-semibold py-4 rounded-xl cursor-not-allowed text-lg"
                    >
                    Out of Stock
                    </button>
                )}
                </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
                <span className="font-semibold">Delivery:</span>
                <span className="ml-2">{product.deliveryTime} within Kano</span>
            </div>
            </div>
        </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
    </div>
);
}

// Related Products Component
function RelatedProducts({ currentProductId, category }: { currentProductId: number; category: string }) {
const relatedProducts = products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4);

if (relatedProducts.length === 0) return null;

return (
    <section>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
        <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
            <div className="relative h-48 bg-gray-100">
            <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                className="object-cover"
            />
            </div>
            <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                {product.name}
            </h3>
            <p className="text-red-600 font-bold text-lg">{product.price}</p>
            </div>
        </Link>
        ))}
    </div>
    </section>
);
}