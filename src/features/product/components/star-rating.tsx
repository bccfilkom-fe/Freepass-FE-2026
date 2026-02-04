'use client';

import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  count,
  showCount = true,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < Math.round(rating)
                ? 'fill-chart-3 text-chart-3'
                : 'text-muted-foreground'
            )}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground">
          {rating} ({count} reviews)
        </span>
      )}
    </div>
  );
}
