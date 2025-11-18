// components/ProductList.tsx (Updated)
"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const ProductList = () => {
  const featuredProducts = products.slice(0, 8); // Show first 8 products on homepage

  return (
    <section className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
            Discover high-quality materials and premium fittings for your next project
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.id}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 relative flex flex-col"
            >
              {/* Product image container */}
              <div className="relative w-full aspect-square sm:h-64 overflow-hidden bg-gray-50">
                <Image
                  src={product.secondaryImage}
                  alt="Background image"
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  className="absolute object-cover group-hover:opacity-0 transition-opacity duration-500"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Hot Badge */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] xs:text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  HOT
                </span>
              </div>

              {/* Product content */}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 flex-1 leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-base sm:text-lg font-bold text-red-600 whitespace-nowrap flex-shrink-0 ml-1">
                    {product.price}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Static rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-xs mb-3 sm:mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-xs sm:text-sm">★</span>
                  ))}
                  <span className="text-gray-400 ml-1 text-xs">(100+)</span>
                </div>

                {/* CTA Button */}
                <button
                  className="mt-auto rounded-lg sm:rounded-xl bg-yellow-400 text-white text-sm py-2 sm:py-2.5 hover:bg-yellow-500 transition-colors duration-200 font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Send Inquiry
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <Link href="/products">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-yellow-500 text-white rounded-lg sm:rounded-md hover:bg-yellow-600 transition-colors duration-200 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md">
              Explore More Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductList;