// components/ProductImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductImage({ src, alt, width, height, className }: {
src: string | File | null;
alt: string;
width: number;
height: number;
className?: string;
}) {
const [imgSrc, setImgSrc] = useState(() => {
    if (!src) return '/placeholder-product.png';
    if (typeof src === 'string') return src;
    return URL.createObjectURL(src);
});

return (
    <Image
    src={imgSrc}
    alt={alt}
    width={width}
    height={height}
    className={className}
    onError={() => setImgSrc('/placeholder-product.png')}
    />
);
}