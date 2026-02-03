/**
 * Cart Page
 * Display shopping cart and checkout
 */

"use client";

import { Minus, Plus, ShoppingBag, Trash2, X, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">My Cart</h1>
          <p className="text-muted-foreground">Your shopping cart</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-xl font-semibold mb-2">Your cart is empty</p>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Start adding items from our canteens to see them here!
              </p>
              <Link href="/canteens">
                <Button size="lg">Browse Canteens</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">My Cart</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
        <p className="text-muted-foreground">
          {getTotalItems} {getTotalItems === 1 ? "item" : "items"} in your cart
        </p>
      </motion.div>

      {/* Canteen Info Card */}
      {canteen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start gap-4">
                {/* biome-ignore lint/performance/noImgElement: temporary */}
                <img
                  src={canteen.imageUrl}
                  alt={canteen.name}
                  className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/canteens/${canteen.id}`}
                    className="group inline-block"
                  >
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {canteen.name}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {canteen.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {/* {canteen.reviewCount} reviews */}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.menuItem.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: index * 0.05,
                }}
              >
                <Card className="overflow-hidden border-2 hover:border-primary/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.menuItem.imageUrl}
                          alt={item.menuItem.name}
                          fill
                          className="object-cover"
                        />
                        {!item.menuItem.isAvailable && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary" className="text-xs">
                              Unavailable
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg line-clamp-1">
                              {item.menuItem.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.menuItem.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.menuItem.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => decrementItem(item.menuItem.id)}
                              disabled={!item.menuItem.isAvailable}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 md:w-12 text-center font-semibold">
                              {item.quantity} {/* item kind subtotal */}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => incrementItem(item.menuItem.id)}
                              disabled={
                                !item.menuItem.isAvailable ||
                                item.quantity >= item.menuItem.stock
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div>
                          <p className="mt-4 md:mt-4 text-xl font-bold text-primary">
                            Rp{" "}
                            {(
                              item.menuItem.price * item.quantity
                            ).toLocaleString("id-ID")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @Rp {item.menuItem.price.toLocaleString("id-ID")}
                          </p>
                        </div>

                        {/* Stock warning */}
                        {item.menuItem.stock < item.quantity && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-destructive mt-2"
                          >
                            Only {item.menuItem.stock} items left in stock
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-6 border-2">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({getTotalItems}{" "}
                    {getTotalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold">
                    Rp {getTotalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  Rp {getTotalAmount.toLocaleString("id-ID")}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isCheckingOut || createOrderMutation.isPending}
              >
                {isCheckingOut || createOrderMutation.isPending ? (
                  "Processing..."
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Checkout
                  </>
                )}
              </Button>

              {createOrderMutation.isError && (
                <Alert variant="destructive">
                  <p className="text-sm">
                    Failed to create order. Please try again.
                  </p>
                </Alert>
              )}

              <p className="text-xs text-muted-foreground text-center">
                You'll be able to upload payment proof after placing the order
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
