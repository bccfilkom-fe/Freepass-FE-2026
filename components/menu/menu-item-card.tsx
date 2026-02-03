/**
 * MenuItemCard Component (Dumb)
 * Displays a menu item with image, name, description, price, and add to cart button
 */

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/ui";

interface MenuItemCardProps {
  item: MenuItem;
  quantity?: number;
  onAddToCart?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  className?: string;
  disabled?: boolean;
}

export function MenuItemCard({
  item,
  quantity = 0,
  onAddToCart,
  onIncrement,
  onDecrement,
  className,
  disabled = false,
}: MenuItemCardProps) {
  const isOutOfStock = !item.isAvailable || item.stock === 0;
  const rootClasses = cn(
    // interactive / motion classes only when not disabled
    !disabled
      ? "group overflow-hidden transition-all duration-300 hover:shadow-lg"
      : "overflow-hidden",
    "border-2",
    isOutOfStock && "opacity-60",
    className,
  );

  return (
    <Card className={rootClasses}>
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
              className={cn(
                "object-cover",
                // only apply zoom when not disabled
                !disabled && "transition-transform duration-300 group-hover:scale-110",
                isOutOfStock && "grayscale",
              )}
            sizes="96px"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
              <Badge variant="outline" className="flex-shrink-0">
                {item.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 mt-2">
            <div className="space-y-0.5">
              <p className="text-xl font-bold text-primary">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
              {item.stock > 0 && item.stock <= 5 && (
                // FIXME: direct use of 'absolute' color instead of using theme tokens
                <p className="text-xs text-amber-600 dark:text-amber-500 font-medium">
                  Only {item.stock} left!
                </p>
              )}
            </div>

            {/* Add to Cart / Quantity Controls */}
            {!isOutOfStock && (
              <div>
                {quantity === 0 ? (
                  <Button
                    onClick={disabled ? undefined : onAddToCart}
                    size="sm"
                    className="font-semibold"
                    disabled={disabled}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                ) : (
                  <div
                    className={cn(
                      "flex items-center gap-2 bg-primary/10 rounded-full p-1 border-2",
                      // subtle hover border only when interactive
                      !disabled && "border-primary/20",
                    )}
                  >
                    <Button
                      onClick={disabled ? undefined : onDecrement}
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-8 w-8 rounded-full",
                        !disabled && "hover:bg-primary hover:text-primary-foreground",
                      )}
                      disabled={disabled}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-sm w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      onClick={disabled ? undefined : onIncrement}
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-8 w-8 rounded-full",
                        !disabled && "hover:bg-primary hover:text-primary-foreground",
                      )}
                      disabled={disabled || quantity >= item.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
