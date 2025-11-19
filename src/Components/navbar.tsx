'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Logo from "@/images/kpt_logo.jpeg";
import Menu from './Menu'; // Import the mobile menu component

const Navbar = () => {
const { user, logout, hasRole } = useAuth();
const router = useRouter();

const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

const handleLogout = () => {
    logout();
    setDropdownOpen(false);
};

// Close dropdown when clicking outside
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
    }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

return (
    <header className="sticky w-full top-0 z-50 h-16 bg-yellow-800 shadow-lg border-b border-yellow-700">
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
        <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
            <Image 
            src={Logo} 
            alt="Kano Process Trading Company Logo" 
            width={48}
            height={48}
            className="rounded-lg object-cover"
            priority
            />
            <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white font-sans tracking-tight">
                Kano Process Trading
            </h1>
            <p className="text-xs text-yellow-100 font-normal">Company Limited</p>
            </div>
        </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-8 text-yellow-100 font-medium text-sm">
            <Link 
            href="/" 
            className="hover:text-white transition-colors duration-200 py-2 relative group"
            >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/services" 
            className="hover:text-white transition-colors duration-200 py-2 relative group"
            >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/products" 
            className="hover:text-white transition-colors duration-200 py-2 relative group"
            >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/about" 
            className="hover:text-white transition-colors duration-200 py-2 relative group"
            >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/contact" 
            className="hover:text-white transition-colors duration-200 py-2 relative group"
            >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
        </div>
        </nav>

        {/* Desktop User Actions */}
        <div className="flex items-center gap-4">
        {user ? (
            <>
            {/* Customer Cart */}
            {hasRole(['customer']) && (
                <Link href="/customer/cart" className="hidden sm:block relative">
                <button className="p-2 rounded-lg bg-yellow-700 hover:bg-yellow-600 transition-colors duration-200 text-white border border-yellow-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </button>
                </Link>
            )}

            {/* User Dropdown */}
            <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200 border border-transparent hover:border-yellow-600"
                >
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                    {user.email.charAt(0).toUpperCase()}
                    </span>
                </div>
                <svg 
                    className={`w-4 h-4 text-yellow-100 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                </button>

                {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
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
                    <div className="py-1">
                    <button
                        onClick={() => {
                        router.push('/dashboard');
                        setDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition-colors duration-150"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </button>
                    
                    {hasRole(['customer']) && (
                        <button
                        onClick={() => {
                            router.push('/customer/profile');
                            setDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 transition-colors duration-150"
                        >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                        </button>
                    )}
                    </div>
                    
                    {/* Logout */}
                    <div className="pt-1 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log out
                    </button>
                    </div>
                </div>
                )}
            </div>
            </>
        ) : (
            /* Auth Buttons */
            <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
                <button className="px-4 py-2 text-yellow-100 hover:text-white transition-colors duration-200 font-medium text-sm">
                Login
                </button>
            </Link>
            </div>
        )}

        {/* Mobile Menu Component */}
        <Menu />
        </div>
    </div>
    </header>
);
};

export default Navbar;