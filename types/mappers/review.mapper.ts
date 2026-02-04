/**
 * Review Mapper - Transform ReviewDTO to UI Review type
 */

import type { ReviewDTO } from "../dto";
import type { Review } from "../ui";

/**
 * Format relative time from ISO string
 */
function getRelativeTime(isoString: string): string {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
  if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

/**
 * Format ISO date string to readable format
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Map ReviewDTO to Review
 */
export function mapReview(dto: ReviewDTO): Review {
  return {
    id: dto.id,
    userId: dto.userId,
    userName: dto.userName,
    userAvatarUrl: dto.userAvatarUrl || "/placeholder-avatar.png",
    canteenId: dto.canteenId,
    orderId: dto.orderId,
    rating: dto.rating,
    comment: dto.comment,
    createdAt: formatDate(dto.createdAt),
    relativeTime: getRelativeTime(dto.createdAt),
  };
}

/**
 * Map array of ReviewDTOs to Reviews
 */
export function mapReviews(dtos: ReviewDTO[]): Review[] {
  return dtos.map(mapReview);
}
