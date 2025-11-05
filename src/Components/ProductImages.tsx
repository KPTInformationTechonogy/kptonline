"use client";
import { useState } from "react";
import decoration from "@/images/decoration.webp";
import Image from "next/image";

const images = [
{
id: 1,
url: decoration,
},
{
id: 2,
url: decoration,
},
{
id: 3,
url: decoration,
},
{
id: 4,
url: decoration,
},
];

const ProductImages = () => {
const [index, setIndex] = useState(0);

return (
<div className="">
    <div className="h-[500px] relative">
    <Image
        src={images[index].url}
        alt="Product Image"
        fill
        sizes="50vw"
        className="object-cover rounded-md"
    />
    </div>

    <div className="flex gap-4 mt-8">
    {images.map((img, i) => (
        <div
        className="w-1/4 h-32 relative cursor-pointer"
        key={img.id}
        onClick={() => setIndex(i)}
        >
        <Image
            src={img.url}
            alt={`Product Thumbnail ${i + 1}`}
            fill
            sizes="30vw"
            className="object-cover rounded-md"
        />
        </div>
    ))}
    </div>
</div>
);
};

export default ProductImages;
