'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/models/user';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setAuth: (auth: { token: string; user: User }) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthState>({
  token: null,
  user: null,
  isLoading: true,
  setAuth: () => {},
  clearAuth: () => {},
});

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check both cookies and localStorage for token
    const cookieToken = getCookie('access_token');
    const localToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('auth_user');

    const finalToken = cookieToken || localToken;

    if (finalToken && storedUser) {
      try {
        setToken(finalToken);
        setUser(JSON.parse(storedUser));
        
        // If token was only in localStorage, also set it in cookie
        if (!cookieToken && localToken) {
          setCookie('access_token', localToken);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        clearAuth();
      }
    }
    setIsLoading(false);
  }, []);

  const setAuth = ({ token, user }: { token: string; user: User }) => {
    setToken(token);
    setUser(user);
    
    // Store in both localStorage and cookies
    localStorage.setItem('access_token', token);
    localStorage.setItem('auth_token', token); // Keep both for compatibility
    localStorage.setItem('auth_user', JSON.stringify(user));
    
    // Set cookie for middleware access
    setCookie('access_token', token);
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    
    // Clear from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Clear from cookies
    deleteCookie('access_token');
    deleteCookie('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};