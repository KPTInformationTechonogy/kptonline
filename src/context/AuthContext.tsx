'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// Assuming '@/lib/auth' exports these, including isTokenExpired
import { setAccessToken, getAccessToken, removeAccessToken, decodeToken, isTokenExpired } from '@/lib/auth';

// Define the type for the user object stored in context
interface AuthUser {
  id: number; // Assuming user_id from token
  email: string;
  roles: string[];
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  login: (accessToken: string) => void;
  logout: () => void;
  isLoading: boolean;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Function to parse the token and set user state
  const parseAndSetUser = useCallback((accessToken: string | null) => {
    if (accessToken) {
      const decoded = decodeToken(accessToken);
      // CORRECTED LOGIC: Check if token is decoded AND not expired
      if (decoded && !isTokenExpired(accessToken)) {
        setUser({
          id: decoded.user_id, // Assuming user_id is in token
          email: decoded.sub,
          roles: decoded.roles
        });
        setToken(accessToken);
      } else {
        // Token is invalid or expired
        removeAccessToken();
        setToken(null);
        setUser(null);
      }
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);

  // On mount, check for existing token in localStorage
  useEffect(() => {
    const storedToken = getAccessToken();
    parseAndSetUser(storedToken);
    setIsLoading(false); // Auth state is now loaded
  }, [parseAndSetUser]);

  // Handle successful login
  const login = useCallback((accessToken: string) => {
    setAccessToken(accessToken);
    parseAndSetUser(accessToken);
    // Redirection after login should typically happen in the component that calls login
    // e.g., router.push('/dashboard');
  }, [parseAndSetUser]);

  // Handle logout
  const logout = useCallback(() => {
    removeAccessToken();
    setToken(null);
    setUser(null);
    router.push('/login'); // Redirect to login page on logout
  }, [router]);

  // Helper to check if the current user has any of the required roles
  const hasRole = useCallback((requiredRoles: string[]): boolean => {
    if (!user) return false;
    return user.roles.some(userRole =>
      requiredRoles.some(required =>
        userRole.trim().toLowerCase() === required.trim().toLowerCase()
      )
    );
  }, [user]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};