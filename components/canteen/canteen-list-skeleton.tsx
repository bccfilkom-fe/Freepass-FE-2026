/**
 * CanteenListSkeleton Component
 * Loading state for canteen list
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CanteenListSkeletonProps {
  count?: number;
  className?: string;
}

export function CanteenListSkeleton({
  count = 6,
  className,
}: CanteenListSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable index
        <Card key={i} className="overflow-hidden border-2">
          {/* Image skeleton */}
          <Skeleton className="aspect-[4/3] w-full rounded-none" />

          {/* Content skeleton */}
          <CardHeader className="pb-3">
            <Skeleton className="h-7 w-3/4" />
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
