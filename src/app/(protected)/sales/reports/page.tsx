'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

interface SalesReportData {
totalSales: number;
numberOfOrders: number;
averageOrderValue: number;
conversionRate: number;
salesTrendData: { date: string; sales: number }[];
topProducts: { name: string; sales: number; unitsSold: number }[];
topCustomers: { name: string; totalSpend: number; ordersCount: number }[];
recentActivities: { id: string; type: string; description: string; date: string }[];
}

const fetchSalesReportMock = async (period: string): Promise<SalesReportData> => {
return new Promise((resolve) => {
    setTimeout(() => {
    const baseSales = period === 'last_7_days' ? 2500 : (period === 'this_month' ? 10000 : 30000);
    const baseOrders = period === 'last_7_days' ? 15 : (period === 'this_month' ? 60 : 180);

    resolve({
        totalSales: baseSales + Math.floor(Math.random() * 500),
        numberOfOrders: baseOrders + Math.floor(Math.random() * 5),
        averageOrderValue: (baseSales / baseOrders) || 0,
        conversionRate: parseFloat((Math.random() * (0.05 - 0.01) + 0.01).toFixed(4)),
        salesTrendData: Array.from({ length: 7 }, (_, i) => ({
        date: `Jul ${15 + i}`,
        sales: Math.floor(baseSales / 7 * (0.8 + Math.random() * 0.4)),
        })),
        topProducts: [
        { name: 'Ergonomic Office Chair', sales: 1200, unitsSold: 5 },
        { name: 'Noise-Cancelling Headphones', sales: 850, unitsSold: 10 },
        { name: '4K Ultra HD Monitor', sales: 700, unitsSold: 2 },
        ],
        topCustomers: [
        { name: 'Tech Solutions Inc.', totalSpend: 3500, ordersCount: 3 },
        { name: 'Global Innovations', totalSpend: 2800, ordersCount: 2 },
        { name: 'Jane Doe', totalSpend: 1500, ordersCount: 5 },
        ],
        recentActivities: [
        { id: 'act1', type: 'Order Placed', description: 'New order #10235 by John Doe', date: '2025-07-22' },
        { id: 'act2', type: 'Customer Call', description: 'Follow-up with Jane Smith', date: '2025-07-21' },
        { id: 'act3', type: 'Lead Conversion', description: 'Acme Corp converted to customer', date: '2025-07-20' },
        ],
    });
    }, 500);
});
};

export default function SalesReportsPage() {
const { user, isLoading: authLoading } = useAuth();
const [reportData, setReportData] = useState<SalesReportData | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [timePeriod, setTimePeriod] = useState<string>('this_month');

const fetchReports = async (period: string) => {
    if (!user?.id) {
    setLoading(false);
    setError("User information not available. Cannot fetch reports.");
    return;
    }

    setLoading(true);
    setError(null);
    try {
    // In a real application, you would make an API call here
    // const response = await api.get(`/sales/reports?period=${period}&sales_rep_id=${user.id}`);
    // setReportData(response.data);

    // Using mock data for demonstration
    const data = await fetchSalesReportMock(period);
    setReportData(data);
    } catch (err: any) {
    console.error('Failed to fetch sales reports:', err);
    setError(err.response?.data?.detail || 'Failed to load sales reports.');
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    if (!authLoading && user) {
    fetchReports(timePeriod);
    }
}, [authLoading, user, timePeriod]);

if (authLoading || loading) {
    return null;
}

if (error) {
    return null;
}

if (!reportData) {
    return null;
}

return null;
}