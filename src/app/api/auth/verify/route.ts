// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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
    const response = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    })

    if (!response.ok) {
    return NextResponse.json(
        { error: 'Token verification failed' },
        { status: response.status }
    )
    }

    const user = await response.json()
    return NextResponse.json(user)
} catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
    )
}
}