import axios from 'axios';
import { getAccessToken, removeAccessToken } from './auth';

// Base URL for your FastAPI backend
// Ensure this matches your backend's API prefix (e.g., /api/v1)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
baseURL: API_BASE_URL,
headers: {
    'Content-Type': 'application/json',
},
});

// Request interceptor to attach JWT token to outgoing requests
api.interceptors.request.use(
(config) => {
    const token = getAccessToken();
    if (token) {
    // Ensure the header name matches what your backend expects (e.g., 'Authorization')
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

// Response interceptor for global error handling (e.g., redirect on 401)
api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response && error.response.status === 401) {
    console.error('Unauthorized request. Clearing session and redirecting to login...');
    removeAccessToken(); // Clear any invalid/expired token
    // In a real application, you might use a more sophisticated way to redirect
    // For now, we'll let the AuthContext handle this indirectly or rely on page-level redirects.
    // If you're in a client component, you can use useRouter().push('/login');
    }
    return Promise.reject(error);
}
);

export default api;