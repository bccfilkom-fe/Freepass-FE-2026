import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from './api';
import { useAuthStore } from './store';
import { useCartStore } from '@/features/cart/store';
import type { LoginCredentials } from './schema';

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const authResponse = await authApi.login(credentials);
      const users = await authApi.getUsers();
      const user = users.find((u) => u.username === credentials.username) || users[0];
      return { token: authResponse.token, user };
    },
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      toast.success('Welcome back!', {
        description: `Logged in as ${user.name.firstname}`,
      });
      router.push('/products');
    },
    onError: (error: Error) => {
      toast.error('Login failed', {
        description: error.message,
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };
};

export const useDeleteAccount = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return authApi.deleteUser(user.id);
    },
    onSuccess: () => {
      clearCart();
      logout();
      toast.success('Account deleted', {
        description: 'Your account has been successfully deleted.',
      });
      router.push('/login');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete account', {
        description: error.message,
      });
    },
  });
};

