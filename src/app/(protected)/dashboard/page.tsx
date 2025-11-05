'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/Components/common/LoadingSpinner';

export default function DashboardPage() {
const { user, isLoading, hasRole } = useAuth();
const router = useRouter();

useEffect(() => {
  if (isLoading) return;
  if (!user) {
    router.push('/login');
    return;
  }
  console.log('user:', user);
  if (hasRole(['ADMIN'])) {
    router.push('/admin/dashboard');
  } else if (hasRole(['distributor'])) {
    router.push('/distributor/dashboard');
  } else if (hasRole(['sales_representative'])) {
    router.push('/sales/dashboard');
  } else if (hasRole(['customer'])) {
    router.push('/customer/dashboard');
  } else {
    router.push('/');
  }
}, [user, isLoading, hasRole, router]);

if (isLoading) {
    return <LoadingSpinner />;
}

// Optionally, show a message while redirecting
return (
    <div className="text-center p-8">
    <h1 className="text-3xl font-bold">Redirecting to your dashboard...</h1>
    <p className="mt-4 text-lg text-muted-foreground">
        Please wait, or if you are not redirected, ensure your account has a valid role.
    </p>
    </div>
);
}