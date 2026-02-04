/**
 * CanteenList Component (Dumb)
 * Renders a grid of canteen cards
 */

import { cn } from "@/lib/utils";
import type { Canteen } from "@/types/ui";
import { CanteenCard } from "./canteen-card";

interface CanteenListProps {
  canteens: Canteen[];
  onCanteenClick?: (canteen: Canteen) => void;
  className?: string;
}

export function CanteenList({
  canteens,
  onCanteenClick,
  className,
}: CanteenListProps) {
  if (canteens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          {/* TODO: improve this icon */}
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="text-xl font-bold mb-2">No canteens found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {canteens.map((canteen) => (
        <CanteenCard
          key={canteen.id}
          canteen={canteen}
          onClick={() => onCanteenClick?.(canteen)}
          disabled={!canteen.isActive}
        />
      ))}
    </div>
  );
}
