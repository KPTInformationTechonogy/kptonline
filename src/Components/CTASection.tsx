// components/CTASection.js
const CTASection = () => {
  return (
    <section className="py-16 bg-blue-900 text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Build Better?</h2>
        <p className="text-xl mb-8">Get wholesale pricing on quality construction materials today</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
            Request Quote
          </button>
          <button className="bg-transparent hover:bg-blue-800 text-white font-bold py-3 px-8 border border-white rounded-lg text-lg transition">
            Call Us Now
          </button>
        </div>
        
        <p className="mt-8 text-blue-200">Limited-time offer: Free shipping on first orders over $1,000</p>
      </div>
    </section>
  );
}
export default CTASection;