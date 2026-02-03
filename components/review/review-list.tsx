/**
 * Review List Component
 * Displays a list of reviews with horizontal scroll
 */

import type { Review } from "@/types/ui";
import { ReviewCard } from "./review-card";
import { cn } from "@/lib/utils";

interface ReviewListProps {
  reviews: Review[];
  className?: string;
}

export function ReviewList({ reviews, className }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide",
        className,
      )}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} className="snap-start" />
      ))}
    </div>
  );
}
