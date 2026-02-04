/**
 * Review RPC - Transport layer for review data
 * Currently uses mock implementation
 */

import type { CreateReviewDTO } from "@/types/dto";
import { createReviewMock, getCanteenReviewsMock } from "./_mock/review.mock";
// import { createReviewReal, getCanteenReviewsReal } from "./_real/review.real";

/**
 * Get reviews for a canteen
 * @param canteenId - The canteen ID
 * @param limit - Optional limit for number of reviews
 */
export async function getCanteenReviews(canteenId: string, limit?: number) {
  return getCanteenReviewsMock(canteenId, limit);
  // return getCanteenReviewsReal(canteenId, limit); // Uncomment when backend is ready
}

/**
 * Create a review for an order
 * @param data - Review creation data
 */
export async function createReview(data: CreateReviewDTO) {
  return createReviewMock(data);
  // return createReviewReal(data); // Uncomment when backend is ready
}
