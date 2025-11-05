'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorAlert from '@/Components/common/ErrorAlert';
import Link from 'next/link';

const REGISTRABLE_ROLES = ['customer', 'distributor', 'sales_representative'] as const;

const formSchema = z.object({
email: z.string().email({ message: 'Invalid email address.' }),
password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
full_name: z.string().optional(),
role: z.enum(REGISTRABLE_ROLES).default('customer'),
});

type RegisterFormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
const router = useRouter();
const [error, setError] = useState<string | null>(null);

const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    email: '',
    password: '',
    full_name: '',
    role: '',
    },
});

const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    try {
    await api.post('/auth/register', values);
    router.push('/login');
    } catch (err: any) {
    console.error('Registration error:', err);
    setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
};

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-2">Register</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Create your new account.</p>
        {error && <ErrorAlert message={error} className="mb-4" />}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
            type="email"
            {...form.register('email')}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="you@example.com"
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
            type="password"
            {...form.register('password')}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="********"
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Full Name (Optional)</label>
            <input
            type="text"
            {...form.register('full_name')}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="John Doe"
            />
        </div>

        <div>
            <label className="block mb-1 font-medium">Account Type</label>
            <select
            {...form.register('role')}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
            {REGISTRABLE_ROLES.map(role => (
                <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
            ))}
            </select>
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            disabled={form.formState.isSubmitting}
        >
            {form.formState.isSubmitting ? 'Registering...' : 'Register'}
        </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
            Login
        </Link>
        </p>
    </div>
    </div>
);
}
