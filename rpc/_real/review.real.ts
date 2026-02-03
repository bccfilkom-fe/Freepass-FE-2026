/**
 * Real Review RPC Implementation
 * Will be implemented when backend is ready
 */

import type { CreateReviewDTO, ReviewDTO } from "@/types/dto";

/**
 * Get reviews for a canteen (real implementation)
 * @future Replace with actual API call when backend is ready
 */
export async function getCanteenReviewsReal(
  canteenId: string,
  limit?: number,
): Promise<ReviewDTO[]> {
  const params = new URLSearchParams({
    canteenId,
    ...(limit && { limit: limit.toString() }),
  });

  const response = await fetch(`/api/reviews?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const data = await response.json();
  return data;
}

/**
 * Create a review (real implementation)
 * @future Replace with actual API call when backend is ready
 */
export async function createReviewReal(
  data: CreateReviewDTO,
): Promise<ReviewDTO> {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create review");
  }

  const review = await response.json();
  return review;
}
