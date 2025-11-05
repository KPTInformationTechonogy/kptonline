'use client';
import ProtectedRoute from '@/Components/common/ProtectedRoute';
import { Sidebar } from '@/Components/customer/Sidebar'; // Create this
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const customerNavItems = [
{ name: 'My Dashboard', href: '/customer/dashboard' },
{ name: 'Order History', href: '/customer/orders' },
{ name: 'My Profile', href: '/customer/profile' },
// Product Browse, cart, checkout links are likely in main Navbar or a dedicated section.
// But for a customer-specific dashboard, these are common.
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
const { isLoading, hasRole } = useAuth();
const router = useRouter();

useEffect(() => {
    if (!isLoading && !hasRole(['customer', 'seller', 'admin', 'sales_representative'])) {
    router.push('/dashboard'); // Anyone authenticated can access customer view
    }
}, [isLoading, hasRole, router]);

if (isLoading || !hasRole(['customer', 'seller', 'admin', 'sales_representative'])) {
    return <LoadingSpinner />;
}
return (
    <ProtectedRoute allowedRoles={['customer', 'seller', 'admin', 'sales_representative']}>
    <div className="flex min-h-[calc(100vh-80px)]">
        <Sidebar navItems={customerNavItems} />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
    </ProtectedRoute>
);
}