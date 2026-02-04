/**
 * Review Card Component
 * Displays a single review with rating, comment, and user info
 */

import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Review } from "@/types/ui";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <Card className={cn("min-w-[320px] max-w-[400px]", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {review.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-base">{review.userName}</CardTitle>
              <CardDescription className="text-xs">
                {review.relativeTime}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{review.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4">
          {review.comment}
        </p>
      </CardContent>
    </Card>
  );
}
