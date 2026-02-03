/**
 * Order Mock RPC
 * Mock implementations for order-related API calls
 */

import { mockOrders } from "@/lib/mocks/orders.mock";
import { delay } from "@/lib/mocks/utils";
import type { OrderDTO } from "@/types/dto";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/dto";

/**
 * Get all orders for current user (mock)
 */
export async function getOrdersMock(): Promise<OrderDTO[]> {
  await delay(900);

  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch orders");
  }

  return mockOrders;
}

/**
 * Get order by ID (mock)
 */
export async function getOrderByIdMock(id: string): Promise<OrderDTO> {
  await delay(600);

  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

/**
 * Create new order (mock)
 */
export async function createOrderMock(data: {
  canteenId: string;
  items: Array<{ menuItemId: string; quantity: number }>;
}): Promise<OrderDTO> {
  await delay(1000);

  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error("Failed to create order");
  }

  // Return a mock order (in real implementation, backend would create it)
  const mockOrder: OrderDTO = {
    id: `order-${Date.now()}`,
    userId: "user-1",
    canteenId: data.canteenId,
    orderStatus: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.UNPAID,
    paymentMethod: PaymentMethod.CASH,
    totalAmount: 50000, // Mock amount
    items: data.items.map((item, index) => ({
      id: `item-${index}`,
      orderId: `order-${Date.now()}`,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      priceAtOrder: 25000,
      subtotal: 25000 * item.quantity,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return mockOrder;
}

/**
 * Cancel order (mock)
 */
export async function cancelOrderMock(orderId: string): Promise<void> {
  await delay(800);

  const order = mockOrders.find((o) => o.id === orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.orderStatus !== "PENDING") {
    throw new Error("Only pending orders can be cancelled");
  }

  // In real implementation, backend would update status
}
