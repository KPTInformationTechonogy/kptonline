// components/FAQ.js
const FAQ =()=> {
  const faqs = [
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! Contact us for customized pricing on large orders."
    },
    {
      question: "Can I request samples before ordering?",
      answer: "Absolutely—we provide samples for quality assurance."
    },
    // Add more FAQs
  ];

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default FAQ;