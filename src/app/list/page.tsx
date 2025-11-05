import Image from "next/image";
import Filters from "@/Components/filters";
import OtherProducts from "@/Components/otherProducts"
import decoration from "@/images/decoration.webp"
import Skeleton from "@/Components/Skeleton";
import Product from "@/Components/ProductList";
import { Suspense } from "react";
const ListPage = () => {
    return (
        <div className="mt-24 relative px-4 md:px-8 lg:px-16 xl:px-32">
            {/* Campaign */}
            <div className="hidden  bg-yellow-100 p-4 sm:flex justify-between h-64 gap-8">
                <div className="w-2/3 flex flex-col items-center justify-center gap-8">
                    <h1 className="justify-center items-center text-4xl font-semibold leading-[40px] text-blue-700">Grab up to 20% off on <br /> Selected Products</h1>
                    <button className="rounded-3xl bg-yellow-700 text-white hover:tracking-wider w-max py-3 px-5 text-sm">Buy Now</button>
                </div>
                <div className="w-1/3 relative">
                    <Image src={decoration} alt="Logo" fill  className="object-contain w-100 h-50" />
                </div>
                
            </div>
            {/* Filter */}
            <Filters />
            {/* Products */}
            <h1 className="mt-12 text-xl">Furniture hardwares for you!</h1>
            <Suspense fallback={<Skeleton/>}>
            <Product />
            {/* Other Products */}
            <OtherProducts />
            </Suspense>
        </div>
    );
}
export default ListPage;
