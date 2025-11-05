'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Logo from "@/images/kpt_logo.jpeg";
import menuIcon from "@/images/menu.png";

const Navbar = () => {
const { user, logout, hasRole } = useAuth();
const router = useRouter();

const [dropdownOpen, setDropdownOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
const mobileMenuRef = useRef<HTMLDivElement>(null);

const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
};

// Close dropdowns when clicking outside
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    // Close profile dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
    }
    // Close mobile menu
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
    }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// Close mobile menu on route change
useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
}, []);

return (
    <header className="sticky w-full top-0 z-50 h-16 sm:h-20 bg-yellow-800 shadow-lg">
    <div className="flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-16 xl:px-32 h-full">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-4">
            <Image 
            src={Logo} 
            alt="Kano Process Trading Company Logo" 
            width={40} 
            height={40} 
            className="rounded-md ring-2 ring-white sm:w-12 sm:h-12"
            />
            <h1 className="hidden sm:block text-sm md:text-lg font-bold text-white font-sans tracking-wide">
            Kano Process Trading Company
            </h1>
        </Link>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-6 lg:gap-8 text-white font-sans font-semibold text-sm">
            <Link href="/" className="hover:text-yellow-200 transition-colors duration-200 py-2">Home</Link>
            <Link href="/services" className="hover:text-yellow-200 transition-colors duration-200 py-2">Services</Link>
            <Link href="/products" className="hover:text-yellow-200 transition-colors duration-200 py-2">Products</Link>
            <Link href="/about" className="hover:text-yellow-200 transition-colors duration-200 py-2">About</Link>
            <Link href="/contact" className="hover:text-yellow-200 transition-colors duration-200 py-2">Contact</Link>
        </div>
        </nav>

        {/* User Actions and Auth Section */}
        <div className="flex items-center gap-2 sm:gap-4" ref={mobileMenuRef}>
        {user ? (
            <>
            {/* Customer-specific features - Hidden on small mobile */}
            {hasRole(['customer']) && (
                <Link href="/customer/cart" className="hidden sm:block">
                <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-yellow-700 hover:bg-yellow-600 transition-colors duration-200 text-white text-sm sm:text-base">
                    Cart
                </button>
                </Link>
            )}

            {/* Profile Avatar and Dropdown - Hidden on mobile when menu is available */}
            <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-700 hover:bg-yellow-600 flex items-center justify-center border-2 border-white transition-colors duration-200"
                >
                <span className="text-white font-medium text-sm sm:text-lg">
                    {user.email.charAt(0).toUpperCase()}
                </span>
                </button>

                {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 origin-top-right bg-white rounded-lg shadow-xl py-2 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {user.roles
                        .map((role: string) => role.charAt(0).toUpperCase() + role.slice(1))
                        .join(', ')}
                    </p>
                    </div>
                    
                    {/* Navigation Links */}
                    <button
                    onClick={() => {
                        router.push('/dashboard');
                        setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 transition-colors duration-150"
                    >
                    Dashboard
                    </button>
                    
                    {hasRole(['customer']) && (
                    <button
                        onClick={() => {
                        router.push('/customer/profile');
                        setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 transition-colors duration-150"
                    >
                        Profile
                    </button>
                    )}
                    
                    {/* Logout */}
                    <button
                    onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 border-t border-gray-100 mt-1"
                    >
                    Log out
                    </button>
                </div>
                )}
            </div>
            </>
        ) : (
            /* Login/Register Buttons - Hidden on mobile */
            <div className="hidden sm:flex items-center gap-2 md:gap-3">
            <Link href="/login">
                <button className="px-3 py-1 md:px-4 md:py-2 bg-white text-yellow-800 rounded-md hover:bg-gray-100 transition-colors duration-200 font-semibold border border-yellow-800 text-sm md:text-base">
                Login
                </button>
            </Link>
            <Link href="/register">
                <button className="px-3 py-1 md:px-4 md:py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 font-semibold border border-yellow-700 text-sm md:text-base">
                Register
                </button>
            </Link>
            </div>
        )}

        {/* Mobile Menu Button - Visible on tablets and mobile */}
        <div className="lg:hidden">
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md transition-colors duration-200 ${
                mobileMenuOpen ? 'bg-yellow-700' : 'bg-transparent hover:bg-yellow-700'
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            >
            <Image 
                src={menuIcon} 
                width={20} 
                height={20} 
                alt="menu" 
                className="filter invert sm:w-6 sm:h-6"
            />
            </button>
        </div>
        </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-yellow-200 z-40">
        <div className="py-4 px-6">
            {/* User Info Section for Mobile */}
            {user ? (
            <div className="pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-yellow-700 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                    {user.email.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                    {user.roles
                        .map((role: string) => role.charAt(0).toUpperCase() + role.slice(1))
                        .join(', ')}
                    </p>
                </div>
                </div>
                
                {/* User Actions for Mobile */}
                <div className="space-y-2">
                <button
                    onClick={() => {
                    router.push('/dashboard');
                    setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 rounded-md transition-colors"
                >
                    Dashboard
                </button>
                {hasRole(['customer']) && (
                    <>
                    <button
                        onClick={() => {
                        router.push('/customer/profile');
                        setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 rounded-md transition-colors"
                    >
                        Profile
                    </button>
                    <Link 
                        href="/customer/cart" 
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-yellow-50 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Cart
                    </Link>
                    </>
                )}
                </div>
            </div>
            ) : (
            <div className="pb-4 mb-4 border-b border-gray-100 space-y-2">
                <Link 
                href="/login" 
                className="block max-w-8/12 text-center px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
                >
                Login
                </Link>
                <Link 
                href="/register" 
                className="block w-full text-center px-4 py-2 border border-yellow-700 text-yellow-700 rounded-md hover:bg-yellow-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
                >
                Register
                </Link>
            </div>
            )}

            {/* Mobile Navigation Links */}
            <nav className="space-y-1">
            <Link 
                href="/" 
                className="block px-3 py-3 text-gray-700 hover:bg-yellow-50 rounded-md transition-colors font-medium border-l-4 border-transparent hover:border-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
            >
                Home
            </Link>
            <Link 
                href="/services" 
                className="block px-3 py-3 text-gray-700 hover:bg-yellow-50 rounded-md transition-colors font-medium border-l-4 border-transparent hover:border-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
            >
                Services
            </Link>
            <Link 
                href="/products" 
                className="block px-3 py-3 text-gray-700 hover:bg-yellow-50 rounded-md transition-colors font-medium border-l-4 border-transparent hover:border-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
            >
                Products
            </Link>
            <Link 
                href="/about" 
                className="block px-3 py-3 text-gray-700 hover:bg-yellow-50 rounded-md transition-colors font-medium border-l-4 border-transparent hover:border-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
            >
                About
            </Link>
            <Link 
                href="/contact" 
                className="block px-3 py-3 text-gray-700 hover:bg-yellow-50 rounded-md transition-colors font-medium border-l-4 border-transparent hover:border-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
            >
                Contact
            </Link>
            </nav>

            {/* Logout for authenticated users in mobile */}
            {user && (
            <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium border-l-4 border-transparent hover:border-red-600"
                >
                Log out
                </button>
            </div>
            )}
        </div>
        </div>
    )}

    {/* Backdrop for mobile menu */}
    {mobileMenuOpen && (
        <div 
        className="lg:hidden fixed inset-0 bg-transparent bg-opacity-50 z-10"
        onClick={() => setMobileMenuOpen(false)}
        />
    )}
    </header>
);
};

export default Navbar;