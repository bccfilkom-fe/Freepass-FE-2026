/**
 * Mock Review RPC Implementation
 * Returns mock review data for development
 */

import type { CreateReviewDTO, ReviewDTO } from "@/types/dto";

/**
 * Generate mock reviews for a canteen
 */
function generateMockReviews(canteenId: string): ReviewDTO[] {
  const mockReviews: ReviewDTO[] = [
    {
      id: "review-1",
      userId: "user-1",
      userName: "John Doe",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-1",
      rating: 5,
      comment:
        "Absolutely amazing food! The nasi goreng was delicious and the service was quick. Highly recommend this canteen!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-2",
      userId: "user-2",
      userName: "Jane Smith",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-2",
      rating: 4,
      comment:
        "Great variety of menu items. The prices are reasonable and the portions are generous. Only downside is sometimes it gets crowded during lunch hours.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-3",
      userId: "user-3",
      userName: "Ahmad Rizki",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-3",
      rating: 5,
      comment:
        "Best mie ayam in campus! The owner is very friendly and the place is always clean. Will definitely come back again.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-4",
      userId: "user-4",
      userName: "Siti Nurhaliza",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-4",
      rating: 4,
      comment:
        "Good food and affordable prices. The es teh manis is refreshing. Sometimes the wait time can be a bit long during peak hours.",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-5",
      userId: "user-5",
      userName: "Budi Santoso",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-5",
      rating: 5,
      comment:
        "Excellent canteen! Fresh ingredients, hygienic preparation, and the sambal is amazing. The staff are always polite and helpful.",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-6",
      userId: "user-6",
      userName: "Maya Putri",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-6",
      rating: 3,
      comment:
        "The food is okay, nothing special. Prices are fair for campus food. Would be nice if they had more vegetarian options.",
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 1.5 months ago
      updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "review-7",
      userId: "user-7",
      userName: "Rudi Hermawan",
      userAvatarUrl: null,
      canteenId,
      orderId: "order-7",
      rating: 5,
      comment:
        "One of my favorite places to eat on campus! The food is consistently good and the portions are satisfying. Great value for money!",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return mockReviews;
}

/**
 * Get reviews for a canteen (mock implementation)
 */
export async function getCanteenReviewsMock(
  canteenId: string,
  limit?: number,
): Promise<ReviewDTO[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allReviews = generateMockReviews(canteenId);

  // Apply limit if specified
  if (limit) {
    return allReviews.slice(0, limit);
  }

  return allReviews;
}

/**
 * Create a review (mock implementation)
 */
export async function createReviewMock(
  data: CreateReviewDTO,
): Promise<ReviewDTO> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock created review
  const review: ReviewDTO = {
    id: `review-${Date.now()}`,
    userId: "current-user-id",
    userName: "Current User",
    userAvatarUrl: null,
    canteenId: "canteen-1", // Would come from order data
    orderId: data.orderId,
    rating: data.rating,
    comment: data.comment || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return review;
}
