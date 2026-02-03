/**
 * Feedback Mock RPC
 * Mock implementations for feedback-related API calls
 */

import { delay } from '@/lib/mocks/utils';
import type { FeedbackDTO } from '@/types/dto';

/**
 * Get feedback for an order (mock)
 */
export async function getOrderFeedbackMock(orderId: string): Promise<FeedbackDTO[]> {
  await delay(700);
  
  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch feedback');
  }
  
  // Return mock feedback for this order
  const mockFeedback: FeedbackDTO[] = [
    {
      id: 'feedback-1',
      userId: 'user-1',
      orderId,
      rating: 5,
      comment: 'Great food and service!',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  
  return mockFeedback;
}

/**
 * Submit feedback (mock)
 */
export async function submitFeedbackMock(
  data: { orderId: string; rating: number; comment?: string }
): Promise<FeedbackDTO> {
  await delay(800);
  
  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error('Failed to submit feedback');
  }
  
  // Return created feedback
  const mockFeedback: FeedbackDTO = {
    id: `feedback-${Date.now()}`,
    userId: 'user-1',
    orderId: data.orderId,
    rating: data.rating,
    comment: data.comment || '',
    createdAt: new Date().toISOString(),
  };
  
  return mockFeedback;
}
