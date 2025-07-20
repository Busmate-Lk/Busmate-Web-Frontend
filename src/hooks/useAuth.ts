import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { login, logout } from '@/lib/api/user-management/auth';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { setAuth, clearAuth, user, token, isLoading } = useContext(AuthContext);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { token, user } = await login({ email, password });
      setAuth({ token, user });
      const redirectPath = getRedirectPath(user.user_role);
      router.push(redirectPath);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const signOut = async () => {
    try {
      await logout();
      clearAuth();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      clearAuth();
      router.push('/');
    }
  };

  const getRedirectPath = (userRole: string) => {
    switch (userRole?.toLowerCase()) {
      case 'mot':
        return '/mot/dashboard';
      case 'fleetoperator':
      case 'operator':
        return '/operator/dashboard';
      case 'timekeeper':
        return '/timeKeeper/dashboard';
      case 'systemadmin':
      case 'system-admin':
        return '/admin/dashboard';
      default:
        return '/operator/dashboard';
    }
  };

  return { signIn, signOut, user, token, isLoading };
};