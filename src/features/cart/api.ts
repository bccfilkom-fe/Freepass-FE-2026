import api from '@/shared/lib/axios';
import type { Cart, UpdateCartData } from './schema';

export const cartApi = {
  updateCart: async (cartId: number, data: UpdateCartData): Promise<Cart> => {
    const { data: response } = await api.put<Cart>(`/carts/${cartId}`, data);
    return response;
  },
};

