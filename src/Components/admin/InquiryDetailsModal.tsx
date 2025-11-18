// Components/admin/InquiryDetailsModal.tsx
'use client';

import { X, Mail, Phone, Building, Calendar, Package, DollarSign, MessageSquare } from 'lucide-react';

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

interface InquiryDetailsModalProps {
inquiry: Inquiry | null;
isOpen: boolean;
onClose: () => void;
onStatusUpdate: (inquiryId: number, newStatus: string) => void;
}

export function InquiryDetailsModal({ inquiry, isOpen, onClose, onStatusUpdate }: InquiryDetailsModalProps) {
if (!isOpen || !inquiry) return null;

const getStatusColor = (status: string) => {
    const colors = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    quoted: 'bg-purple-100 text-purple-800 border-purple-200',
    converted: 'bg-green-100 text-green-800 border-green-200',
    archived: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    });
};

const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
    onClose();
    }
};

return (
    <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={handleBackgroundClick}
    >
    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
            <h2 className="text-xl font-bold text-gray-900">Inquiry Details</h2>
            <p className="text-gray-600 text-sm">ID: #{inquiry.id}</p>
        </div>
        <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
            <X className="h-5 w-5" />
        </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inquiry.status)}`}>
                {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
            </span>
            <select
                value={inquiry.status}
                onChange={(e) => onStatusUpdate(inquiry.id, e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
            </select>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Submitted: {formatDate(inquiry.created_at)}
            </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
            
            <div className="space-y-3">
                <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900 font-medium mt-1">{inquiry.name}</p>
                </div>

                <div className="flex items-center gap-3">
                <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a 
                        href={`mailto:${inquiry.email}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {inquiry.email}
                    </a>
                    </div>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a 
                        href={`tel:${inquiry.phone}`}
                        className="text-gray-900 font-medium"
                    >
                        {inquiry.phone}
                    </a>
                    </div>
                </div>
                </div>

                {inquiry.company && (
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">Company</label>
                    <div className="flex items-center gap-2 mt-1">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{inquiry.company}</span>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Information</h3>
            
            <div className="space-y-3">
                <div>
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <div className="flex items-center gap-2 mt-1">
                    <Package className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900 font-medium">{inquiry.product_name}</p>
                </div>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">Price</label>
                <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900 font-medium">{inquiry.product_price}</p>
                </div>
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">Requested Quantity</label>
                <p className="text-gray-900 font-medium mt-1">{inquiry.quantity}</p>
                </div>

                {inquiry.product_id && (
                <div>
                    <label className="text-sm font-medium text-gray-700">Product ID</label>
                    <p className="text-gray-900 font-mono text-sm mt-1">#{inquiry.product_id}</p>
                </div>
                )}
            </div>
            </div>
        </div>

        {/* Message */}
        {inquiry.message && (
            <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Message</h3>
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{inquiry.message}</p>
                </div>
            </div>
            </div>
        )}

        {/* Timeline */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Timeline</h3>
            <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Inquiry Submitted</span>
                <span className="text-sm text-gray-500">{formatDate(inquiry.created_at)}</span>
            </div>
            {inquiry.updated_at && inquiry.updated_at !== inquiry.created_at && (
                <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Updated</span>
                <span className="text-sm text-gray-500">{formatDate(inquiry.updated_at)}</span>
                </div>
            )}
            </div>
        </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
            Close
        </button>
        <a
            href={`mailto:${inquiry.email}?subject=Regarding your inquiry about ${inquiry.product_name}&body=Dear ${inquiry.name},%0D%0A%0D%0AThank you for your inquiry about ${inquiry.product_name}.`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            Reply via Email
        </a>
        </div>
    </div>
    </div>
);
}