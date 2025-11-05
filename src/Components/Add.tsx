"use client";
import { useState } from "react";

const Add = () => {
    const [quantity, setQuantity] = useState(1);
    
    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < 100) {
            setQuantity((prev) => prev + 1);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Choose a Quantity</h4>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 bg-blue-400 py-2 px-4 rounded-3xl justify-between w-32">
                    <button className="text-xl cursor-pointer" onClick={() => handleQuantity("d")}>-</button>
                    {quantity}
                    <button className="text-xl cursor-pointer" onClick={() => handleQuantity("i")}>+</button>
                </div>
                <button className="w-36 text-sm rounded-3xl ring-1 ring-yellow-700 text-yellow-700 py-2 px-4 hover:bg-yellow-700 hover:text-white disabled:cursor-not-allowed disabled:bg-blue-500 disabled:text-white disabled:ring-none">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Add;