/**
 * Cart Header Component
 * Displays cart title, item count, and clear all button
 */

"use client";

import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartHeaderProps {
   itemCount: number;
   onClearAll: () => void;
}

export function CartHeader({ itemCount, onClearAll }: CartHeaderProps) {
   return (
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
               onClick={onClearAll}
               className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
               <Trash2 className="w-4 h-4 mr-2" />
               Clear All
            </Button>
         </div>
         <p className="text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
         </p>
      </motion.div>
   );
}
