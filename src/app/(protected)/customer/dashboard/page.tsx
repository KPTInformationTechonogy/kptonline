"use client";

import React from 'react';
import { ShoppingCart, CreditCard, Heart, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';

export default function CustomerDashboardPage() {
const { user, isLoading: authLoading } = useAuth();

if (authLoading) {
    return <LoadingSpinner />;
}

if (!user) {
    return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-gray-500">
        <p className="text-xl">Please log in to view your dashboard.</p>
        <Link href="/login">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Go to Login
        </button>
        </Link>
    </div>
    );
}

return (
    <div className="space-y-8 p-4 md:p-6">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Welcome, {user.full_name || user.email.split('@')[0]}!
    </h1>

    {/* Stats Cards Grid */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
        title="Total Orders" 
        value="12" 
        icon={<ShoppingCart className="h-5 w-5 text-gray-400" />}
        description="Across all time"
        />
        <StatCard 
        title="Pending Shipments" 
        value="2" 
        icon={<ClipboardList className="h-5 w-5 text-gray-400" />}
        description="View details in orders"
        />
        <StatCard 
        title="Wallet Balance" 
        value="$150.00" 
        icon={<CreditCard className="h-5 w-5 text-gray-400" />}
        description="Available credit"
        />
        <StatCard 
        title="Wishlist Items" 
        value="7" 
        icon={<Heart className="h-5 w-5 text-gray-400" />}
        description="Products saved"
        />
    </div>

    {/* Quick Actions Section */}
    <QuickActionsSection />

    <div className="border-t border-gray-200 my-6"></div>

    {/* Recent Orders Section */}
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Orders</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
            <h3 className="text-lg font-semibold">Your Latest Purchases</h3>
            <p className="text-gray-500">A summary of your most recent orders.</p>
        </div>
        <RecentOrdersList />
        </div>
    </section>

    {/* Account Information Section */}
    <AccountInfoSection user={user} />
    </div>
);
}

// Extracted Components for better organization
function StatCard({ title, value, icon, description }: {
title: string;
value: string;
icon: React.ReactNode;
description: string;
}) {
return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
    </div>
    <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-400">{description}</p>
    </div>
    </div>
);
}

function QuickActionsSection() {
return (
    <section className="space-y-4">
    <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard 
        title="View Order History" 
        description="Track all your past and current orders."
        buttonText="Go to Orders"
        href="/customer/orders"
        />
        <QuickActionCard 
        title="Manage My Profile" 
        description="Update your personal information and address book."
        buttonText="Edit Profile"
        href="/customer/profile"
        />
        <QuickActionCard 
        title="Browse Products" 
        description="Discover new products and deals."
        buttonText="Shop Now"
        href="/products"
        />
    </div>
    </section>
);
}

function QuickActionCard({ title, description, buttonText, href }: {
title: string;
description: string;
buttonText: string;
href: string;
}) {
return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div>
        <p className="text-gray-500 mb-4 text-sm">{description}</p>
        <Link href={href}>
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
            {buttonText}
        </button>
        </Link>
    </div>
    </div>
);
}

function RecentOrdersList() {
const orders = [
    { id: '1005', date: 'Jul 15, 2025', total: '$125.99', status: 'Delivered', statusColor: 'green' },
    { id: '1006', date: 'Jul 20, 2025', total: '$79.50', status: 'Shipped', statusColor: 'orange' },
    { id: '1007', date: 'Jul 22, 2025', total: '$210.00', status: 'Processing', statusColor: 'blue' },
];

return (
    <>
    <ul className="space-y-3 text-sm text-gray-500">
        {orders.map((order) => (
        <li key={order.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div>
            <strong>Order #{order.id}</strong> - Placed on {order.date} - Total: {order.total}
            </div>
            <span className={`text-${order.statusColor}-500 font-semibold`}>
            {order.status}
            </span>
        </li>
        ))}
    </ul>
    <Link href="/customer/orders">
        <button className="mt-4 text-blue-600 hover:text-blue-800 hover:underline text-sm">
        View All Orders
        </button>
    </Link>
    </>
);
}

function AccountInfoSection({ user }: { user: any }) {
return (
    <section className="space-y-4">
    <h2 className="text-2xl font-semibold text-gray-900">Account Information</h2>
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-4">
        <h3 className="text-lg font-semibold">My Details</h3>
        <p className="text-gray-500">Your registered account information.</p>
        </div>
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
            <p className="text-gray-500">Name:</p>
            <p className="font-medium">{user.full_name || 'N/A'}</p>
            </div>
            <div>
            <p className="text-gray-500">Email:</p>
            <p className="font-medium">{user.email}</p>
            </div>
            <div>
            <p className="text-gray-500">Member Since:</p>
            <p className="font-medium">July 2024</p>
            </div>
            <div>
            <p className="text-gray-500">Default Address:</p>
            <p className="font-medium">123 Main St, Anytown, CA 12345</p>
            </div>
        </div>
        <Link href="/customer/profile">
            <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Update Details
            </button>
        </Link>
        </div>
    </div>
    </section>
);
}