// components/WhyChooseUs.tsx
import { CheckCircle, Lightbulb, ShieldCheck, Leaf, Users } from 'lucide-react';

const values = [
  {
    icon: <Users className="text-green-600 w-8 h-8" />,
    title: "Customer-Centricity",
    description:
      "Our customers' needs drive our decisions, ensuring that we deliver tailored solutions with excellent service.",
  },
  {
    icon: <Lightbulb className="text-blue-600 w-8 h-8" />,
    title: "Innovation",
    description:
      "Constantly pushing boundaries through technology and modern design to provide cutting-edge solutions.",
  },
  {
    icon: <CheckCircle className="text-yellow-600 w-8 h-8" />,
    title: "Quality",
    description:
      "Upholding the highest standards to offer durable, reliable products.",
  },
  {
    icon: <ShieldCheck className="text-purple-600 w-8 h-8" />,
    title: "Integrity",
    description:
      "Committing to honesty, responsibility, and transparency in all business dealings.",
  },
  {
    icon: <Leaf className="text-emerald-600 w-8 h-8" />,
    title: "Sustainability",
    description:
      "Prioritizing eco-friendly practices and sustainable sourcing across all operations.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-lg text-gray-600">Our core values shape every product, service, and relationship.</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, index) => (
          <div 
            key={index} 
            className="hover:shadow-lg bg-white transition duration-300 ease-in-out rounded-2xl p-6 text-center"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}