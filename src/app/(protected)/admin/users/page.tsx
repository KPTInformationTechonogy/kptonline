'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { UserInDB, UserCreate, UserUpdate } from '@/types/user';

const initialFormState = {
email: '',
full_name: '',
role: '',
is_active: true,
password: '',
};

const ROLE_OPTIONS = [
{ value: 'admin', label: 'Admin' },
{ value: 'distributor', label: 'Distributor' },
{ value: 'sales_representative', label: 'Sales Representative' },
{ value: 'customer', label: 'Customer' },
];

export default function UserManagementPage() {
const [users, setUsers] = useState<UserInDB[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [showForm, setShowForm] = useState(false);
const [formState, setFormState] = useState(initialFormState);
const [editingId, setEditingId] = useState<number | null>(null);
const [formLoading, setFormLoading] = useState(false);
const [formError, setFormError] = useState<string | null>(null);
const [successMsg, setSuccessMsg] = useState<string | null>(null);

const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
    const response = await api.get('/admin/users');
    setUsers(response.data);
    } catch (err: any) {
    setError(err?.response?.data?.detail || 'Failed to load users.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchUsers();
}, []);

const openCreateForm = () => {
    setEditingId(null);
    setFormState(initialFormState);
    setFormError(null);
    setShowForm(true);
};

const openEditForm = (user: UserInDB) => {
    setEditingId(user.id);
    setFormState({
    email: user.email,
    full_name: user.full_name || '',
    role: user.role,
    is_active: user.is_active,
    password: '',
    });
    setFormError(null);
    setShowForm(true);
};

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
    }));
};

const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setSuccessMsg(null);

    const payload: UserCreate | UserUpdate = {
    email: formState.email.trim(),
    full_name: formState.full_name.trim(),
    role: formState.role,
    is_active: formState.is_active,
    };

    if (!editingId && formState.password) {
    (payload as UserCreate).password = formState.password;
    }

    try {
    if (editingId) {
        await api.put(`/admin/users/${editingId}`, payload);
        setSuccessMsg('User updated successfully');
    } else {
        await api.post('/admin/users/', payload);
        setSuccessMsg('User created successfully');
    }
    setShowForm(false);
    setEditingId(null);
    setFormState(initialFormState);
    fetchUsers();
    } catch (err: any) {
    setFormError(err?.response?.data?.detail || 'An error occurred while saving. Please try again.');
    } finally {
    setFormLoading(false);
    }
};

const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setLoading(true);
    setError(null);
    try {
    await api.delete(`/admin/users/${userId}`);
    setSuccessMsg('User deleted successfully');
    fetchUsers();
    } catch (err: any) {
    setError(err?.response?.data?.detail || 'An error occurred while deleting. Please try again.');
    setLoading(false);
    }
};

const formatRoleName = (role: string) => {
    return role
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

if (loading) {
    return (
    <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600" />
    </div>
    );
}

if (error) {
    return (
    <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg my-8 text-center">
        <p className="font-medium">{error}</p>
        <button 
        onClick={fetchUsers}
        className="mt-2 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded transition"
        >
        Retry
        </button>
    </div>
    );
}

return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <button
            onClick={openCreateForm}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
        </button>
        </div>

        {/* Status Messages */}
        {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMsg}</span>
            </div>
        </div>
        )}

        {/* Users Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No users found
                    </td>
                </tr>
                ) : (
                users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.full_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {formatRoleName(user.role)}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                        >
                        {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                        onClick={() => openEditForm(user)}
                        className="text-blue-600 hover:text-blue-900"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        >
                        Delete
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

    {/* User Form Modal */}
    {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingId ? 'Edit User' : 'Create User'}
                </h3>
                <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setShowForm(false)}
                >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
                <div className="mt-4">
                {formError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md">
                    {formError}
                    </div>
                )}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formState.email}
                        onChange={handleFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    </div>
                    <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        autoComplete="name"
                        value={formState.full_name}
                        onChange={handleFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    </div>
                    <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        required
                        value={formState.role}
                        onChange={handleFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Select a role</option>
                        {ROLE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div className="flex items-center">
                    <input
                        id="is_active"
                        name="is_active"
                        type="checkbox"
                        checked={formState.is_active}
                        onChange={handleFormChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                        Active User
                    </label>
                    </div>
                    {!editingId && (
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formState.password}
                        onChange={handleFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    )}
                    <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        disabled={formLoading}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={formLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {formLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {editingId ? 'Updating...' : 'Creating...'}
                        </>
                        ) : editingId ? 'Update User' : 'Create User'}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
);
}