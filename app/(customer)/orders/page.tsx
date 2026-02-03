/**
 * Orders Page
 * Display list of user's orders with filtering and status tracking
 */

"use client";

import { Clock, Package, Receipt } from "lucide-react";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/use-orders";
import { cn } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/types/dto";

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

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders();

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-2">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          My Orders
        </h1>
        <Alert
          variant="destructive"
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <p className="font-semibold">Failed to load orders</p>
          <p className="text-sm mt-1">{error.message}</p>
        </Alert>
      </div>
    );
  }

  // Empty state
  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          My Orders
        </h1>
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold mb-2">No orders yet</p>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Start exploring our canteens and place your first order!
            </p>
            <Link
              href="/canteens"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Canteens
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track your orders and manage payments
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
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
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
