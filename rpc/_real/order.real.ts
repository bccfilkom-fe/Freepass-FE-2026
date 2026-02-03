/**
 * Order Real RPC
 * Real API implementations for order-related calls
 */

import { API_BASE_URL } from "@/lib/constants";
import type { OrderDTO } from "@/types/dto";

/**
 * Get all orders for current user (real API)
 * TODO: Implement when backend is ready
 */
export async function getOrdersReal(): Promise<OrderDTO[]> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}

/**
 * Get order by ID (real API)
 * TODO: Implement when backend is ready
 */
export async function getOrderByIdReal(id: string): Promise<OrderDTO> {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  return response.json();
}

/**
 * Create new order (real API)
 * TODO: Implement when backend is ready
 */
export async function createOrderReal(data: {
  canteenId: string;
  items: Array<{ menuItemId: string; quantity: number }>;
}): Promise<OrderDTO> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create order");
  }
  return response.json();
}

/**
 * Cancel order (real API)
 * TODO: Implement when backend is ready
 */
export async function cancelOrderReal(orderId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to cancel order");
  }
}
