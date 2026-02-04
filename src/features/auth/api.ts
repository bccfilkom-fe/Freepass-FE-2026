import api from '@/shared/lib/axios';
import type { AuthResponse, LoginCredentials, User } from './schema';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  getUsers: async (): Promise<User[]> => {
    const { data } = await api.get('/users');
    return data;
  },

  deleteUser: async (id: number): Promise<User> => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },
};

