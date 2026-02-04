/**
 * MenuListSkeleton Component
 * Loading state for menu list
 */

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MenuListSkeletonProps {
  count?: number;
  className?: string;
}

export function MenuListSkeleton({
  count = 6,
  className,
}: MenuListSkeletonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Category header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <Card
              // biome-ignore lint/suspicious/noArrayIndexKey: stable index
              key={`skeleton-menu-${i}`}
              className="overflow-hidden border-2"
            >
              <div className="flex gap-4 p-4">
                {/* Image skeleton */}
                <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />

                {/* Content skeleton */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-2">
                    <Skeleton className="h-7 w-24" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
