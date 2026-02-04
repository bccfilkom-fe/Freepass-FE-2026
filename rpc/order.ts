/**
 * Order RPC
 * Public API for order-related operations
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */

import {
  cancelOrderMock,
  createOrderMock,
  getOrderByIdMock,
  getOrdersMock,
} from "./_mock/order.mock";
import {
  cancelOrderReal,
  createOrderReal,
  getOrderByIdReal,
  getOrdersReal,
} from "./_real/order.real";
import { createRpc } from "./utils";

/**
 * Get all orders for current user
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getOrders = createRpc(getOrdersMock, getOrdersReal);

/**
 * Get order by ID
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const getOrderById = createRpc(getOrderByIdMock, getOrderByIdReal);

/**
 * Create new order
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const createOrder = createRpc(createOrderMock, createOrderReal);

/**
 * Cancel order
 * Automatically switches between mock and real API based on ENABLE_MOCK
 */
export const cancelOrder = createRpc(cancelOrderMock, cancelOrderReal);
