/**
 * Order Detail Page
 * Display detailed order information with payment upload capability
 */

"use client";

import { ArrowLeft, Clock, QrCode, Receipt } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder, useCancelOrder } from "@/hooks/use-orders";
import { cn } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/types/dto";

interface OrderDetailPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

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

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = use(params);
  const { data: order, isLoading, error } = useOrder(orderId);
  const cancelMutation = useCancelOrder();

  const handleCancel = async () => {
    if (!order) return;
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await cancelMutation.mutateAsync(order.id);
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Skeleton className="h-10 w-32 mb-6" />
        <Card className="mb-6 border-2">
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Link href="/orders">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Orders
          </Button>
        </Link>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load order</p>
          <p className="text-sm mt-1">{error.message}</p>
        </Alert>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Link href="/orders">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Orders
          </Button>
        </Link>
        <Alert>
          <p className="font-semibold">Order not found</p>
        </Alert>
      </div>
    );
  }

  const canPayOrder =
    order.paymentStatus === "UNPAID" && order.orderStatus !== "CANCELLED";
  const canCancelOrder =
    order.orderStatus === "PENDING" && order.paymentStatus === "UNPAID";

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Back button */}
      <Link href="/orders">
        <Button
          variant="ghost"
          className="mb-6 group animate-in fade-in slide-in-from-left-4 duration-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Orders
        </Button>
      </Link>

      {/* Order Header */}
      <Card className="mb-6 border-2 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{order.canteenName}</CardTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {order.formattedDate} at {order.formattedTime}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Receipt className="w-4 h-4" />
                  <span>Order #{order.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={statusConfig[order.orderStatus].variant}
                className="font-semibold text-base px-4 py-1.5"
              >
                {statusConfig[order.orderStatus].label}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Order Items */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-lg mb-4">Order Items</h3>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg border-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {item.quantity}x
                  </div>
                  <div>
                    <p className="font-semibold">{item.menuItemName}</p>
                    <p className="text-sm text-muted-foreground">
                      @Rp {item.priceAtOrder.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-lg">
                  Rp {item.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                Subtotal ({order.itemCount} items)
              </span>
              <span className="font-semibold">
                Rp {order.totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-2xl text-primary">
                Rp {order.totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Status</span>
              <span
                className={cn(
                  "font-semibold",
                  paymentStatusConfig[order.paymentStatus].color,
                )}
              >
                {paymentStatusConfig[order.paymentStatus].label}
              </span>
            </div>
            {order.paymentMethod && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      {canPayOrder && (
        <Card
          className="mb-6 border-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Payment QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* MVP Notice */}
            <Alert>
              <p className="text-sm font-medium">
                <strong>MVP Implementation:</strong> This is a simplified
                payment flow for prototype purposes. In production, this would
                integrate with a real payment gateway (e.g., QRIS, GoPay,
                OVO).
              </p>
            </Alert>

            <div className="flex flex-col items-center gap-6">
              {/* QR Code Placeholder */}
              <div className="relative w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-4 border-primary/20 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-primary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-primary">
                    <p className="text-sm font-mono text-center">
                      Order #{orderId.slice(0, 8)}
                    </p>
                    <p className="text-lg font-bold text-primary text-center">
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your payment app to complete the
                  payment
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported: QRIS, GoPay, OVO, Dana, ShopeePay
                </p>
              </div>

              {/* Manual Confirmation (for testing) */}
              <div className="w-full pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center mb-3">
                  For testing purposes:
                </p>
                <Link href={`/orders/${orderId}/confirm`} className="block">
                  <Button size="lg" className="w-full">
                    Confirm Payment Manually
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancel Order */}
      {canCancelOrder && (
        <Card
          className="border-2 border-destructive/20 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: "200ms" }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold mb-1">Cancel Order</p>
                <p className="text-sm text-muted-foreground">
                  You can cancel this order since payment hasn't been made yet.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? "Cancelling..." : "Cancel Order"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
