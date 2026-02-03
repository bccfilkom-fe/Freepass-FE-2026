/**
 * Review List Skeleton Component
 * Loading state for review list
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ReviewListSkeletonProps {
  count?: number;
  className?: string;
}

export function ReviewListSkeleton({
  count = 5,
  className,
}: ReviewListSkeletonProps) {
  return (
    <div
      className={cn(
        "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: stable index
          key={`skeleton-${index}`}
          className="min-w-[320px] max-w-[400px] snap-start"
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
  );
}
