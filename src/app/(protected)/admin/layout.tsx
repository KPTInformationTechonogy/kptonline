'use client';

import React from 'react';
import ProtectedRoute from '@/Components/common/ProtectedRoute';
import { Sidebar } from '@/Components/admin/Sidebar'; // We'll create this next
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const adminNavItems = [
{ name: 'Dashboard', href: '/admin/dashboard' },
{ name: 'User Management', href: '/admin/users' },
{ name: 'Product Management', href: '/admin/products' },
{ name: 'Order Tracking', href: '/admin/orders' },
{ name: 'Analytics', href: '/admin/analytics' },
];

export default function AdminLayout({
children,
}: {
children: React.ReactNode;
}) {
const { isLoading, hasRole } = useAuth();
const router = useRouter();

// Client-side redirection if the user is authenticated but not an admin
useEffect(() => {
    if (!isLoading && !hasRole(['admin'])) {
    // If not an admin, redirect them to the general dashboard, which will
    // then redirect them to their correct role's dashboard.
    router.push('/dashboard');
    }
}, [isLoading, hasRole, router]);

if (isLoading || !hasRole(['admin'])) {
    // Show a loading spinner while authentication state is resolving
    // or if the user is unauthorized and being redirected.
    return <LoadingSpinner />;
}

return (
    // This `ProtectedRoute` specifically checks for the 'admin' role.
    <ProtectedRoute allowedRoles={['admin']}>
    <div className="flex min-h-[calc(100vh-80px)]"> {/* Subtract navbar height */}
        <Sidebar navItems={adminNavItems} />
        <main className="flex-1 p-8 overflow-y-auto"> {/* Main content area */}
        {children}
        </main>
    </div>
    </ProtectedRoute>
);
}