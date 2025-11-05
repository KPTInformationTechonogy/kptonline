// components/ProductList.tsx (Updated)
"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const ProductList = () => {
  const featuredProducts = products.slice(0, 8); // Show first 8 products on homepage

  return (
    <section className="w-full bg-white py-12 px-4 mt-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">Featured Products</h2>
        <p className="text-gray-500 mt-2">
          Discover high-quality materials and premium fittings for your next project
        </p>
      </div>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((product) => (
          <Link
            href={`/products/${product.slug}`}
            key={product.id}
            className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
          >
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
            </div>

            {/* Product content */}
            <div className="p-3 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <span className="text-base font-bold text-red-600">{product.price}</span>
              </div>

              <p className="text-xs text-gray-500 mb-2 truncate">{product.description}</p>

              {/* Static rating (Temu-like) */}
              <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                <span className="text-gray-400 ml-1">(100+)</span>
              </div>

              <button
                className="mt-auto rounded-xl bg-yellow-400 text-white text-sm py-2 hover:bg-yellow-500 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Send Inquiry
              </button>
            </div>

            {/* Optional badge */}
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow">
              HOT
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/products">
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
            Explore More Products
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProductList;