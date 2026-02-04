/**
 * Feedback Hooks
 * TanStack Query hooks for feedback-related data fetching
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import * as rpc from "@/rpc/feedback";
import { mapFeedback } from "@/types/mappers";

/**
 * Fetch feedback for an order
 */
export function useOrderFeedback(orderId: string) {
  return useQuery({
    queryKey: queryKeyStore.order.feedback(orderId),
    queryFn: async () => {
      const dtos = await rpc.getOrderFeedback(orderId);
      return dtos.map(mapFeedback);
    },
    enabled: !!orderId,
  });
}

/**
 * Submit feedback
 */
export function useSubmitFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      orderId: string;
      rating: number;
      comment?: string;
    }) => {
      const dto = await rpc.submitFeedback(data);
      return mapFeedback(dto);
    },
    onSuccess: (feedback) => {
      // Invalidate feedback list for the order
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.order.feedback(feedback.orderId),
      });
      // Invalidate order details
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.order.detail(feedback.orderId),
      });
    },
  });
}
