'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Logo from "@/images/kpt_logo.jpeg";
import menuIcon from "@/images/menu.png";
import closeIcon from "@/images/close.png";

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
    setDropdownOpen(false);
};

const closeMobileMenu = () => {
    setMobileMenuOpen(false);
};

const handleMobileNavigation = (path: string) => {
    router.push(path);
    closeMobileMenu();
};

// Close dropdowns when clicking outside
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
    }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// Close mobile menu on route change
useEffect(() => {
    const handleRouteChange = () => {
    closeMobileMenu();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
    window.removeEventListener('popstate', handleRouteChange);
    };
}, []);

return (
    <header className="sticky w-full top-0 z-50 h-16 bg-white shadow-lg border-b border-gray-200">
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
        <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            onClick={() => setMobileMenuOpen(false)}
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
            <h1 className="text-lg font-bold text-gray-900 font-sans tracking-tight">
                Kano Process Trading
            </h1>
            <p className="text-xs text-gray-600 font-normal">Company Limited</p>
            </div>
        </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
        <div className="flex items-center gap-8 text-gray-700 font-medium text-sm">
            <Link 
            href="/" 
            className="hover:text-yellow-700 transition-colors duration-200 py-2 relative group"
            >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/services" 
            className="hover:text-yellow-700 transition-colors duration-200 py-2 relative group"
            >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/products" 
            className="hover:text-yellow-700 transition-colors duration-200 py-2 relative group"
            >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/about" 
            className="hover:text-yellow-700 transition-colors duration-200 py-2 relative group"
            >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
            href="/contact" 
            className="hover:text-yellow-700 transition-colors duration-200 py-2 relative group"
            >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-700 transition-all group-hover:w-full"></span>
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
                <button className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors duration-200 text-yellow-700 border border-yellow-200">
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
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200"
                >
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                    {user.email.charAt(0).toUpperCase()}
                    </span>
                </div>
                <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
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
                <button className="px-4 py-2 text-gray-700 hover:text-yellow-700 transition-colors duration-200 font-medium text-sm">
                Login
                </button>
            </Link>
            <Link href="/register">
                <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium text-sm shadow-sm">
                Register
                </button>
            </Link>
            </div>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden" ref={mobileMenuRef}>
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
                mobileMenuOpen ? 'bg-yellow-50 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            >
            <Image 
                src={mobileMenuOpen ? closeIcon : menuIcon} 
                width={24} 
                height={24} 
                alt="menu"
                className={`transition-opacity ${mobileMenuOpen ? 'opacity-70' : ''}`}
            />
            </button>
        </div>
        </div>
    </div>

    {/* Mobile Menu */}
    <div 
        className={`lg:hidden fixed top-0 left-0 right-0 h-full bg-white z-40 transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
        <div className="pt-20 pb-8 px-6 h-full flex flex-col">
        {/* User Info Section */}
        {user ? (
            <div className="pb-6 mb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
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
                    .join(', ')}
                </p>
                </div>
            </div>
            
            {/* User Actions */}
            <div className="grid grid-cols-2 gap-2">
                <button
                onClick={() => handleMobileNavigation('/dashboard')}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors font-medium"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
                </button>
                {hasRole(['customer']) && (
                <>
                    <button
                    onClick={() => handleMobileNavigation('/customer/profile')}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors font-medium"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                    </button>
                    <button
                    onClick={() => handleMobileNavigation('/customer/cart')}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg transition-colors font-medium col-span-2"
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
                onClick={() => handleMobileNavigation('/login')}
                className="block w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium text-center"
            >
                Login
            </button>
            <button
                onClick={() => handleMobileNavigation('/register')}
                className="block w-full px-4 py-3 border-2 border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-medium text-center"
            >
                Register
            </button>
            </div>
        )}

        {/* Mobile Navigation Links */}
        <nav className="space-y-1 flex-1">
            {['Home', 'Services', 'Products', 'About', 'Contact'].map((item) => (
            <button
                key={item}
                onClick={() => handleMobileNavigation(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`)}
                className="flex items-center gap-3 w-full text-left px-4 py-4 text-gray-700 hover:bg-yellow-50 rounded-lg transition-colors font-semibold text-base border-l-4 border-transparent hover:border-yellow-600 hover:text-yellow-800 group"
            >
                <div className="w-2 h-2 bg-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {item}
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

    {/* Backdrop for mobile menu */}
    {mobileMenuOpen && (
        <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
        onClick={closeMobileMenu}
        />
    )}
    </header>
);
};

export default Navbar;