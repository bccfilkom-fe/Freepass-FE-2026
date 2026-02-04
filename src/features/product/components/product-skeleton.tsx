'use client';

import { Skeleton } from '@/shared/components/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="relative h-87.5 w-87.5 rounded-2xl bg-card border shadow-md overflow-hidden">
      <div className="absolute inset-0 bg-muted/30">
        <div className="relative z-10 flex h-full flex-col justify-between p-6">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">

      <Skeleton className="aspect-square max-w-lg" />


      <div className="space-y-6 md:col-span-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
        </div>

        <Skeleton className="h-6 w-20" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

