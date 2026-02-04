/**
 * Cart Page
 * Display shopping cart and checkout
 */

"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import {
   CartHeader,
   CartCanteenInfo,
   CartItemCard,
   CartSummary,
   CartEmptyState,
} from "@/components/cart";
import { useCanteen } from "@/hooks/use-canteens";
import { useCreateOrder } from "@/hooks/use-orders";
import { useCartStore } from "@/stores/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalAmount = useCartStore((state) => state.getTotalAmount());
  const getTotalItems = useCartStore((state) => state.getTotalItems());
  const getCanteenId = useCartStore((state) => state.getCanteenId());

  // Fetch canteen details
  const { data: canteen } = useCanteen(getCanteenId || "");

  const createOrderMutation = useCreateOrder();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const orderItems = items.map((item) => ({
        menuItemId: item.menuItem.id,
        quantity: item.quantity,
      }));

      await createOrderMutation.mutateAsync({
        canteenId: items[0].menuItem.canteenId,
        items: orderItems,
      });

      // Clear cart after successful order
      clearCart();

      // Could redirect to orders page
      // router.push('/orders');
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Empty state
  if (items.length === 0) {
     return <CartEmptyState />;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl pb-32">
      {/* Header */}
        <CartHeader itemCount={getTotalItems} onClearAll={clearCart} />

      {/* Canteen Info Card */}
        {canteen && <CartCanteenInfo canteen={canteen} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
               <CartItemCard
                key={item.menuItem.id}
                  item={item}
                  index={index}
                  onIncrement={incrementItem}
                  onDecrement={decrementItem}
                  onRemove={removeItem}
               />
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
           <CartSummary
              totalItems={getTotalItems}
              totalAmount={getTotalAmount}
              isCheckingOut={isCheckingOut || createOrderMutation.isPending}
              isError={createOrderMutation.isError}
              onCheckout={handleCheckout}
           />
      </div>
    </div>
  );
}
