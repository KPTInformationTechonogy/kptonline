// Components/admin/AdminLayout.tsx
'use client';

import React from 'react';
import ProtectedRoute from '@/Components/common/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideBar from '@/Components/admin/Sidebar';

const adminNavItems = [
{ name: 'Dashboard', href: '/admin/dashboard' },
{ name: 'User Management', href: '/admin/users' },
{ name: 'Product Management', href: '/admin/products' },
{ name: 'Inquiries', href: '/admin/inquiries' },
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

useEffect(() => {
    if (!isLoading && !hasRole(['admin'])) {
    router.push('/dashboard');
    }
}, [isLoading, hasRole, router]);

if (isLoading || !hasRole(['admin'])) {
    return <LoadingSpinner />;
}

return (
    <ProtectedRoute allowedRoles={['admin']}>
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/30">
        <SideBar navItems={adminNavItems} />
        
        {/* Main content with professional spacing */}
        <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 min-h-[calc(100vh-4rem)]">
            {children}
            </div>
        </div>
        </main>
    </div>
    </ProtectedRoute>
);
}