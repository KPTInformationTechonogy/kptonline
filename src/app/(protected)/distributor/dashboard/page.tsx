import React from 'react';
import { Package, ClipboardList, DollarSign, User } from 'lucide-react';
import Link from 'next/link';

export default function DistributorDashboardPage() {
return (
    <div className="space-y-8 p-6">
    <h1 className="text-4xl font-bold text-gray-900">Distributor Dashboard</h1>

    {/* Stats Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Products Listed */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Products Listed</h3>
            <Package className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">150</p>
            <p className="text-xs text-gray-500 mt-1">+5 new products this month</p>
        </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
            <ClipboardList className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-gray-500 mt-1">Requires your attention</p>
        </div>
        </div>

        {/* Total Sales (Month) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Sales (Month)</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">$12,450.75</p>
            <p className="text-xs text-gray-500 mt-1">+8.2% from last month</p>
        </div>
        </div>

        {/* Active Customer Inquiries */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Active Customer Inquiries</h3>
            <User className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-gray-500 mt-1">Respond soon!</p>
        </div>
        </div>
    </div>

    {/* Quick Actions */}
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Products */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Manage Products</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Add, edit, or remove your listed products and manage stock levels.</p>
            <Link href="/distributor/products">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to My Products
                </button>
            </Link>
            </div>
        </div>

        {/* View Incoming Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">View Incoming Orders</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Process new orders and update their shipping status.</p>
            <Link href="/distributor/orders">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Orders
                </button>
            </Link>
            </div>
        </div>

        {/* View Sales Reports */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">View Sales Reports</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Analyze your sales performance and revenue.</p>
            <Link href="/distributor/reports">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Reports
                </button>
            </Link>
            </div>
        </div>
        </div>
    </section>

    {/* Recent Activity */}
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders to Fulfill</h3>
            <p className="text-gray-500">Latest orders that require your attention.</p>
        </div>
        <div>
            <ul className="space-y-2 text-sm text-gray-500">
            <li>#ORD-20250722-001 - Product A (x2) - <span className="text-orange-500">Pending Shipment</span></li>
            <li>#ORD-20250721-005 - Product B (x1) - <span className="text-orange-500">Pending Shipment</span></li>
            <li>#ORD-20250720-010 - Product C (x3) - <span className="text-green-500">Shipped</span></li>
            </ul>
            <Link href="/distributor/orders">
            <button className="mt-4 text-blue-600 hover:text-blue-800 hover:underline">
                View All Orders
            </button>
            </Link>
        </div>
        </div>
    </section>
    </div>
);
}