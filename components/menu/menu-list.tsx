/**
 * MenuList Component (Dumb)
 * Renders a list of menu items grouped by category
 */

import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/ui";
import { MenuItemCard } from "./menu-item-card";

interface MenuListProps {
  items: MenuItem[];
  itemQuantities?: Record<string, number>;
  onAddToCart?: (item: MenuItem) => void;
  onIncrement?: (item: MenuItem) => void;
  onDecrement?: (item: MenuItem) => void;
  className?: string;
}

export function MenuList({
  items,
  itemQuantities = {},
  onAddToCart,
  onIncrement,
  onDecrement,
  className,
}: MenuListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          {/* TODO: improve this icon */}
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="text-xl font-bold mb-2">No menu items found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  // Group items by category
  const itemsByCategory = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>,
  );

  const categories = Object.keys(itemsByCategory).sort();

  return (
    <div className={cn("space-y-8", className)}>
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold sticky top-0 bg-background py-2 z-10 border-b-2">
            {category}
          </h2>
          <div className="grid gap-4">
            {itemsByCategory[category].map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={itemQuantities[item.id] || 0}
                onAddToCart={() => onAddToCart?.(item)}
                onIncrement={() => onIncrement?.(item)}
                onDecrement={() => onDecrement?.(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
