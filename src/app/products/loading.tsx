// app/products/loading.tsx
export default function ProductsLoading() {
return (
    <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4">
        <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Filters skeleton */}
        <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded flex-1"></div>
            <div className="h-12 bg-gray-200 rounded w-48"></div>
            </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4">
                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
            ))}
        </div>
        </div>
    </div>
    </div>
);
}