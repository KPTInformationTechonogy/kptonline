'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Search, Eye, RefreshCw, Truck, XCircle, CheckCircle, Clock } from 'lucide-react';

interface OrderItem {
id: number;
product_id: number;
product_name: string;
quantity: number;
price_at_purchase: number;
distributor_id: number;
}

interface OrderInDB {
id: number;
user_id: number;
user_email: string;
user_full_name?: string | null;
total_amount: number;
order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
shipping_address: string;
transaction_id?: string | null;
created_at: string;
updated_at: string;
items: OrderItem[];
}

interface ApiError {
response?: {
    data?: {
    detail?: string;
    };
};
message?: string;
}

const statusClasses = {
'pending': 'bg-yellow-100 text-yellow-800',
'processing': 'bg-blue-100 text-blue-800',
'shipped': 'bg-purple-100 text-purple-800',
'delivered': 'bg-green-100 text-green-800',
'cancelled': 'bg-red-100 text-red-800'
};

const statusIcons = {
'pending': <Clock className="h-4 w-4 mr-1" />,
'processing': <RefreshCw className="h-4 w-4 mr-1" />,
'shipped': <Truck className="h-4 w-4 mr-1" />,
'delivered': <CheckCircle className="h-4 w-4 mr-1" />,
'cancelled': <XCircle className="h-4 w-4 mr-1" />
};

const paymentStatusClasses = {
'pending': 'bg-yellow-100 text-yellow-800',
'completed': 'bg-green-100 text-green-800',
'failed': 'bg-red-100 text-red-800',
'refunded': 'bg-gray-100 text-gray-800'
};

export default function AdminOrderPage() {
const [orders, setOrders] = useState<OrderInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState('');
const [selectedOrder, setSelectedOrder] = useState<OrderInDB | null>(null);
const [isDetailsOpen, setIsDetailsOpen] = useState(false);
const [isStatusOpen, setIsStatusOpen] = useState(false);
const [newStatus, setNewStatus] = useState<OrderInDB['order_status']>('pending');

const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
    // Use the correct endpoint from your backend
    const response = await api.get('/admin/orders/');
    setOrders(response.data);
    } catch (err: unknown) {
    console.error('Failed to fetch orders:', err);
    const error = err as ApiError;
    setError(error.response?.data?.detail || error.message || 'Failed to load orders.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchOrders();
}, []);

const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    try {
    // Use the correct endpoint and data structure
    await api.put(`/admin/orders/${selectedOrder.id}`, {
        order_status: newStatus
    });
    alert(`Order #${selectedOrder.id} status updated to "${newStatus}"`);
    setIsStatusOpen(false);
    fetchOrders(); // Refresh the orders list
    } catch (err: unknown) {
    console.error('Update status error:', err);
    const error = err as ApiError;
    alert(error.response?.data?.detail || error.message || "An error occurred while updating the status.");
    }
};

const handleMarkAsPaid = async (orderId: number) => {
    try {
    await api.post(`/admin/orders/${orderId}/mark-paid`);
    alert(`Order #${orderId} marked as paid`);
    fetchOrders(); // Refresh the orders list
    } catch (err: unknown) {
    console.error('Mark as paid error:', err);
    const error = err as ApiError;
    alert(error.response?.data?.detail || error.message || "An error occurred while marking as paid.");
    }
};

const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm) ||
    (order.user_full_name && order.user_full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.order_status.toLowerCase().includes(searchTerm.toLowerCase())
);

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    });
};

const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

if (loading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
}

if (error) {
    return (
    <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
            <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
                onClick={fetchOrders}
                className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
            >
                Try Again
            </button>
            </div>
        </div>
        </div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">View and manage customer orders</p>
        </div>
        
        <div className="flex gap-2">
            <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search by Order ID, customer, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
            />
            </div>
            <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
            </button>
        </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {orders.length === 0 ? 'No orders found.' : 'No orders matching your search criteria.'}
                    </td>
                </tr>
                ) : (
                filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                        <div className="font-medium">{order.user_full_name || `Customer #${order.user_id}`}</div>
                        <div className="text-gray-500 text-xs">{order.user_email}</div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${statusClasses[order.order_status]}`}>
                        {statusIcons[order.order_status]}
                        {formatStatus(order.order_status)}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-full ${paymentStatusClasses[order.payment_status]}`}>
                        {formatStatus(order.payment_status)}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                        onClick={() => {
                            setSelectedOrder(order);
                            setIsDetailsOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                        title="View Details"
                        >
                        <Eye className="h-5 w-5" />
                        </button>
                        <button
                        onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.order_status);
                            setIsStatusOpen(true);
                        }}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-yellow-50"
                        title="Update Status"
                        >
                        <RefreshCw className="h-5 w-5" />
                        </button>
                        {order.payment_status === 'pending' && (
                        <button
                            onClick={() => handleMarkAsPaid(order.id)}
                            className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50"
                            title="Mark as Paid"
                        >
                            <CheckCircle className="h-5 w-5" />
                        </button>
                        )}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>

        {/* Order Details Modal */}
        {isDetailsOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">Order Details #{selectedOrder.id}</h2>
                <button
                onClick={() => setIsDetailsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                    <h3 className="font-medium text-gray-500 mb-2">Customer Information</h3>
                    <p className="text-gray-900"><strong>Name:</strong> {selectedOrder.user_full_name || 'N/A'}</p>
                    <p className="text-gray-900"><strong>Email:</strong> {selectedOrder.user_email}</p>
                    <p className="text-gray-900"><strong>User ID:</strong> {selectedOrder.user_id}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-500 mb-2">Order Information</h3>
                    <p className="text-gray-900"><strong>Total Amount:</strong> ${selectedOrder.total_amount.toFixed(2)}</p>
                    <p className="text-gray-900"><strong>Order Status:</strong> 
                    <span className={`ml-2 px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${statusClasses[selectedOrder.order_status]}`}>
                        {statusIcons[selectedOrder.order_status]}
                        {formatStatus(selectedOrder.order_status)}
                    </span>
                    </p>
                    <p className="text-gray-900"><strong>Payment Status:</strong> 
                    <span className={`ml-2 px-2 py-1 inline-flex text-xs font-medium rounded-full ${paymentStatusClasses[selectedOrder.payment_status]}`}>
                        {formatStatus(selectedOrder.payment_status)}
                    </span>
                    </p>
                    {selectedOrder.transaction_id && (
                    <p className="text-gray-900"><strong>Transaction ID:</strong> {selectedOrder.transaction_id}</p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-500 mb-2">Shipping Address</h3>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedOrder.shipping_address}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-500 mb-2">Dates</h3>
                    <p className="text-gray-900"><strong>Created:</strong> {formatDate(selectedOrder.created_at)}</p>
                    <p className="text-gray-900"><strong>Updated:</strong> {formatDate(selectedOrder.updated_at)}</p>
                </div>
                </div>

                <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Distributor
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.product_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                            ${item.price_at_purchase.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                            ${(item.quantity * item.price_at_purchase).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            #{item.distributor_id}
                            </td>
                        </tr>
                        ))}
                        <tr className="bg-gray-50">
                        <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                            Grand Total:
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                            ${selectedOrder.total_amount.toFixed(2)}
                        </td>
                        <td></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
                <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Close
                </button>
            </div>
            </div>
        </div>
        )}

        {/* Update Status Modal */}
        {isStatusOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">Update Order Status</h2>
                <button
                onClick={() => setIsStatusOpen(false)}
                className="text-gray-400 hover:text-gray-500"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <div>
                <p className="text-sm text-gray-500 mb-1">Order #{selectedOrder.id}</p>
                <p className="text-sm text-gray-500 mb-4">Current Status: 
                    <span className={`ml-2 px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${statusClasses[selectedOrder.order_status]}`}>
                    {statusIcons[selectedOrder.order_status]}
                    {formatStatus(selectedOrder.order_status)}
                    </span>
                </p>
                
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    New Status
                </label>
                <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderInDB['order_status'])}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-md"
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
                <button
                type="button"
                onClick={() => setIsStatusOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Cancel
                </button>
                <button
                type="button"
                onClick={handleUpdateStatus}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Update Status
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
    </div>
);
}