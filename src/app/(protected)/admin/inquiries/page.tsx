// app/admin/inquiries/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { 
Search, 
Mail, 
Phone, 
Building, 
Calendar,
Eye,
Trash2,
RefreshCw,
MessageSquare
} from 'lucide-react';
import { InquiryDetailsModal } from '@/Components/admin/InquiryDetailsModal';

interface Inquiry {
id: number;
name: string;
email: string;
phone: string;
company: string | null;
quantity: string;
message: string | null;
product_name: string;
product_price: string;
product_id: number | null;
status: 'new' | 'contacted' | 'quoted' | 'converted' | 'archived';
created_at: string;
updated_at: string | null;
}

interface InquiryStats {
total: number;
new: number;
contacted: number;
quoted: number;
converted: number;
archived: number;
}



export default function InquiriesManagementPage() {
const [inquiries, setInquiries] = useState<Inquiry[]>([]);
const [stats, setStats] = useState<InquiryStats | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Filters and search
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState<string>('all');
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const itemsPerPage = 10;

// Modal state
const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

// Fetch inquiries with useCallback to prevent infinite re-renders
const fetchInquiries = useCallback(async () => {
    try {
    setLoading(true);
    const response = await api.get('/inquiries/', {
        params: {
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchTerm || undefined,
        }
    });
    
    if (response.data.success) {
        setInquiries(response.data.data);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    }
    } catch (err: unknown) {
    setError('Failed to fetch inquiries');
    console.error('Error fetching inquiries:', err);
    } finally {
    setLoading(false);
    }
}, [currentPage, statusFilter, searchTerm, itemsPerPage]);

// Fetch stats
const fetchStats = useCallback(async () => {
    try {
    const response = await api.get('/inquiries/stats');
    if (response.data.success) {
        setStats(response.data.data);
    }
    } catch (err: unknown) {
    console.error('Error fetching stats:', err);
    }
}, []);

useEffect(() => {
    fetchInquiries();
    fetchStats();
}, [fetchInquiries, fetchStats]);

const handleStatusUpdate = async (inquiryId: number, newStatus: string) => {
    try {
    await api.put(`/inquiries/${inquiryId}`, {
        status: newStatus
    });
    
    // Refresh data
    fetchInquiries();
    fetchStats();
    
    // Update selected inquiry if modal is open
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry(prev => prev ? { 
        ...prev, 
        status: newStatus as Inquiry['status'] 
        } : null);
    }
    } catch (err: unknown) {
    console.error('Error updating inquiry status:', err);
    alert('Failed to update inquiry status');
    }
};

const handleDelete = async (inquiryId: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
    await api.delete(`/inquiries/${inquiryId}`);
    fetchInquiries();
    fetchStats();
    
    // Close modal if deleted inquiry is currently selected
    if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setIsModalOpen(false);
        setSelectedInquiry(null);
    }
    } catch (err: unknown) {
    console.error('Error deleting inquiry:', err);
    alert('Failed to delete inquiry');
    }
};

const handleViewDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
};

const getStatusColor = (status: string) => {
    const colors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-purple-100 text-purple-800',
    converted: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    });
};

if (loading && inquiries.length === 0) {
    return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    );
}

return (
    <>
    <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Inquiries Management</h1>
            <p className="text-gray-600">Manage and track customer inquiries</p>
        </div>
        <button
            onClick={() => { fetchInquiries(); fetchStats(); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            <RefreshCw className="h-4 w-4" />
            Refresh
        </button>
        </div>

        {/* Stats Cards */}
        {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-sm text-gray-600">New</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
            <div className="text-sm text-gray-600">Contacted</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.quoted}</div>
            <div className="text-sm text-gray-600">Quoted</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
            <div className="text-sm text-gray-600">Converted</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
            <div className="text-sm text-gray-600">Archived</div>
            </div>
        </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                type="text"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            </div>
            
            {/* Status Filter */}
            <div className="w-full sm:w-48">
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
            </select>
            </div>
        </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {inquiries.length === 0 ? (
            <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">No inquiries match your current filters.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                            {inquiry.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                            {inquiry.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {inquiry.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {inquiry.phone}
                            </div>
                            {inquiry.company && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {inquiry.company}
                            </div>
                            )}
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                        {inquiry.product_name}
                        </div>
                        <div className="text-sm text-gray-600">
                        {inquiry.product_price}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                        {inquiry.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(inquiry.status)} border-0 focus:ring-2 focus:ring-blue-500`}
                        >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                        </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(inquiry.created_at)}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                        <button
                            onClick={() => handleViewDetails(inquiry)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                            title="View Details"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(inquiry.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                            title="Delete Inquiry"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, inquiries.length)} of {inquiries.length} results
            </div>
            <div className="flex gap-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                Previous
            </button>
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                Next
            </button>
            </div>
        </div>
        )}

        {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
            <div className="text-red-600 text-sm">{error}</div>
            </div>
        </div>
        )}
    </div>

    {/* Inquiry Details Modal */}
    <InquiryDetailsModal
        inquiry={selectedInquiry}
        isOpen={isModalOpen}
        onClose={closeModal}
        onStatusUpdate={handleStatusUpdate}
    />
    </>
);
}