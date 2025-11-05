// components/Testimonials.js
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Switching to [Your Company] saved us 15% on material costs without compromising quality.",
      author: "John Doe",
      company: "ABC Construction"
    },
    // Add more testimonials
  ];

  return (
    <section className="py-16 bg-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-lg italic mb-6">&quot;{testimonial.quote}&quot;</p>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-gray-600">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
