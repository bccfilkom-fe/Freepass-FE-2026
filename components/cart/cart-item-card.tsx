/**
 * Cart Item Card Component
 * Displays individual cart item with quantity controls
 */

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CartItem } from "@/stores/cart-store";

interface CartItemCardProps {
   item: CartItem;
   index: number;
   onIncrement: (menuItemId: string) => void;
   onDecrement: (menuItemId: string) => void;
   onRemove: (menuItemId: string) => void;
}

export function CartItemCard({
   item,
   index,
   onIncrement,
   onDecrement,
   onRemove,
}: CartItemCardProps) {
   return (
      <motion.div
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
                           onClick={() => onRemove(item.menuItem.id)}
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
                              onClick={() => onDecrement(item.menuItem.id)}
                              disabled={!item.menuItem.isAvailable}
                           >
                              <Minus className="w-3 h-3" />
                           </Button>
                           <span className="w-6 md:w-12 text-center font-semibold">
                              {item.quantity}
                           </span>
                           <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onIncrement(item.menuItem.id)}
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
                           {(item.menuItem.price * item.quantity).toLocaleString(
                              "id-ID"
                           )}
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
   );
}
