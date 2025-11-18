"use client";

import Image from "next/image";
import aliyu from "@/images/aliyu.jpg";
import ismail from "@/images/ismail.jpg";
import taha from "@/images/taha.jpg";

import {
  BuildingOffice2Icon,
  LightBulbIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const team = [
    { 
      name: "Taha Ali Yahya", 
      role: "Director - Nigeria", 
      img: taha,
      description: "Leading our West African expansion with extensive industry expertise"
    },
    { 
      name: "Ismail Aliyu Abubakar", 
      role: "General Manager", 
      img: ismail,
      description: "Overseeing operations and strategic development across regions"
    },
    { 
      name: "Nura Ayuba Bayero", 
      role: "Sales Representative", 
      img: aliyu,
      description: "Building client relationships and driving market growth"
    },
  ];

  const timeline = [
    { year: "2007", event: "Founded in Yiwu City, China" },
    { year: "2013", event: "Expanded to Middle East & North Africa" },
    { year: "2018", event: "Opened branches in Hong Kong & London" },
    { year: "2024", event: "Launch into West Africa, starting with Nigeria" },
  ];

  const stats = [
    { number: "17+", label: "Years Experience" },
    { number: "100+", label: "Factory Partners" },
    { number: "4", label: "Continents Served" },
    { number: "1000s", label: "Containers Exported" },
  ];

  const navItems = [
    { label: "Overview", id: "overview", icon: DocumentTextIcon },
    { label: "Mission & Vision", id: "mission-vision", icon: LightBulbIcon },
    { label: "Company Background", id: "company-background", icon: BuildingOffice2Icon },
    { label: "Global Reach", id: "expansion", icon: MapPinIcon },
    { label: "Our Journey", id: "journey", icon: ClockIcon },
    { label: "Leadership", id: "team", icon: UserGroupIcon },
    { label: "Locations", id: "locations", icon: GlobeAltIcon },
  ];

  return (
      <div className="flex min-h-screen bg-white text-gray-900">
        {/* Sidebar Navigation */}
        <aside className="w-1/3 bg-gray-50 border-r border-gray-200 p-8 sticky h-[100vh] hidden lg:block">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <BuildingOffice2Icon className="h-7 w-7 text-green-600" />
              About Our Company
            </h2>

            <nav>
              <ul className="space-y-3">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200 text-gray-600 font-medium border-l-4 border-transparent hover:border-green-500"
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 leading-relaxed">
                Pioneering excellence in construction materials and home solutions across Africa since 2007.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-12 px-6 h-[100vh] overflow-y-scroll scroll-smooth lg:px-12 xl:px-24">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* Hero Section */}
            <section id="overview" className="text-center py-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-gray-100">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Building Africa&apos;s Future
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  For nearly two decades, we have been at the forefront of delivering premium building materials 
                  and innovative home solutions across continents, driving sustainable development and technological advancement.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Mission & Vision */}
            <section id="mission-vision" className="space-y-16">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <LightBulbIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To leverage cutting-edge technology and innovation in delivering superior building materials, 
                  construction supplies, furniture, and home automation products that address the evolving needs 
                  of African markets. We are committed to building lasting trust, delivering exceptional value, 
                  and fostering sustainable growth while contributing to local economic development and technological 
                  advancement across the continent.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrophyIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become Africa&apos;s most trusted partner for technology-driven building and home improvement 
                  solutions, transforming living and working environments through uncompromising quality, 
                  innovation, and excellence in service delivery.
                </p>
              </div>
            </section>

            {/* Company Background */}
            <section id="company-background" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">Company Background</h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Established in 2007 in Yiwu City, China, our company brings nearly two decades of specialized 
                  expertise in the global building materials trade. We have cultivated strategic partnerships 
                  with hundreds of certified factories across China, establishing a robust foundation in 
                  quality assurance and supply chain management.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our proven track record includes the successful export of thousands of containers to the 
                  Middle East and North Africa, earning us a reputation for reliability and excellence. 
                  Through our international branches in Hong Kong, London, and Fez City, Morocco, we maintain 
                  a truly global presence while serving diverse markets.
                </p>
              </div>
            </section>

            {/* Global Reach */}
            <section id="expansion" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Global Expansion Strategy</h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  We are strategically expanding across Central and West Africa, commencing with our Nigerian 
                  operations. Our initial focus on Kano provides an optimal foundation for understanding 
                  regional dynamics and refining our operational model for sustainable growth throughout the region.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  By implementing technology-driven solutions, we optimize supply chain efficiency and deliver 
                  exceptional value to both residential and commercial clients, setting new standards for 
                  quality and service in the African construction materials sector.
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section id="journey" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">Our Journey</h2>
              <div className="space-y-6">
                {timeline.map(({ year, event }, index) => (
                  <div key={index} className="flex items-start gap-6 py-4 border-l-4 border-green-500 pl-6">
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold min-w-20 text-center">
                      {year}
                    </div>
                    <p className="text-gray-700 text-lg font-medium pt-2">{event}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section id="team" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">Leadership Team</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {team.map(({ name, role, img, description }, index) => (
                  <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg group-hover:border-green-100 transition-colors">
                      <Image
                        src={img}
                        alt={name}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{name}</h3>
                    <p className="text-green-600 font-semibold mb-3">{role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Locations */}
            <section id="locations" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Global Presence</h2>
                <p className="text-gray-600 text-lg">
                  Strategically located across four continents to serve global markets
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
  );
}