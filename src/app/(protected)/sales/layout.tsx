'use client';
import ProtectedRoute from '@/Components/common/ProtectedRoute';
import { Sidebar } from '@/Components/sales/Sidebar'; // Create this
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const salesNavItems = [
{ name: 'Dashboard', href: '/sales/dashboard' },
{ name: 'Assigned Customers', href: '/sales/customers' },
{ name: 'Sales Reports', href: '/sales/reports' },
{ name: 'Submit Leads/Orders', href: '/sales/leads' },
];

export default function SalesLayout({ children }: { children: React.ReactNode }) {
const { isLoading, hasRole } = useAuth();
const router = useRouter();

useEffect(() => {
    if (!isLoading && !hasRole(['sales_representative', 'admin'])) {
    router.push('/dashboard');
    }
}, [isLoading, hasRole, router]);

if (isLoading || !hasRole(['sales_representative', 'admin'])) {
    return <LoadingSpinner />;
}
return (
    <ProtectedRoute allowedRoles={['sales_representative', 'admin']}>
    <div className="flex min-h-[calc(100vh-80px)]">
        <Sidebar navItems={salesNavItems} />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
    </ProtectedRoute>
);
}