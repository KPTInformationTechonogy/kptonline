'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
const { user, logout, hasRole } = useAuth();
const router = useRouter();

const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

const handleLogout = () => {
    logout();
};

// Close dropdown when clicking outside
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
    ) {
        setDropdownOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
        Kano Process Trading Company
        </Link>
        <div className="flex items-center space-x-4">
        <Link href="/products">
            <button className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Products
            </button>
        </Link>
        {user ? (
            <>
            {hasRole(['customer']) && (
                <Link href="/customer/cart">
                <button className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Cart
                </button>
                </Link>
            )}

            {/* Profile Avatar and Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative h-9 w-9 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center"
                >
                <span className="text-white font-medium">
                    {user.email.charAt(0).toUpperCase()}
                </span>
                </button>

                {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">
                        {user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                        {user.roles
                        .map(
                            (role: string) =>
                            role.charAt(0).toUpperCase() + role.slice(1)
                        )
                        .join(', ')}
                    </p>
                    </div>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                    onClick={() => {
                        router.push('/dashboard');
                        setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    Dashboard
                    </button>
                    {hasRole(['customer']) && (
                    <button
                        onClick={() => {
                        router.push('/customer/profile');
                        setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Profile
                    </button>
                    )}
                    <button
                    onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    Log out
                    </button>
                </div>
                )}
            </div>
            </>
        ) : (
            <>
            <Link href="/login">
                <button className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors">
                Login
                </button>
            </Link>
            <Link href="/register">
                <button className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-blue-600 transition-colors">
                Register
                </button>
            </Link>
            </>
        )}
        </div>
    </div>
    </nav>
);
};

export default Navbar;
