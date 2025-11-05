// components/ProtectedRoute.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path as necessary

interface ProtectedRouteProps {
children: React.ReactNode;
adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
const { user, isAdmin, isLoading } = useAuth();
const router = useRouter();

useEffect(() => {
    if (!isLoading) {
    if (!user) {
        router.push('/login');
    } else if (adminOnly && !isAdmin) {
        router.push('/');
    }
    }
}, [user, isLoading, isAdmin, router, adminOnly]);

if (isLoading || !user || (adminOnly && !isAdmin)) {
    return <div>Loading...</div>;
}

return <>{children}</>;
};