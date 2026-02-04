/**
 * Cart Empty State Component
 * Displays message when cart is empty
 */

"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CartEmptyState() {
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
