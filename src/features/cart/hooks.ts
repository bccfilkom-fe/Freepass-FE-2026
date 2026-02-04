import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cartApi } from './api';
import { useCartStore } from './store';
import { useAuthStore } from '@/features/auth/store';
import type { Product } from '@/features/product/schema';

export const useAddToCart = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (product: Product, quantity = 1) => {
    addItem(product, quantity);
    toast.success('Added to cart', {
      description: `${product.title} x${quantity}`,
    });
  };
};

export const useRemoveFromCart = () => {
  const removeItem = useCartStore((state) => state.removeItem);

  return (productId: number, productTitle: string) => {
    removeItem(productId);
    toast.success('Removed from cart', {
      description: productTitle,
    });
  };
};

export const useSyncCart = () => {
  const { items, setLoading } = useCartStore();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const cartData = {
        userId: user.id,
        products: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };
      
      return cartApi.updateCart(1, cartData);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success('Cart synced successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to sync cart', {
        description: error.message,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

