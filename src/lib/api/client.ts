import axios from 'axios';

// Base client configuration
const createApiClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add JWT token to requests
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle token refresh on 401 responses
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Clear invalid tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        
        // Clear invalid tokens from cookies
        if (typeof window !== 'undefined') {
          document.cookie = 'access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
          document.cookie = 'refresh_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
        }
        
        // Redirect to login
        window.location.href = '/';
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