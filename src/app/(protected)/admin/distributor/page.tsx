'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Pencil, Trash2, PlusCircle, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface DistributorInDB {
id: number;
name: string;
contact_person: string | null;
email: string | null;
phone_number: string | null;
created_at: string;
}

const distributorFormSchema = z.object({
name: z.string().min(1, { message: 'Distributor name is required.' }),
contact_person: z.string().optional().or(z.literal('')),
email: z.string().email({ message: 'Invalid email address.' }).optional().or(z.literal('')),
phone_number: z.string().optional().or(z.literal('')),
});

type DistributorFormValues = z.infer<typeof distributorFormSchema>;

interface DistributorFormProps {
initialData?: DistributorInDB | null;
onSubmit: (values: DistributorFormValues) => void;
onCancel: () => void;
}

const DistributorForm: React.FC<DistributorFormProps> = ({ initialData, onSubmit, onCancel }) => {
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DistributorFormValues>({
    resolver: zodResolver(distributorFormSchema),
    defaultValues: {
    name: initialData?.name || '',
    contact_person: initialData?.contact_person || '',
    email: initialData?.email || '',
    phone_number: initialData?.phone_number || '',
    },
});

const submitHandler = (values: DistributorFormValues) => {
    const payload = {
    name: values.name,
    contact_person: values.contact_person || null,
    email: values.email || null,
    phone_number: values.phone_number || null,
    };
    onSubmit(payload);
};

return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 py-4">
    <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Distributor Name <span className="text-red-500">*</span>
        </label>
        <input
        id="name"
        {...register('name')}
        placeholder="e.g., Tech Global Inc."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.name && (
        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
    </div>

    <div>
        <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-1">
        Contact Person
        </label>
        <input
        id="contact_person"
        {...register('contact_person')}
        placeholder="e.g., John Doe"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>

    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
        </label>
        <input
        type="email"
        id="email"
        {...register('email')}
        placeholder="contact@techglobal.com"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.email && (
        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
    </div>

    <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
        </label>
        <input
        type="tel"
        id="phone_number"
        {...register('phone_number')}
        placeholder="+1234567890"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>

    <div className="flex justify-end space-x-2 mt-6">
        <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
        Cancel
        </button>
        <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
        {isSubmitting ? 'Saving...' : (initialData ? 'Save Changes' : 'Add Distributor')}
        </button>
    </div>
    </form>
);
};

export default function AdminDistributorPage() {
const [distributors, setDistributors] = useState<DistributorInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [editingDistributor, setEditingDistributor] = useState<DistributorInDB | null>(null);
const [searchTerm, setSearchTerm] = useState('');

const fetchDistributors = async () => {
    setLoading(true);
    setError(null);
    try {
    const response = await api.get('/admin/distributors');
    setDistributors(response.data);
    } catch (err: any) {
    console.error('Failed to fetch distributors:', err);
    setError(err.response?.data?.detail || 'Failed to load distributors.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchDistributors();
}, []);

const handleCreateOrUpdate = async (values: DistributorFormValues) => {
    try {
    if (editingDistributor) {
        await api.put(`/admin/distributors/${editingDistributor.id}`, values);
        alert(`Distributor "${values.name}" has been updated.`);
    } else {
        await api.post('/admin/distributors', values);
        alert(`Distributor "${values.name}" has been added.`);
    }
    setIsFormOpen(false);
    setEditingDistributor(null);
    fetchDistributors();
    } catch (err: any) {
    console.error('Save distributor error:', err);
    alert(err.response?.data?.detail || 'An error occurred during save.');
    }
};

const handleDeleteDistributor = async (distributorId: number) => {
    if (!confirm('Are you sure you want to delete this distributor? This action cannot be undone.')) return;
    try {
    await api.delete(`/admin/distributors/${distributorId}`);
    alert('Distributor has been successfully deleted.');
    fetchDistributors();
    } catch (err: any) {
    console.error('Delete distributor error:', err);
    alert(err.response?.data?.detail || 'An error occurred during deletion.');
    }
};

const openCreateDialog = () => {
    setEditingDistributor(null);
    setIsFormOpen(true);
};

const openEditDialog = (distributor: DistributorInDB) => {
    setEditingDistributor(distributor);
    setIsFormOpen(true);
};

const filteredDistributors = distributors.filter(distributor =>
    distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (distributor.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()))
);

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
            <h1 className="text-3xl font-bold text-gray-900">Distributor Management</h1>
            <p className="text-gray-600 mt-1">Manage your distributor accounts</p>
        </div>
        <button
            onClick={openCreateDialog}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Distributor
        </button>
        </div>

        {isFormOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
                {editingDistributor ? 'Edit Distributor' : 'Add New Distributor'}
            </h2>
            <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            <DistributorForm
            initialData={editingDistributor}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setIsFormOpen(false)}
            />
        </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4 border-b border-gray-200">
            <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search by name or contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
            />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Person
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredDistributors.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No distributors found matching your search criteria.
                    </td>
                </tr>
                ) : (
                filteredDistributors.map((distributor) => (
                    <tr key={distributor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {distributor.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {distributor.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {distributor.contact_person || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {distributor.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {distributor.phone_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                        onClick={() => openEditDialog(distributor)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                        title="Edit"
                        >
                        <Pencil className="h-5 w-5" />
                        </button>
                        <button
                        onClick={() => handleDeleteDistributor(distributor.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                        title="Delete"
                        >
                        <Trash2 className="h-5 w-5" />
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
    </div>
);
}