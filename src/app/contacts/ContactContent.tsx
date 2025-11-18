// app/contacts/ContactContent.tsx (Alternative version)
'use client'

import { useSearchParams } from 'next/navigation'
import ContactForm from './ContactForm'
import { useEffect, useState } from 'react'

export default function ContactContent() {
const searchParams = useSearchParams()
const success = searchParams.get('success')
const error = searchParams.get('error')
const [showSuccess, setShowSuccess] = useState(false)
const [showError, setShowError] = useState(false)

useEffect(() => {
    if (success) {
    setShowSuccess(true)
    const timer = setTimeout(() => setShowSuccess(false), 5000)
    return () => clearTimeout(timer)
    }
}, [success])

useEffect(() => {
    if (error) {
    setShowError(true)
    const timer = setTimeout(() => setShowError(false), 5000)
    return () => clearTimeout(timer)
    }
}, [error])

return (
    <div className="max-w-2xl mx-auto">
    <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Contact Us
        </h1>
        <p className="text-lg text-gray-600">
        {`Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.`}
        </p>
    </div>

    {/* Success Message */}
    {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
            <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
                {`Thank you for your message! We'll get back to you soon.`}
            </p>
            </div>
        </div>
        </div>
    )}

    {/* Error Message */}
    {showError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
            <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="ml-3">
            <p className="text-sm font-medium text-red-800">
                There was an error sending your message. Please try again.
            </p>
            </div>
        </div>
        </div>
    )}

    <ContactForm />
    </div>
)
}