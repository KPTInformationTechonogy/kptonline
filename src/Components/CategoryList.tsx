import Link from "next/link";
import Image from "next/image";
import Hinges from "@/images/Hinges - Copy.png";
import Drywall from "@/images/Drywall.png";
import wpc from "@/images/wpcs.png";
import kitchen from "@/images/kitchen.png";
const categories = [
  {
    title: "Plumbing Materials",
    image: Drywall,
    alt: "Plumbing Materials Image",
    href: "/list?cat=plumbing",
  },
  {
    title: "Furniture Materials",
    image: wpc,
    alt: "Furniture Materials Image",
    href: "/list?cat=furniture",
  },
  {
    title: "Building Materials",
    image: Hinges,
    alt: "Building Materials Image",
    href: "/list?cat=building",
  },
  {
    title: "Services",
    image: kitchen,
    alt: "Services Image",
    href: "/list?cat=services",
  },
];

const CategoryList = () => {
  return (
    <section className="bg-white w-full mt-12 py-12 shadow-md rounded-md">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide">
          Explore Our Product Categories
        </h2>
        <p className="text-gray-500 mt-2">
          Find the right materials and services for your next project
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className="w-full sm:w-[45%] lg:w-[22%] bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col hover:-translate-y-1 transition-transform"
          >
            <div className="relative w-full h-60 bg-slate-100 rounded-md overflow-hidden">
              <Image
                src={category.image}
                alt={category.alt}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-center font-medium text-gray-700 tracking-wide">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300">
          View More
        </button>
      </div>
    </section>
  );
};

export default CategoryList;
