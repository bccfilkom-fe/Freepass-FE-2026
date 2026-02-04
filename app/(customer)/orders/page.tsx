/**
 * Orders Page
 * Display list of user's orders with filtering and status tracking
 */

"use client";

import { CreateReviewSheetContent } from "@/components/review";
import {
   OrderHeader,
   OrderListSkeleton,
   OrderEmptyState,
   OrderCard,
} from "@/components/order";
import { Alert } from "@/components/ui/alert";
import { useOrders } from "@/hooks/use-orders";
import { useSheetStore } from "@/stores/sheet-store";
import type { Order } from "@/types/ui";

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders();
  const openSheet = useSheetStore((state) => state.openSheet);

  const handleLeaveReview = (order: Order, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to order detail
    openSheet({
      children: <CreateReviewSheetContent order={order} />,
    });
  };

  // Loading state
  if (isLoading) {
     return <OrderListSkeleton />;
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
     return <OrderEmptyState />;
  }

  // Success state
  return (
    <div className="container mx-auto p-6 max-w-5xl">
        <OrderHeader />

      <div className="space-y-4">
           {orders.map((order) => (
              <OrderCard
                 key={order.id}
                 order={order}
                 onLeaveReview={handleLeaveReview}
              />
        ))}
      </div>
    </div>
  );
}