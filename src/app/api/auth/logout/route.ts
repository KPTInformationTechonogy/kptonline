// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import api from '@/lib/api/auth'

export async function GET(request: Request) {
const cookieStore = cookies()
const token = cookieStore.get('auth_token')?.value

if (!token) {
    return NextResponse.json(
    { error: 'Not authenticated' },
    { status: 401 }
    )
}

try {
    const response = await api.get('/auth/me', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    })

    return NextResponse.json(response.data)
} catch (error: any) {
    console.error('Token verification error:', error)
    return NextResponse.json(
    { 
        error: error.response?.data?.detail || 
            error.response?.data?.message || 
            'Token verification failed' 
    },
    { status: error.response?.status || 500 }
    )
}
}