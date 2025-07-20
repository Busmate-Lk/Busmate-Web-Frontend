import { LoginRequest } from '@/types/requestdto/auth';
import { AuthResponse } from '@/types/responsedto/auth';
import { User } from '@/types/models/user';
import { userManagementClient } from '@/lib/api/client';

// Cookie utility function
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  }
};

export async function login(data: LoginRequest): Promise<{ token: string; user: User }> {
  const response = await userManagementClient.post<AuthResponse>('/api/auth/login', data);
  
  // Store tokens in localStorage
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);
  
  // Also store in cookies for middleware access
  setCookie('access_token', response.data.access_token);
  setCookie('refresh_token', response.data.refresh_token);
  
  return {
    token: response.data.access_token,
    user: {
      id: response.data.user.id,
      email: response.data.user.email,
      user_role: response.data.user.user_metadata.user_role,
      email_verified: response.data.user.user_metadata.email_verified,
      last_sign_in_at: response.data.user.last_sign_in_at,
      created_at: response.data.user.created_at,
      updated_at: response.data.user.updated_at,
    },
  };
}

export async function logout(): Promise<void> {
  // Clear tokens from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  
  // Clear tokens from cookies
  if (typeof window !== 'undefined') {
    document.cookie = 'access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'refresh_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  }
}