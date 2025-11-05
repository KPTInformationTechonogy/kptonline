"use client";
// pages/profile.tsx
import { useAuth } from '../../context/AuthContext';
import { ProtectedRoute } from '@/Components/ProtectedRoute';

const ProfilePage = () => {
const { user } = useAuth();

return (
    <ProtectedRoute>
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
            </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                {user?.name}
                </dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                {user?.email}
                </dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                Role
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                {user?.role}
                </dd>
            </div>
            </dl>
        </div>
        </div>
    </div>
    </ProtectedRoute>
);
};

export default ProfilePage;