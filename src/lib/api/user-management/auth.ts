import { LoginRequest } from '@/types/requestdto/auth';
import { AuthResponse } from '@/types/responsedto/auth';
import { User } from '@/types/models/user';
import { userManagementClient } from '@/lib/api/client';

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await userManagementClient.post<AuthResponse>('/api/auth/login', data);
  return response.data;
}

export async function logout(): Promise<void> {
  try {
    await userManagementClient.post('/api/auth/logout');
  } catch (error) {
    // Even if API call fails, we'll clear client-side data
    console.warn('Logout API call failed:', error);
  }
}

export async function refreshToken(): Promise<AuthResponse> {
  const response = await userManagementClient.post<AuthResponse>('/api/auth/refresh');
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await userManagementClient.get<{ user: User }>('/api/auth/me');
  return response.data.user;
}