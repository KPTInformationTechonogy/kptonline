"use client";
import React from 'react';
import { Home, Sofa, Building, Scissors, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Estate from "@/images/realestate.png";
import Automation from "@/images/automation.png";
import ServeFurniture from "@/images/servefunrniture.png";
import Cutting from "@/images/cutting.png";

const services = [
{
    icon: <Home className="w-8 h-8 text-yellow-600" />,
    title: "Home Automation",
    description: "Experience seamless living with our smart home solutions. From lighting and climate control to security systems, we offer integrated automation tailored to your lifestyle.",
    image: Automation,
    details: [
    "Smart lighting control systems",
    "Automated security solutions",
    "Voice-controlled home environments",
    "Energy management systems"
    ]
},
{
    icon: <Sofa className="w-8 h-8 text-yellow-600" />,
    title: "Furniture Services",
    description: "We provide custom and ready-made furniture crafted with precision and style. Whether for residential or commercial spaces, our products combine quality with aesthetic appeal.",
    image: ServeFurniture,
    details: [
    "Custom furniture design",
    "Office furniture solutions",
    "Premium quality materials",
    "Quick delivery and installation"
    ]
},
{
    icon: <Building className="w-8 h-8 text-yellow-600" />,
    title: "Real Estate Development",
    description: "From planning to execution, we deliver real estate solutions that reflect modern design, sustainability, and functionality. Our developments support growing urban needs across Africa.",
    image: Estate,
    details: [
    "Residential and commercial projects",
    "Sustainable building practices",
    "End-to-end project management",
    "Property maintenance services"
    ]
},
{
    icon: <Scissors className="w-8 h-8 text-yellow-600" />,
    title: "Cutting & Edging",
    description: "Utilizing advanced machinery, we offer precise cutting and edging services for wood panels and building materials, ensuring clean finishes and exact dimensions for all projects.",
    image: Cutting,
    details: [
    "Precision CNC cutting",
    "Custom edge banding",
    "Large-scale production capacity",
    "Quality assurance guarantee"
    ]
},
];

export default function ServicesPage() {
return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    {/* Hero Section */}
    <div className="text-center mb-16 bg-blue-500 opacity-60 p-8 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-950 mb-4">Our Premium Services</h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
        With nearly two decades of experience, we deliver high-quality solutions across Africa&apos;s construction and home improvement sectors.
        </p>
    </div>

    {/* Services Grid */}
    <div className="space-y-16 mb-24">
        {services.map((service, idx) => (
        <div 
            key={idx} 
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white rounded-xl shadow-lg overflow-hidden`}
        >
            <div className="w-full md:w-1/2 h-64 md:h-96 relative">
            <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
            />
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                {service.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{service.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <ul className="space-y-2">
                {service.details.map((detail, i) => (
                <li key={i} className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-700">{detail}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
        ))}
    </div>

    {/* Contact Section */}
    <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
        <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Have questions about our services? Our team is ready to assist you with any inquiries.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+234 9078061022</p>
            <p className="text-gray-600">+234 9137904958</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
                <Mail className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600">info@kpt-comp.com.ng</p>
            <p className="text-gray-600">support@kpt-comp.com.ng</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Locations</h3>
            <p className="text-gray-600">Kano, Nigeria</p>
            </div>
        </div>
        </div>
    </div>
    </div>
);
}