/**
 * Feedback Mappers
 * Transform feedback DTOs from backend to UI-friendly types
 */

import type { FeedbackDTO } from "../dto";
import type { Feedback } from "../ui";

/**
 * Map FeedbackDTO to Feedback UI type
 */
export function mapFeedback(dto: FeedbackDTO): Feedback {
  return {
    id: dto.id,
    orderId: dto.orderId,
    rating: dto.rating,
    comment: dto.comment,
    createdAt: dto.createdAt,
  };
}
