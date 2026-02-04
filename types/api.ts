/**
 * API-related types and constants
 */

// ==================== Query Parameters ====================

export interface GetCanteensParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetMenuParams {
  category?: string;
  available?: boolean;
}

export interface GetOrdersParams {
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
}

export interface GetUsersParams {
  role?: string;
  page?: number;
  limit?: number;
}

// ==================== API Constants ====================

export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_PAGE = 1;

export const API_ENDPOINTS = {
  // Auth
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh",

  // User
  ME: "/users/me",
  UPDATE_PROFILE: "/users/me",

  // Canteen
  CANTEENS: "/canteens",
  CANTEEN_DETAIL: (id: string) => `/canteens/${id}`,
  CANTEEN_MENU: (id: string) => `/canteens/${id}/menus`,

  // Order
  ORDERS: "/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  CREATE_ORDER: "/orders",

  // Payment
  MAKE_PAYMENT: (orderId: string) => `/orders/${orderId}/payment`,

  // Feedback
  SUBMIT_FEEDBACK: (orderId: string) => `/orders/${orderId}/feedback`,
  GET_FEEDBACK: (orderId: string) => `/orders/${orderId}/feedback`,

  // Owner - Menu
  OWNER_MENUS: "/owner/menus",
  OWNER_MENU_DETAIL: (id: string) => `/owner/menus/${id}`,

  // Owner - Orders
  OWNER_ORDERS: "/owner/orders",
  OWNER_ORDER_STATUS: (id: string) => `/owner/orders/${id}/status`,
  OWNER_FEEDBACK: (id: string) => `/owner/feedback/${id}`,

  // Admin
  ADMIN_OWNERS: "/admin/canteen-owners",
  ADMIN_OWNER_DETAIL: (id: string) => `/admin/canteen-owners/${id}`,
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
} as const;

// ==================== HTTP Methods ====================

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// ==================== Request Config ====================

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  requiresAuth?: boolean;
}
