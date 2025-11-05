import { jwtDecode } from 'jwt-decode';

// Define the structure of your decoded JWT payload
export interface DecodedToken {
sub: string; // Typically the user's email or ID
roles: string[]; // Array of roles (e.g., "admin", "seller", "customer")
exp: number; // Expiration timestamp (Unix epoch time)
iat: number; // Issued At timestamp
// Add other custom claims from your backend JWT here
user_id: number; // Assuming your backend adds user_id to the token
}

const TOKEN_KEY = 'accessToken';

// Stores the JWT in localStorage
export const setAccessToken = (token: string) => {
if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
}
};

// Retrieves the JWT from localStorage
export const getAccessToken = (): string | null => {
if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
}
return null;
};

// Removes the JWT from localStorage
export const removeAccessToken = () => {
if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
}
};

// Decodes a JWT
export const decodeToken = (token: string | null): DecodedToken | null => {
if (!token) return null;
try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
} catch (error) {
    console.error('Failed to decode token:', error);
    return null;
}
};

// Checks if a token is expired
export const isTokenExpired = (token: string | null): boolean => {
const decoded = decodeToken(token);
if (!decoded) return true; // Treat invalid/missing token as expired
const currentTime = Date.now() / 1000; // Current time in seconds
return decoded.exp < currentTime;
};

// Gets user roles from the token
export const getUserRoles = (): string[] => {
const token = getAccessToken();
if (!token || isTokenExpired(token)) {
    return [];
}
const decoded = decodeToken(token);
return decoded?.roles || [];
};

// Checks if the user is authenticated (has a valid, non-expired token)
export const isAuthenticated = (): boolean => {
const token = getAccessToken();
return token !== null && !isTokenExpired(token);
};