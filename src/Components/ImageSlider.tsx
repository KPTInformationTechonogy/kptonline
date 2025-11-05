"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import Hinges from "@/images/Hinges - Copy.png";
import Drywall from "@/images/Drywall.png";
import bedhook from "@/images/bedhook.png";
import door from "@/images/doorlock.png";
import mhinges from "@/images/m hinges.png";
import plastic from "@/images/plasticAngle.png";
import plywood from "@/images/plywood.png";
import screws from "@/images/screws.png";
import staples from "@/images/staples.png";
import tape from "@/images/tap.png";
import plier from "@/images/plier.png";
import angleiron from "@/images/angleiron.png";
import wpc from "@/images/wpcs.png";
import wallpannel from "@/images/Wallpanel.png";

const products = [
{ id: 1, name: "Door Hinges", primaryImage: Hinges, secondaryImage: mhinges },
{ id: 2, name: "Drywall Sheets", primaryImage: Drywall, secondaryImage: screws },
{ id: 3, name: "Wooden Furniture", primaryImage: wpc, secondaryImage: plywood },
{ id: 4, name: "Door Lock", primaryImage: door, secondaryImage: bedhook },
{ id: 5, name: "Drywall Panels", primaryImage: wpc, secondaryImage: wallpannel },
{ id: 6, name: "Bed Hook", primaryImage: bedhook, secondaryImage: plier },
{ id: 7, name: "Staples", primaryImage: staples, secondaryImage: tape },
{ id: 8, name: "Angle Bracket", primaryImage: angleiron, secondaryImage: plastic },
];

const ProductList = () => {
const scrollContainer = useRef<HTMLDivElement>(null);
const [isDragging, setIsDragging] = useState(false);
const [startX, setStartX] = useState(0);
const [scrollLeft, setScrollLeft] = useState(0);

const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
if (!scrollContainer.current) return;
setIsDragging(true);
setStartX(e.pageX - scrollContainer.current.offsetLeft);
setScrollLeft(scrollContainer.current.scrollLeft);
};

const handleMouseLeave = () => {
setIsDragging(false);
};

const handleMouseUp = () => {
setIsDragging(false);
};

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
if (!isDragging || !scrollContainer.current) return;
e.preventDefault();
const x = e.pageX - scrollContainer.current.offsetLeft;
const walk = (x - startX) * 1.5; // scroll speed multiplier
scrollContainer.current.scrollLeft = scrollLeft - walk;
};

return (
<section className="w-full bg-white py-12 px-4 shadow-md rounded-md mt-12 relative">
    <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-900">Product Category</h2>
    </div>

    <div
    ref={scrollContainer}
    className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6 cursor-grab active:cursor-grabbing"
    style={{ scrollSnapType: "x mandatory" }}
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    >
    {products.map((product) => (
        <Link
        href={`/products/${product.id}`}
        key={product.id}
        className="flex-shrink-0 w-64 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-md p-4 hover:-translate-y-1"
        style={{ scrollSnapAlign: "start" }}
        >
        <div className="relative w-full h-48 rounded-md overflow-hidden">
            <Image
            src={product.secondaryImage}
            alt={`${product.name} Alternate`}
            fill
            className="object-cover"
            />
            <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            className="object-cover absolute top-0 left-0 z-10 hover:opacity-0 transition-opacity duration-500"
            />
        </div>
        <div className="mt-4">
            <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
        </div>
        </Link>
    ))}
    </div>
</section>
);
};

export default ProductList;
