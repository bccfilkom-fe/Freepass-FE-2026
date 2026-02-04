/**
 * Mock Orders Data
 */

import type { OrderDTO, OrderItemDTO } from "@/types/dto";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/dto";
import { mockCanteens } from "./canteens.mock";
import { mockMenuItems } from "./menu-items.mock";
import { mockCurrentUser } from "./users.mock";
import {
  generateTimestamp,
  generateUUID,
  randomItem,
  randomNumber,
} from "./utils";

export const mockOrders: OrderDTO[] = [];

// Generate 10 sample orders for the current user
for (let i = 0; i < 10; i++) {
  const canteen = randomItem(mockCanteens);
  const canteenMenuItems = mockMenuItems.filter(
    (item) => item.canteenId === canteen.id,
  );

  // Pick 1-4 random menu items
  const numItems = randomNumber(1, 4);
  const orderItems: OrderItemDTO[] = [];
  let totalAmount = 0;

  for (let j = 0; j < numItems; j++) {
    const menuItem = randomItem(canteenMenuItems);
    const quantity = randomNumber(1, 3);
    const priceAtOrder = menuItem.price;
    const subtotal = priceAtOrder * quantity;

    totalAmount += subtotal;

    orderItems.push({
      id: generateUUID(),
      orderId: "", // Will be set below
      menuItemId: menuItem.id,
      menuItem,
      quantity,
      priceAtOrder,
      subtotal,
    });
  }

  const orderId = generateUUID();
  orderItems.forEach((item) => {
    item.orderId = orderId;
  });

  // Determine status based on recency
  const daysAgo = i * 3; // Older orders first
  let orderStatus: OrderStatus;
  let paymentStatus: PaymentStatus;
  let paymentMethod: PaymentMethod | null = null;

  if (i < 2) {
    // Recent orders - pending
    orderStatus = OrderStatus.PENDING;
    paymentStatus = PaymentStatus.UNPAID;
  } else if (i < 4) {
    // Recent paid orders - processing or ready
    orderStatus = randomItem([OrderStatus.PROCESSING, OrderStatus.READY]);
    paymentStatus = PaymentStatus.PAID;
    paymentMethod = randomItem([
      PaymentMethod.CASH,
      PaymentMethod.E_WALLET,
      PaymentMethod.QRIS,
    ]);
  } else if (i < 8) {
    // Older orders - completed
    orderStatus = OrderStatus.COMPLETED;
    paymentStatus = PaymentStatus.PAID;
    paymentMethod = randomItem([
      PaymentMethod.CASH,
      PaymentMethod.BANK_TRANSFER,
      PaymentMethod.E_WALLET,
      PaymentMethod.QRIS,
    ]);
  } else {
    // Some cancelled orders
    orderStatus = OrderStatus.CANCELLED;
    paymentStatus = randomItem([PaymentStatus.UNPAID, PaymentStatus.PAID]);
    if (paymentStatus === PaymentStatus.PAID) {
      paymentMethod = randomItem([PaymentMethod.CASH, PaymentMethod.E_WALLET]);
    }
  }

  mockOrders.push({
    id: orderId,
    userId: mockCurrentUser.id,
    user: mockCurrentUser,
    canteenId: canteen.id,
    canteen,
    items: orderItems,
    totalAmount,
    orderStatus,
    paymentStatus,
    paymentMethod,
    reviewId:
      orderStatus === OrderStatus.COMPLETED && i % 2 === 0
        ? `review-${orderId}`
        : null, // Some completed orders have reviews
    createdAt: generateTimestamp(daysAgo),
    updatedAt: generateTimestamp(Math.max(0, daysAgo - 1)),
  });
}

// Sort by created date (newest first)
mockOrders.sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);
