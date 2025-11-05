'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // We'll create this next

interface ProtectedRouteProps {
children: ReactNode;
allowedRoles?: string[]; // Optional: specify roles required to access this route
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
const { user, isLoading, hasRole } = useAuth();
const router = useRouter();

useEffect(() => {
    if (isLoading) return; // Wait for the authentication state to be loaded

    if (!user) {
    // User is not authenticated, redirect to login
    router.push('/login');
    } else if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    // User is authenticated but does not have the required role(s)
    console.warn(`User ${user.email} (roles: ${user.roles.join(', ')}) attempted to access a route restricted to roles: ${allowedRoles.join(', ')}`);
    router.push('/dashboard'); // Redirect to their default dashboard or an access-denied page
    }
}, [user, isLoading, hasRole, allowedRoles, router]);

if (isLoading || !user || (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles))) {
    // Show a loading spinner or null while checking auth status or during redirection
    return <LoadingSpinner />;
}

// If authenticated and authorized, render the children
return <>{children}</>;
};

export default ProtectedRoute;