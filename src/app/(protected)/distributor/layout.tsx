'use client';
import ProtectedRoute from '@/Components/common/ProtectedRoute';
import { SalesSidebar } from '@/Components/distributor/Sidebar'; // Create this
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const distributorNavItems = [
{ name: 'Dashboard', href: '/distributor/dashboard' },
{ name: 'My Products', href: '/distributor/products' },
{ name: 'Incoming Orders', href: '/distributor/orders' },
];

export default function DistributorLayout({ children }: { children: React.ReactNode }) {
const { isLoading, hasRole } = useAuth();
const router = useRouter();

useEffect(() => {
    if (!isLoading && !hasRole(['distributor', 'admin'])) { // Admins can also access distributor view
    router.push('/dashboard');
    }
}, [isLoading, hasRole, router]);

if (isLoading || !hasRole(['distributor', 'admin'])) {
    return <LoadingSpinner />;
}
return (
    <ProtectedRoute allowedRoles={['distributor', 'admin']}>
    <div className="flex min-h-[calc(100vh-80px)]">
        <SalesSidebar navItems={distributorNavItems} />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
    </ProtectedRoute>
);
}