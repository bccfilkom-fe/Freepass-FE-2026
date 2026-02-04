/**
 * Canteen Reviews Page
 * Display all reviews for a canteen
 */

"use client";

import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCanteen } from "@/hooks/use-canteens";
import { useCanteenReviews } from "@/hooks/use-reviews";
import { ReviewCard } from "@/components/review";

interface CanteenReviewsPageProps {
  params: Promise<{
    canteenId: string;
  }>;
}

// FIXME: this page shouldn't show navbar
export default function CanteenReviewsPage({
  params,
}: CanteenReviewsPageProps) {
  const { canteenId } = use(params);
  const {
    data: canteen,
    isLoading: isLoadingCanteen,
    error: canteenError,
  } = useCanteen(canteenId);
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useCanteenReviews(canteenId); // Fetch all reviews (no limit)

  // Loading state for canteen
  if (isLoadingCanteen) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-10 w-32 mb-6" />
        <Skeleton className="h-32 w-full mb-8" />
      </div>
    );
  }

  // Error state for canteen
  if (canteenError) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/canteens">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </Link>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load canteen</p>
          <p className="text-sm mt-1">{canteenError.message}</p>
        </Alert>
      </div>
    );
  }

  // Canteen not found
  if (!canteen) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/canteens">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </Link>
        <Alert>
          <p className="font-semibold">Canteen not found</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Back button */}
      <Link href={`/canteens/${canteenId}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {canteen.name}
        </Button>
      </Link>

      {/* Canteen Summary */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start gap-4">
            {/** biome-ignore lint/performance/noImgElement: temporary */}
            <img
              src={canteen.imageUrl}
              alt={canteen.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{canteen.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{canteen.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  {canteen.totalReviews} reviews
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Reviews</h2>

        {/* Loading state */}
        {isLoadingReviews && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                // biome-ignore lint/suspicious/noArrayIndexKey: stable index
                key={`skeleton-${index}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-8" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error state */}
        {reviewsError && (
          <Alert variant="destructive">
            <p className="font-semibold">Failed to load reviews</p>
            <p className="text-sm mt-1">{reviewsError.message}</p>
          </Alert>
        )}

        {/* Reviews grid */}
        {!isLoadingReviews &&
          !reviewsError &&
          reviews &&
          (reviews.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  className="min-w-full max-w-full"
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
