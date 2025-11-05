import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { useAuth } from '@/context/AuthContext'

const useApi = () => {
const { user, logout } = useAuth()

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (user?.token) {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user.token}`,
    }
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
    if (error.response?.status === 401) {
        logout()
    }
    return Promise.reject(error)
    }
)

return api
}

export default useApi