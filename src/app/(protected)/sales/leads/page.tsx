'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/api';

const leadFormSchema = z.object({
customer_name: z.string().min(1, { message: 'Customer name is required.' }),
customer_email: z.string().email({ message: 'Invalid email address.' }).optional().or(z.literal('')),
customer_phone: z.string().optional().or(z.literal('')),
product_interest: z.string().optional().or(z.literal('')),
lead_source: z.string().min(1, { message: 'Lead source is required.' }),
notes: z.string().optional().or(z.literal('')),
order_details: z.string().optional().or(z.literal('')),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export default function SalesLeadsPage() {
const [error, setError] = useState<string | null>(null);

const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    product_interest: '',
    lead_source: '',
    notes: '',
    order_details: '',
    },
});

const onSubmit = async (values: LeadFormValues) => {
    setError(null);
    try {
    await api.post('/sales/leads', values);
    form.reset();
    } catch (err: any) {
    console.error('Lead submission error:', err);
    setError(err.response?.data?.detail || 'Failed to submit lead. Please try again.');
    }
};

return null;
}