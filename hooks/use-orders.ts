/**
 * Order Hooks
 * TanStack Query hooks for order-related data fetching
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import * as rpc from "@/rpc/order";
import { mapOrder } from "@/types/mappers";

/**
 * Fetch all orders for current user
 */
export function useOrders() {
  return useQuery({
    queryKey: queryKeyStore.order.list(),
    queryFn: async () => {
      const dtos = await rpc.getOrders();
      return dtos.map(mapOrder);
    },
  });
}

/**
 * Fetch single order by ID
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeyStore.order.detail(id),
    queryFn: async () => {
      const dto = await rpc.getOrderById(id);
      return mapOrder(dto);
    },
    enabled: !!id,
  });
}

/**
 * Create new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      canteenId: string;
      items: Array<{ menuItemId: string; quantity: number }>;
    }) => {
      const dto = await rpc.createOrder(data);
      return mapOrder(dto);
    },
    onSuccess: () => {
      // Invalidate orders list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeyStore.order.all });
    },
  });
}

/**
 * Cancel order
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      await rpc.cancelOrder(orderId);
    },
    onSuccess: () => {
      // Invalidate orders list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeyStore.order.all });
    },
  });
}
