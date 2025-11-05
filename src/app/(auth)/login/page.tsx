'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
email: z.string().email({ message: 'Invalid email address.' }),
password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
const { login } = useAuth();
const router = useRouter();
const [error, setError] = useState<string | null>(null);

const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
} = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    email: '',
    password: '',
    },
});

const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
    const formData = new URLSearchParams();
    formData.append('username', values.email);
    formData.append('password', values.password);

    const response = await api.post('/auth/login', formData, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const { access_token } = response.data;
    login(access_token);
    toast.success('Login successful! Welcome back.');
    router.push('/dashboard');
    } catch (err: any) {
    console.error('Login error:', err);
    const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
    setError(errorMessage);
    toast.error(errorMessage);
    }
};

return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <p className="mt-2 text-gray-600">Enter your credentials to access your account.</p>
        </div>

        {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
        </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
            </label>
            <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="you@example.com"
            />
            {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
            </label>
            <input
            id="password"
            type="password"
            {...register('password')}
            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="********"
            />
            {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {isSubmitting ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
            </>
            ) : 'Login'}
        </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register
        </Link>
        </p>
    </div>
    </div>
);
}