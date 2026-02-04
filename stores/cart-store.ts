/**
 * Cart Store
 * Zustand store for managing shopping cart with persist middleware
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '@/types/ui';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  
  // Actions
  addItem: (menuItem: MenuItem, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  incrementItem: (menuItemId: string) => void;
  decrementItem: (menuItemId: string) => void;
  clearCart: () => void;
  
  // Selectors
  getItemQuantity: (menuItemId: string) => number;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getCanteenId: () => string | null;
  canAddFromCanteen: (canteenId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem, quantity = 1) => {
        set((state) => {
          // Check if cart has items from different canteen
          const currentCanteenId = state.items[0]?.menuItem.canteenId;
          
          if (currentCanteenId && currentCanteenId !== menuItem.canteenId) {
            // Don't add if from different canteen
            return state;
          }

          // Check if item already exists
          const existingItem = state.items.find(
            (item) => item.menuItem.id === menuItem.id
          );

          if (existingItem) {
            // Update quantity
            return {
              items: state.items.map((item) =>
                item.menuItem.id === menuItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          // Add new item
          return {
            items: [...state.items, { menuItem, quantity }],
          };
        });
      },

      removeItem: (menuItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.menuItem.id !== menuItemId),
        }));
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.menuItem.id === menuItemId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      incrementItem: (menuItemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.menuItem.id === menuItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decrementItem: (menuItemId) => {
        set((state) => {
          const item = state.items.find((i) => i.menuItem.id === menuItemId);
          
          if (item && item.quantity <= 1) {
            // Remove if quantity would be 0
            return {
              items: state.items.filter((i) => i.menuItem.id !== menuItemId),
            };
          }

          return {
            items: state.items.map((i) =>
              i.menuItem.id === menuItemId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (menuItemId) => {
        const item = get().items.find((i) => i.menuItem.id === menuItemId);
        return item?.quantity ?? 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalAmount: () => {
        return get().items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        );
      },

      getCanteenId: () => {
        return get().items[0]?.menuItem.canteenId ?? null;
      },

      canAddFromCanteen: (canteenId) => {
        const currentCanteenId = get().getCanteenId();
        return !currentCanteenId || currentCanteenId === canteenId;
      },
    }),
    {
      name: 'app-cart-storage',
    }
  )
);
