import React from 'react';
import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import InventoryChart from '@/Components/admin/InventoryChart'; // Assuming you added this component
import FinanceChart from '@/Components/admin/FinanceChart'; 
import CountChart from '@/Components/admin/CountChart';

export default function AdminDashboardPage() {
return (
    <div className="space-y-8 p-6 bg-blue-50 overflow-scroll">
    <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>

    {/* Stats Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold text-yellow-600">$45,231.89</p>
            <p className="text-xs text-gray-500 mt-1">+20.1% from last month</p>
        </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <Package className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">2,350</p>
            <p className="text-xs text-gray-500 mt-1">+18.0% from last month</p>
        </div>
        </div>

        {/* Active Customers Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
            <Users className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">573</p>
            <p className="text-xs text-gray-500 mt-1">+5% from last month</p>
        </div>
        </div>

        {/* New Orders Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">New Orders</h3>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">124</p>
            <p className="text-xs text-gray-500 mt-1">+7.2% from last month</p>
        </div>
        </div>
    </div>

    {/* Quick Actions Section
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        Manage Users Card
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Manage Users</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">View, create, update, and delete user accounts.</p>
            <Link href="/admin/users">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Users
                </button>
            </Link>
            </div>
        </div>

        Manage Products Card
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Manage Products</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Add new products, update existing ones, manage inventory.</p>
            <Link href="/admin/products">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Products
                </button>
            </Link>
            </div>
        </div>

        Track Orders Card
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Track Orders</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Monitor order statuses, shipping details, and payment processing.</p>
            <Link href="/admin/orders">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Orders
                </button>
            </Link>
            </div>
        </div>
        </div>
    </section> */}
    <div className='w-full flex flex-col md:flex-row justify-between gap-4 mb-6'>
        <div className='w-1/3 h-[500px] bg-white rounded-md p-4'>
            <CountChart />
        </div>
        <div className="w-2/3 h-[500px] bg-white rounded-md p-4">
            <InventoryChart />
        </div>
    </div>
    <div className="w-full h-[500px] bg-white rounded-md p-4">
            <FinanceChart />
    </div>
    </div>
);
}