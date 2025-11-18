import api from "@/lib/api";

// Define proper error types
interface ApiError extends Error {
response?: {
    data?: {
    detail?: string;
    };
};
request?: unknown;
}

function isApiError(error: unknown): error is ApiError {
return error instanceof Error && typeof error === 'object' && error !== null;
}

// utils/api.ts - Add this method
export const handleApiError = (error: unknown): string => {
if (isApiError(error)) {
    if (error.response) {
    // Server responded with error status
    return error.response.data?.detail || 'An error occurred';
    } else if (error.request) {
    // Request made but no response received
    return 'Network error. Please check your connection.';
    }
}

// Something else happened or error is not an ApiError
return 'An unexpected error occurred';
};

const apiUtils = {
api,
handleApiError
};

export default apiUtils;