/**
 * Cart Floating Action Button
 * Shows cart summary when items are in cart from current canteen
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { useCanteen } from "@/hooks/use-canteens";
import { cn } from "@/lib/utils";

interface CartFABProps {
  canteenId: string;
  className?: string;
}

export function CartFAB({ canteenId, className }: CartFABProps) {
  const getTotalItems = useCartStore((state) => state.getTotalItems());
  const getTotalAmount = useCartStore((state) => state.getTotalAmount());
  const getCanteenId = useCartStore((state) => state.getCanteenId());

  // Fetch canteen details for cart items
  const { data: cartCanteen } = useCanteen(getCanteenId || "");

  // Only show if cart has items
  const shouldShow = getTotalItems > 0;
  const isDifferentCanteen = getCanteenId !== canteenId;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            "fixed bottom-12 left-1/2 -translate-x-1/2 z-40",
            className,
          )}
        >
          <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-full",
                "bg-primary text-primary-foreground",
                "shadow-lg shadow-primary/25",
                "border-2 border-primary-foreground/10",
                "hover:shadow-xl hover:shadow-primary/30",
                "transition-shadow duration-200",
              )}
            >
              {/* Cart Icon with Badge */}
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {getTotalItems}
                </motion.div>
              </div>

              {/* Separator */}
              <div className="w-px h-6 bg-primary-foreground/20" />

              {/* Amount and Info */}
              <div className="flex flex-col gap-1 items-start">
                {/* Canteen Name - always show */}
                <span
                  className={cn(
                    "text-xs font-medium",
                    isDifferentCanteen
                      ? "text-yellow-300 opacity-100"
                      : "opacity-75",
                  )}
                >
                  {isDifferentCanteen && "⚠️ "}
                  {cartCanteen?.name || "Loading..."}
                </span>

                <span className="text-xs opacity-90 font-medium">
                  {getTotalItems} {getTotalItems === 1 ? "item" : "items"}
                </span>
                <span className="font-bold text-sm">
                  Rp {getTotalAmount.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Arrow Icon */}
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
