/**
 * Cart Summary Component
 * Displays order summary and checkout button
 */

"use client";

import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
   totalItems: number;
   totalAmount: number;
   isCheckingOut: boolean;
   isError: boolean;
   onCheckout: () => void;
}

export function CartSummary({
   totalItems,
   totalAmount,
   isCheckingOut,
   isError,
   onCheckout,
}: CartSummaryProps) {
   return (
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
                        Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                     </span>
                     <span className="font-semibold">
                        Rp {totalAmount.toLocaleString("id-ID")}
                     </span>
                  </div>
               </div>

               <Separator />

               <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">
                     Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
               </div>

               <Button
                  size="lg"
                  className="w-full"
                  onClick={onCheckout}
                  disabled={isCheckingOut}
               >
                  {isCheckingOut ? (
                     "Processing..."
                  ) : (
                     <>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Checkout
                     </>
                  )}
               </Button>

               {isError && (
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
   );
}
