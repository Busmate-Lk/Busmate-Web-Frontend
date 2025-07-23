import axios from 'axios';
import { getCookie, clearAuthCookies, setSecureAuthCookie } from '@/lib/utils/cookieUtils';

// Base client configuration
const createApiClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies for cross-origin requests
  });

  // Add JWT token to requests from cookies
  client.interceptors.request.use((config) => {
    // Get token from cookie instead of localStorage
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle token refresh on 401 responses
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Try to refresh the token
        const refreshToken = getCookie('refresh_token');
        if (refreshToken) {
          try {
            // Attempt token refresh using the same base URL
            const refreshResponse = await axios.post(
              `${baseURL}/api/auth/refresh`,
              { refresh_token: refreshToken },
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
            );

            if (refreshResponse.status === 200) {
              const { access_token, refresh_token: newRefreshToken, expires_in } = refreshResponse.data;
              
              // Update cookies with new tokens
              setSecureAuthCookie('access_token', access_token, expires_in);
              if (newRefreshToken) {
                setSecureAuthCookie('refresh_token', newRefreshToken, 30 * 24 * 60 * 60);
              }

              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              return client(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Fall through to handle as unauthorized
          }
        }

        // Refresh failed or no refresh token, clear all auth data
        clearAuthCookies(['access_token', 'refresh_token']);
        
        // Clear any remaining localStorage data for backward compatibility
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
        
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

// Create separate clients for each microservice
export const userManagementClient = createApiClient(process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_URL!);
export const routeManagementClient = createApiClient(process.env.NEXT_PUBLIC_ROUTE_MANAGEMENT_API_URL!);

// Keep the old export for backward compatibility (you can remove this later)
export const apiClient = userManagementClient;