// app/contacts/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactForm() {
const router = useRouter()
const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
})
const [isLoading, setIsLoading] = useState(false)

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
    ...prev,
    [name]: value
    }))
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
    // Simulate API call - replace with your actual API endpoint
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    if (response.ok) {
        // Redirect with success parameter
        router.push('/contacts?success=true')
        // Reset form
        setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
        })
    } else {
        router.push('/contacts?error=true')
    }
    } catch {
    // Remove the unused 'error' parameter to fix the ESLint error
    router.push('/contacts?error=true')
    } finally {
    setIsLoading(false)
    }
}

return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name *
        </label>
        <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your full name"
        />
        </div>

        <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
        </label>
        <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
        />
        </div>
    </div>

    <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
        Subject *
        </label>
        <input
        type="text"
        id="subject"
        name="subject"
        required
        value={formData.subject}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="What is this regarding?"
        />
    </div>

    <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Message *
        </label>
        <textarea
        id="message"
        name="message"
        required
        rows={6}
        value={formData.message}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Tell us how we can help you..."
        />
    </div>

    <div>
        <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        {isLoading ? (
            <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
            </div>
        ) : (
            'Send Message'
        )}
        </button>
    </div>
    </form>
)
}