/**
 * Cart Canteen Info Component
 * Displays canteen information in the cart
 */

"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import type { Canteen } from "@/types/ui";

interface CartCanteenInfoProps {
   canteen: Canteen;
}

export function CartCanteenInfo({ canteen }: CartCanteenInfoProps) {
   return (
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
                     </div>
                  </div>
               </div>
            </CardHeader>
         </Card>
      </motion.div>
   );
}
