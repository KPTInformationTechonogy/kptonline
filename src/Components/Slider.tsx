"use client";

import Image from "next/image";
import Link from "next/link";
import decoration from "@/images/wpcs.png";
import kptshelves from "@/images/KPT Shelves.png";
import furniture from "@/images/home-dec.jpeg";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const Slider = () => {
    const slides = [
        {
            id: 1,
            title: "Home Decoration Collection",
            description: "Sale! Up to 50% off!",
            img: decoration,
            url: "/",
        },
        {
            id: 2,
            title: "Furniture Materials Collection",
            description: "Sale! Up to 20% off!",
            img: kptshelves,
            url: "/",
        },
        {
            id: 3,
            title: "Plumbing Materials Collection",
            description: "Sale! Up to 15% off!",
            img: furniture,
            url: "/",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative overflow-hidden w-full h-[100vh]">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={slide.img}
                        alt={slide.title}
                        className="object-cover w-full h-full"
                        fill
                        priority={index === 0}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center m-auto text-center text-white bg-yellow-500 opacity-70 p-8 rounded-lg">
                        <h3 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h3>
                        <p className="text-xl md:text-2xl mb-6">{slide.description}</p>
                        <Link href={slide.url}>
                            <button className="flex items-center gap-2 bg-yellow-800 hover:bg-yellow-700 text-white px-6 py-3 rounded-md transition-colors mx-auto">
                                Shop Now <ArrowRight size={20} />
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentSlide ? "bg-yellow-800" : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;