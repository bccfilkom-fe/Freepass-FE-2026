/**
 * Feedback Real RPC
 * Real API implementations for feedback-related calls
 */

import { API_BASE_URL } from "@/lib/constants";
import type { FeedbackDTO } from "@/types/dto";

/**
 * Get feedback for an order (real API)
 * TODO: Implement when backend is ready
 */
export async function getOrderFeedbackReal(
  orderId: string,
): Promise<FeedbackDTO[]> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/feedback`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch feedback");
  }
  return response.json();
}

/**
 * Submit feedback (real API)
 * TODO: Implement when backend is ready
 */
export async function submitFeedbackReal(data: {
  orderId: string;
  rating: number;
  comment?: string;
}): Promise<FeedbackDTO> {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
  return response.json();
}
