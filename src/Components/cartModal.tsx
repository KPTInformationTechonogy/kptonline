"use client";

import Image from "next/image";
import hinges from "@/images/Hinges - Copy.png";

const CartModal = () => {
    const cartItems = true; // This would typically come from your cart state/context

    return (
        <div className="w-80 absolute p-4 top-13  shadow-lg bg-white rounded-md right-0 flex flex-col gap-4 border border-yellow-700 z-20">
            {!cartItems ? (
                <div className="text-gray-500 text-center py-8">Your cart is empty</div>
            ) : (
                <div className="flex flex-col gap-6">
                    <h3 className="font-bold text-yellow-700 text-xl">Shopping Cart</h3>
                    
                    {/* Cart Items List */}
                    <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                        {/* Item 1 */}
                        <div className="flex gap-4 items-center">
                            <Image 
                                src={hinges} 
                                alt="Carbonate Hinges" 
                                width={72} 
                                height={72} 
                                className="rounded-md object-cover border border-gray-200"
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-sm">Carbinate Hinges</h3>
                                    <span className="p-1 bg-yellow-100 rounded text-sm">₦450</span>
                                </div>
                                <p className="text-xs text-gray-500">In stock</p>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Qty: 2</span>
                                    <button className="text-blue-600 hover:text-blue-800">Remove</button>
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-4 items-center">
                            <Image 
                                src={hinges} 
                                alt="Carbonate Hinges" 
                                width={72} 
                                height={72} 
                                className="rounded-md object-cover border border-gray-200"
                            />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-sm">Carbonate Hinges</h3>
                                    <span className="p-1 bg-yellow-100 rounded text-sm">₦450</span>
                                </div>
                                <p className="text-xs text-gray-500">In stock</p>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Qty: 2</span>
                                    <button className="text-blue-600 hover:text-blue-800">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center font-semibold mb-2">
                            <span>Subtotal</span>
                            <span>₦1,600</span>
                        </div>
                        <p className="text-xs text-yellow-600 mb-4">
                            Delivery charges will be calculated at checkout
                        </p>
                        <div className="flex justify-between gap-2">
                            <button className="flex-1 py-2 px-4 rounded-md border border-yellow-300 hover:bg-gray-50 text-sm">
                                View Cart
                            </button>
                            <button className="flex-1 py-2 px-4 rounded-md bg-yellow-700 hover:bg-yellow-800 text-white text-sm">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartModal;