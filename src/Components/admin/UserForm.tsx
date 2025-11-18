import React, { useState } from 'react';
import { UserInDB, UserCreate, UserUpdate } from '@/types/user';

// All roles
const ALL_SYSTEM_ROLES = ['admin', 'distributor', 'customer', 'sales_representative'] as const;
type SystemRole = typeof ALL_SYSTEM_ROLES[number];

type UserFormValues = {
email: string;
password: string;
full_name: string;
role: SystemRole;
is_active: boolean;
};

interface UserFormProps {
initialData?: UserInDB | null;
onSubmit: (values: UserCreate | UserUpdate) => void;
onCancel: () => void;
}

export default function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
const [form, setForm] = useState<UserFormValues>({
    email: initialData?.email || '',
    password: '',
    full_name: initialData?.full_name || '',
    role: (initialData?.role as SystemRole) || 'customer',
    is_active: initialData?.is_active ?? true,
});
const [errors, setErrors] = useState<{ [key: string]: string }>({});
const [isSubmitting, setIsSubmitting] = useState(false);

const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = 'Invalid email address.';
    }
    if (!initialData && !form.password) {
    newErrors.password = 'Password is required for new users.';
    }
    if (form.password && form.password.length > 0 && form.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!ALL_SYSTEM_ROLES.includes(form.role)) {
    newErrors.role = 'Invalid user role.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
    const target = e.target as HTMLInputElement;
    setForm(prev => ({
        ...prev,
        [name]: target.checked,
    }));
    } else {
    setForm(prev => ({
        ...prev,
        [name]: value,
    }));
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Create base payload with proper typing
    const basePayload = {
    email: form.email,
    full_name: form.full_name === '' ? undefined : form.full_name, // Use undefined instead of null
    role: form.role,
    };

    let payload: UserCreate | UserUpdate;

    if (initialData) {
    // For updates
    payload = {
        ...basePayload,
        is_active: form.is_active,
    } as UserUpdate;

    if (form.password) {
        (payload as UserUpdate).password = form.password;
    }
    } else {
    // For new users
    payload = {
        ...basePayload,
        password: form.password,
    } as UserCreate;
    }

    await onSubmit(payload);
    setIsSubmitting(false);
};

return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
    <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
        placeholder="user@example.com"
        required
        />
        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
    </div>
    <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
        {initialData ? 'New Password (optional)' : 'Password'}
        </label>
        <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
        placeholder="********"
        minLength={initialData ? 0 : 6}
        />
        {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
    </div>
    <div>
        <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
        <input
        id="full_name"
        name="full_name"
        type="text"
        value={form.full_name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
        placeholder="John Doe"
        />
    </div>
    <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
        <select
        id="role"
        name="role"
        value={form.role}
        onChange={handleChange}
        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 ${errors.role ? 'border-red-500' : ''}`}
        required
        >
        <option value="">Select Role</option>
        {ALL_SYSTEM_ROLES.map(role => (
            <option key={role} value={role}>
            {role.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </option>
        ))}
        </select>
        {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
    </div>
    {initialData && (
        <div className="flex items-center">
        <input
            id="is_active"
            name="is_active"
            type="checkbox"
            checked={form.is_active}
            onChange={handleChange}
            className="mr-2"
        />
        <label htmlFor="is_active" className="text-sm font-medium">
            Active
        </label>
        </div>
    )}
    <div className="flex justify-end space-x-2 pt-2">
        <button
        type="button"
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        onClick={onCancel}
        disabled={isSubmitting}
        >
        Cancel
        </button>
        <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        disabled={isSubmitting}
        >
        {isSubmitting ? (initialData ? 'Saving...' : 'Creating...') : (initialData ? 'Save Changes' : 'Create User')}
        </button>
    </div>
    </form>
);
}