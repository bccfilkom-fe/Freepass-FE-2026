/**
 * Review Preview Component
 * Shows a preview of top reviews with horizontal scrolling
 * Max 5 reviews displayed
 */

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCanteenReviews } from "@/hooks/use-reviews";
import { ReviewList } from "./review-list";
import { ReviewListSkeleton } from "./review-list-skeleton";

interface ReviewPreviewProps {
  canteenId: string;
}

export function ReviewPreview({ canteenId }: ReviewPreviewProps) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useCanteenReviews(canteenId, 5); // Limit to 5 reviews

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Link href={`/canteens/${canteenId}/reviews`}>
          <Button variant="ghost" className="gap-1">
            See More
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Loading state */}
      {isLoading && <ReviewListSkeleton count={5} />}

      {/* Error state */}
      {error && (
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load reviews</p>
          <p className="text-sm mt-1">{error.message}</p>
        </Alert>
      )}

      {/* Reviews list */}
      {!isLoading && !error && reviews && <ReviewList reviews={reviews} />}
    </div>
  );
}
