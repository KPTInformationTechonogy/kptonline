'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export interface AssignedCustomer {
id: number;
email: string;
full_name?: string | null;
phone_number?: string | null;
last_interaction?: string | null;
address?: string | null;
}

export default function SalesAssignedCustomersPage() {
const { user, isLoading: authLoading } = useAuth();
const [customers, setCustomers] = useState<AssignedCustomer[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState('');

const fetchAssignedCustomers = async () => {
    if (!user?.id) {
    setLoading(false);
    setError("User information not available. Cannot fetch assigned customers.");
    return;
    }

    setLoading(true);
    setError(null);
    try {
    const response = await api.get(`/sales/customers`);
    setCustomers(response.data);
    } catch (err: any) {
    console.error('Failed to fetch assigned customers:', err);
    setError(err.response?.data?.detail || 'Failed to load assigned customers.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    if (!authLoading && user) {
    fetchAssignedCustomers();
    }
}, [authLoading, user]);

const filteredCustomers = customers.filter(customer =>
    (customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()))
);

const handleContactCustomer = (type: 'email' | 'phone', value?: string | null) => {
    if (!value) {
    return;
    }

    if (type === 'email') {
    window.open(`mailto:${value}`, '_blank');
    } else {
    window.open(`tel:${value}`, '_self');
    }
};

if (authLoading || loading) {
    return null;
}

if (error) {
    return null;
}

return null;
}