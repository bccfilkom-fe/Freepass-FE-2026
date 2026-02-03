/**
 * Add to Cart Sheet Component
 * Bottom sheet for selecting quantity before adding to cart
 */

"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSheetStore } from "@/stores/sheet-store";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/ui";

interface AddToCartSheetContentProps {
  item: MenuItem;
  onConfirm: (item: MenuItem, quantity: number) => void;
}

export function AddToCartSheetContent({
  item,
  onConfirm,
}: AddToCartSheetContentProps) {
  const [quantity, setQuantity] = useState(1);
  const closeSheet = useSheetStore((state) => state.closeSheet);

  const handleIncrement = () => {
    if (quantity < item.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleConfirm = () => {
    onConfirm(item, quantity);
    closeSheet();
  };

  const totalPrice = item.price * quantity;

  return (
    <SheetContent side="bottom" className="h-[85vh] flex flex-col">
      <SheetHeader className="container">
        <SheetTitle>Add to Cart</SheetTitle>
        <SheetDescription>Select quantity for {item.name}</SheetDescription>
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Item Preview */}
          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-lg line-clamp-2">{item.name}</h3>
                <Badge variant="outline" className="flex-shrink-0">
                  {item.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <p className="text-lg font-bold text-primary mt-2">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Quantity</Label>
                {item.stock <= 5 && (
                  <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                    Only {item.stock} left in stock
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-full p-2 border-2">
                <Button
                  onClick={handleDecrement}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <span className="font-bold text-xl w-12 text-center">
                  {quantity}
                </span>
                <Button
                  onClick={handleIncrement}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground"
                  disabled={quantity >= item.stock}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  quantity >= item.stock ? "bg-amber-500" : "bg-primary",
                )}
                style={{ width: `${(quantity / item.stock) * 100}%` }}
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price per item</span>
              <span className="font-semibold">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-semibold">{quantity}x</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base">Subtotal</span>
              <span className="font-bold text-2xl text-primary">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t space-y-3">
          <Button
            size="lg"
            className="w-full text-base font-semibold"
            onClick={handleConfirm}
          >
            Add {quantity} {quantity === 1 ? "item" : "items"} to Cart - Rp{" "}
            {totalPrice.toLocaleString("id-ID")}
          </Button>
          <Button variant="ghost" className="w-full" onClick={closeSheet}>
            Cancel
          </Button>
        </div>
      </SheetHeader>
    </SheetContent>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}
