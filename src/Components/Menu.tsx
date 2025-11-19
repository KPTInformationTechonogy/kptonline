"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import menuIcon from "@/images/menu.png";
import closeIcon from "@/images/close.png";

const Menu = () => {
const { user, logout, hasRole } = useAuth();
const router = useRouter();

const [isOpen, setIsOpen] = useState(false);
const menuRef = useRef<HTMLDivElement>(null);

const handleLogout = () => {
    logout();
    setIsOpen(false);
};

const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
};

// Close menu when clicking outside
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
    }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// Close menu on route change
useEffect(() => {
    const handleRouteChange = () => {
    setIsOpen(false);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
    window.removeEventListener("popstate", handleRouteChange);
    };
}, []);

return (
    <div className="block lg:hidden" ref={menuRef}>
    {/* Menu Toggle Button */}
    <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors duration-200 ${
        isOpen ? "bg-yellow-50 text-yellow-700" : "text-gray-600 hover:bg-gray-100"
        }`}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
    >
        <Image 
        src={isOpen ? closeIcon : menuIcon} 
        width={24} 
        height={24} 
        alt="menu"
        className={`transition-opacity ${isOpen ? "opacity-70" : ""}`}
        />
    </button>

    {/* Mobile Menu Overlay */}
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300" />
    )}

    {/* Mobile Menu Panel */}
    <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-2xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
        <div className="pt-20 pb-8 px-6 h-full flex flex-col overflow-y-auto">
        {/* User Info Section */}
        {user ? (
            <div className="pb-6 mb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center shadow-md">
                <span className="text-white font-medium text-lg">
                    {user.email.charAt(0).toUpperCase()}
                </span>
                </div>
                <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-gray-900 truncate">
                    {user.email}
                </p>
                <p className="text-sm text-gray-500">
                    {user.roles
                    .map((role: string) => role.charAt(0).toUpperCase() + role.slice(1))
                    .join(", ")}
                </p>
                </div>
            </div>
            
            {/* User Actions */}
            <div className="grid grid-cols-2 gap-2">
                <button
                onClick={() => handleNavigation("/dashboard")}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors font-medium hover:bg-yellow-50 hover:text-yellow-700 border border-gray-200"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
                </button>
                
                {hasRole(["customer"]) && (
                <>
                    <button
                    onClick={() => handleNavigation("/customer/profile")}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors font-medium hover:bg-yellow-50 hover:text-yellow-700 border border-gray-200"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                    </button>
                    
                    <button
                    onClick={() => handleNavigation("/customer/cart")}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors font-medium hover:bg-yellow-50 hover:text-yellow-700 border border-gray-200 col-span-2"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View Cart
                    </button>
                </>
                )}
            </div>
            </div>
        ) : (
            <div className="pb-6 mb-6 border-b border-gray-200 space-y-3">
            <button
                onClick={() => handleNavigation("/login")}
                className="block w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium text-center shadow-sm"
            >
                Login
            </button>
            <button
                onClick={() => handleNavigation("/register")}
                className="block w-full px-4 py-3 border-2 border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-medium text-center"
            >
                Register
            </button>
            </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1 flex-1">
            {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Products", path: "/products" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" }
            ].map((item) => (
            <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center gap-3 w-full text-left px-4 py-4 text-gray-700 hover:bg-yellow-50 rounded-lg transition-all font-semibold text-base border-l-4 border-transparent hover:border-yellow-600 hover:text-yellow-800 group"
            >
                <div className="w-2 h-2 bg-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {item.name}
            </button>
            ))}
        </nav>

        {/* Logout for authenticated users */}
        {user && (
            <div className="pt-6 mt-6 border-t border-gray-200">
            <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium border-2 border-red-600 hover:border-red-700"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
            </button>
            </div>
        )}
        </div>
    </div>
    </div>
);
};

export default Menu;