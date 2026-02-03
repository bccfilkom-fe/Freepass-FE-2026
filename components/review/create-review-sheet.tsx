/**
 * Create Review Sheet Component
 * Bottom sheet for creating reviews on mobile
 */

"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/hooks/use-reviews";
import { useSheetStore } from "@/stores/sheet-store";
import type { Order } from "@/types/ui";
import { cn } from "@/lib/utils";

interface CreateReviewSheetContentProps {
  order: Order;
}

// TODO: abstract to custom RHF form
// TODO: add 'has unsaved changes' confirmation modal
export function CreateReviewSheetContent({
  order,
}: CreateReviewSheetContentProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const changedRef = useRef(false);
  const closeSheet = useSheetStore((state) => state.closeSheet);

  useEffect(() => {
    if (rating !== 0) changedRef.current = true;
    if (comment !== "") changedRef.current = true;
  }, [rating, comment]);

  const createReviewMutation = useCreateReview();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        orderId: order.id,
        rating,
        comment: comment.trim() || undefined,
      });

      toast.success("Review submitted successfully!");
      closeSheet();

      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const handleClose = () => {
    if (!createReviewMutation.isPending) {
      setRating(0);
      setComment("");
      closeSheet();
    }
  };

  return (
    <SheetContent side="bottom" className="h-[90vh] flex flex-col">
      <SheetHeader className={"container"}>
        <SheetTitle>Leave a Review</SheetTitle>
        <SheetDescription>
          Share your experience with {order.canteenName}
        </SheetDescription>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Order Details</p>
            <p className="font-semibold">{order.canteenName}</p>
            <p className="text-sm text-muted-foreground">
              {order.formattedDate} • ${order.totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              How was your experience?
            </Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 active:scale-95"
                  disabled={createReviewMutation.isPending}
                >
                  <Star
                    className={cn(
                      "h-10 w-10 transition-colors",
                      hoverRating >= star || rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-3">
            <Label htmlFor="comment" className="text-base font-semibold">
              Your Review{" "}
              <span className="text-muted-foreground font-normal">
                (Optional)
              </span>
            </Label>
            <Textarea
              id="comment"
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={6}
              disabled={createReviewMutation.isPending}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500 characters
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClose}
            disabled={createReviewMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={createReviewMutation.isPending || rating === 0}
          >
            {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </SheetHeader>
    </SheetContent>
  );
}
