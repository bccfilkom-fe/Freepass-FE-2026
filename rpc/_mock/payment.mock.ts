/**
 * Payment Mock RPC
 * Mock implementations for payment-related API calls
 */

import { delay } from "@/lib/mocks/utils";
import type { OrderDTO } from "@/types/dto";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/dto";

/**
 * Get payment info by order ID (mock)
 */
export async function getPaymentByOrderIdMock(
  orderId: string,
): Promise<OrderDTO> {
  await delay(600);

  // Return mock order with payment info
  const mockOrder: OrderDTO = {
    id: orderId,
    userId: "user-1",
    canteenId: "canteen-1",
    orderStatus: OrderStatus.READY,
    paymentStatus: PaymentStatus.UNPAID,
    paymentMethod: PaymentMethod.QRIS,
    totalAmount: 50000,
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return mockOrder;
}

/**
 * Upload payment proof (mock)
 */
export async function uploadPaymentProofMock(
  orderId: string,
  _file: File,
): Promise<OrderDTO> {
  await delay(1500);

  // Simulate occasional errors (10% failure rate)
  if (Math.random() < 0.1) {
    throw new Error("Failed to upload payment proof");
  }

  // Return updated order with payment confirmed
  const mockOrder: OrderDTO = {
    id: orderId,
    userId: "user-1",
    canteenId: "canteen-1",
    orderStatus: OrderStatus.READY,
    paymentStatus: PaymentStatus.PAID,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    totalAmount: 50000,
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return mockOrder;
}
