'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Search, Eye, RefreshCcw } from 'lucide-react';

interface OrderItem {
id: number;
product_name: string;
quantity: number;
price: number;
}

interface OrderInDB {
id: number;
customer_id: number;
customer_name: string;
total_amount: number;
status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
created_at: string;
order_items?: OrderItem[]; // Make optional
}

// Add safe access utility functions
const safeOrderItems = (order: OrderInDB): OrderItem[] => {
return order.order_items || [];
};

const safeCustomerName = (order: OrderInDB): string => {
return order.customer_name || `Customer #${order.customer_id}`;
};

const statusBadgeClasses = {
'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
'Shipped': 'bg-indigo-100 text-indigo-800 border-indigo-200',
'Delivered': 'bg-green-100 text-green-800 border-green-200',
'Cancelled': 'bg-red-100 text-red-800 border-red-200',
};

const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function DistributorOrderPage() {
const [orders, setOrders] = useState<OrderInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState('');
const [selectedOrder, setSelectedOrder] = useState<OrderInDB | null>(null);
const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
const [newStatus, setNewStatus] = useState<OrderInDB['status']>('Pending');

const fetchDistributorOrders = async () => {
    setLoading(true);
    setError(null);
    try {
    const response = await api.get('/orders/me');
    // Ensure each order has order_items array
    const ordersWithItems = response.data.map((order: OrderInDB) => ({
        ...order,
        order_items: order.order_items || []
    }));
    setOrders(ordersWithItems);
    } catch (err: any) {
    console.error('Failed to fetch distributor orders:', err);
    setError(err.response?.data?.detail || 'Failed to load your orders.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchDistributorOrders();
}, []);

const handleUpdateStatus = async (orderId: number, status: OrderInDB['status']) => {
    try {
    await api.put(`/admin/orders/${orderId}/status`, { status });
    alert(`Order #${orderId} status updated to "${status}"`);
    setIsStatusDialogOpen(false);
    fetchDistributorOrders();
    } catch (err: any) {
    console.error('Update status error:', err);
    alert(err.response?.data?.detail || "An error occurred while updating the status.");
    }
};

const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm) ||
    safeCustomerName(order).toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
);

const openDetailsDialog = (order: OrderInDB) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
};

const openStatusDialog = (order: OrderInDB) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsStatusDialogOpen(true);
};

if (loading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    );
}

if (error) {
    return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-4xl mx-auto mt-8">
        <div className="flex items-center">
        <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="ml-3">
            <h3 className="text-sm font-medium">Error</h3>
            <p className="text-sm mt-1">{error}</p>
        </div>
        </div>
    </div>
    );
}

return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
    <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
    </div>

    <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Orders with Your Products</h2>
        <p className="text-sm text-gray-600 mt-1">A list of all orders that contain products you distribute.</p>
        </div>
        <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-gray-400" />
            <input
            type="text"
            placeholder="Search by Order ID, customer name, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                    </td>
                </tr>
                ) : (
                filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{safeCustomerName(order)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total_amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClasses[order.status]}`}>
                        {order.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                        onClick={() => openDetailsDialog(order)}
                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-md hover:bg-indigo-50"
                        >
                        <Eye className="h-4 w-4" />
                        </button>
                        <button
                        onClick={() => openStatusDialog(order)}
                        className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-50"
                        >
                        <RefreshCcw className="h-4 w-4" />
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    </div>

    {/* Dialog for viewing order details */}
    {isDetailsDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
            <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Order Details #{selectedOrder.id}</h3>
                <button
                onClick={() => setIsDetailsDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="font-medium text-gray-700">Customer Name:</p>
                <p className="text-gray-900">{safeCustomerName(selectedOrder)}</p>
                <p className="font-medium text-gray-700">Total Amount:</p>
                <p className="text-gray-900">${selectedOrder.total_amount.toFixed(2)}</p>
                <p className="font-medium text-gray-700">Status:</p>
                <p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClasses[selectedOrder.status]}`}>
                    {selectedOrder.status}
                    </span>
                </p>
                <p className="font-medium text-gray-700">Order Date:</p>
                <p className="text-gray-900">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                </div>
                <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Items</h3>
                {safeOrderItems(selectedOrder).length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {safeOrderItems(selectedOrder).map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-sm">No order items found.</p>
                )}
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t">
                <button
                onClick={() => setIsDetailsDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                Close
                </button>
            </div>
            </div>
        </div>
        </div>
    )}

    {/* Dialog for updating order status */}
    {isStatusDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
            <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Update Status for Order #{selectedOrder.id}</h3>
                <button
                onClick={() => setIsStatusDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="space-y-4 py-4">
                <p className="text-sm text-gray-700">
                Current Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClasses[selectedOrder.status]}`}>
                    {selectedOrder.status}
                </span>
                </p>
                <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Select new status
                </label>
                <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderInDB['status'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {orderStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                onClick={() => setIsStatusDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                Cancel
                </button>
                <button
                onClick={() => handleUpdateStatus(selectedOrder.id, newStatus)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                Save Changes
                </button>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
);
}