// components/ProtectedRoute.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
children: React.ReactNode;
adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
const { user, hasRole, isLoading } = useAuth();
const router = useRouter();

// Check if user is admin using hasRole
const isAdmin = hasRole(['admin']);

useEffect(() => {
    if (!isLoading) {
    if (!user) {
        router.push('/login');
    } else if (adminOnly && !isAdmin) {
        router.push('/');
    }
    }
}, [user, isLoading, isAdmin, router, adminOnly]);

if (isLoading) {
    return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    );
}

if (!user || (adminOnly && !isAdmin)) {
    return (
    <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
    </div>
    );
}

return <>{children}</>;
};