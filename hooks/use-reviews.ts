/**
 * Review Hooks - TanStack Query hooks for review data
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import { createReview, getCanteenReviews } from "@/rpc/review";
import type { CreateReviewDTO } from "@/types/dto";
import { mapReviews } from "@/types/mappers";

/**
 * Hook to fetch reviews for a canteen
 * @param canteenId - The canteen ID
 * @param limit - Optional limit for number of reviews (default: 5 for preview)
 */
export function useCanteenReviews(canteenId: string, limit?: number) {
  return useQuery({
    queryKey: queryKeyStore.review.list(canteenId, limit),
    queryFn: async () => {
      const dtos = await getCanteenReviews(canteenId, limit);
      return mapReviews(dtos);
    },
    enabled: !!canteenId,
  });
}

/**
 * Hook to create a review
 */
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewDTO) => {
      const dto = await createReview(data);
      return dto;
    },
    onSuccess: (data) => {
      // Invalidate reviews for the canteen
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.review.lists(),
      });
      // Invalidate orders to update hasReview status
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.order.all,
      });
    },
  });
}
