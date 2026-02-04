/**
 * Order Card Component
 * Displays individual order with details and actions
 */

"use client";

import Link from "next/link";
import { Clock, MessageSquare, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/types/dto";
import type { Order } from "@/types/ui";

const statusConfig: Record<
   OrderStatus,
   {
      label: string;
      variant: "default" | "secondary" | "outline" | "destructive";
   }
> = {
   PENDING: { label: "Pending", variant: "secondary" },
   PROCESSING: { label: "Processing", variant: "default" },
   READY: { label: "Ready", variant: "default" },
   COMPLETED: { label: "Completed", variant: "outline" },
   CANCELLED: { label: "Cancelled", variant: "destructive" },
};

const paymentStatusConfig: Record<
   PaymentStatus,
   { label: string; color: string }
> = {
   UNPAID: { label: "Unpaid", color: "text-red-600" },
   PAID: { label: "Paid", color: "text-green-600" },
};

interface OrderCardProps {
   order: Order;
   onLeaveReview?: (order: Order, e: React.MouseEvent) => void;
}

export function OrderCard({ order, onLeaveReview }: OrderCardProps) {
   return (
      <Link key={order.id} href={`/orders/${order.id}`}>
         <Card
            className={cn(
               "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5",
               "border-2 hover:border-primary/20",
               "animate-in fade-in slide-in-from-bottom-4",
               "mb-4",
            )}
         >
            <CardHeader className="pb-4">
               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                     <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold line-clamp-1">
                           {order.canteenName}
                        </h3>
                        <Badge
                           variant={statusConfig[order.orderStatus].variant}
                           className="font-semibold text-xs"
                        >
                           {statusConfig[order.orderStatus].label}
                        </Badge>
                     </div>
                     <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                           <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                           <span className="whitespace-nowrap">
                              {order.formattedDate} • {order.formattedTime}
                           </span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Receipt className="w-3.5 h-3.5 flex-shrink-0" />
                           <span className="whitespace-nowrap">
                              {order.itemCount} items
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="sm:text-right flex-shrink-0">
                     <p className="text-xl sm:text-2xl font-bold text-primary">
                        Rp {order.totalAmount.toLocaleString("id-ID")}
                     </p>
                     <p
                        className={cn(
                           "text-xs sm:text-sm font-semibold",
                           paymentStatusConfig[order.paymentStatus].color,
                        )}
                     >
                        {paymentStatusConfig[order.paymentStatus].label}
                     </p>
                  </div>
               </div>
            </CardHeader>

            <CardContent className="pt-0">
               <div className="space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t overflow-x-auto pb-1">
                     {order.items.slice(0, 3).map((item) => (
                        <div
                           key={item.id}
                           className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-muted/50 text-xs sm:text-sm whitespace-nowrap"
                        >
                           <span className="font-semibold">{item.quantity}x</span>
                           <span className="line-clamp-1 max-w-[120px] sm:max-w-none overflow-ellipsis">
                              {item.menuItemName}
                           </span>
                        </div>
                     ))}
                     {order.items.length > 3 && (
                        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                           +{order.items.length - 3} more
                        </span>
                     )}
                  </div>

                  {/* Review Button - Only show for completed orders */}
                  {order.orderStatus === "COMPLETED" && (
                     <div className="pt-2">
                        {order.hasReview ? (
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MessageSquare className="h-4 w-4" />
                              <span>✓ Reviewed</span>
                           </div>
                        ) : (
                           <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={(e) => onLeaveReview?.(order, e)}
                           >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Leave a Review
                           </Button>
                        )}
                     </div>
                  )}
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
