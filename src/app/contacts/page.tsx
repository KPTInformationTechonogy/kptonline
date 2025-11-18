// app/contact/page.tsx
import { Suspense } from 'react'
import ContactContent from './ContactContent'

export const metadata = {
title: 'Contact Us',
description: 'Get in touch with our team',
}

export default function ContactPage() {
return (
    <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<ContactSkeleton />}>
        <ContactContent />
        </Suspense>
    </div>
    </div>
)
}

function ContactSkeleton() {
return (
    <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
    <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded w-1/4"></div>
    </div>
    </div>
)
}