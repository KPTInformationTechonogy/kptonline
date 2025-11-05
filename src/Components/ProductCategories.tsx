// components/ProductCategories.js
const ProductCategories = () => {
  const categories = [
    {
      title: "🏗️ Building Materials",
      items: [
        "Cement, Steel & Aggregates",
        "Plywood & Lumber",
        "Roofing Solutions",
        "Tiles & Flooring"
      ],
      cta: "Explore Building Materials"
    },
    {
      title: "🪑 Furniture & Interior",
      items: [
        "Office & Home Furniture",
        "Cabinets & Countertops",
        "Doors & Windows",
        "Decorative Fixtures"
      ],
      cta: "Browse Furniture"
    },
    // Add other categories similarly
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Our Product Categories</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
            <ul className="space-y-2 mb-6">
              {category.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2">✔</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="text-blue-600 font-medium hover:underline">
              {category.cta} →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
export default ProductCategories;