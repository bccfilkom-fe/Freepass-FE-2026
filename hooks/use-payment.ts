/**
 * Payment Hooks
 * TanStack Query hooks for payment-related data fetching
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import * as rpc from "@/rpc/payment";
import { mapOrder, mapPaymentInfo } from "@/types/mappers";

/**
 * Fetch payment info by order ID
 */
export function usePaymentByOrderId(orderId: string) {
  return useQuery({
    queryKey: queryKeyStore.order.detail(orderId),
    queryFn: async () => {
      const dto = await rpc.getPaymentByOrderId(orderId);
      return mapPaymentInfo(dto);
    },
    enabled: !!orderId,
  });
}

/**
 * Upload payment proof
 */
export function useUploadPaymentProof() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, file }: { orderId: string; file: File }) => {
      const dto = await rpc.uploadPaymentProof(orderId, file);
      return mapOrder(dto);
    },
    onSuccess: (order) => {
      // Invalidate order query to refetch
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.order.detail(order.id),
      });
      // Also invalidate orders list
      queryClient.invalidateQueries({ queryKey: queryKeyStore.order.all });
    },
  });
}
