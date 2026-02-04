/**
 * Application Constants
 */

// ==================== API Configuration ====================

// TODO: move to dediacted env.ts file
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";
export const ENABLE_MOCK =
  process.env.NEXT_PUBLIC_ENABLE_MOCK === "true" || true;

// ==================== Pagination ====================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

// ==================== App Configuration ====================

export const APP = {
  NAME: "Canteeneo",
  DESCRIPTION: "Digital platform for campus canteen operations",
  VERSION: "1.0.0",
} as const;

// ==================== Routes ====================

export const ROUTES = {
  HOME: "/",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Customer
  CANTEENS: "/canteens",
  CANTEEN_DETAIL: (id: string) => `/canteens/${id}`,
  CART: "/cart",
  ORDERS: "/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  PROFILE: "/profile",

  // Owner
  OWNER_DASHBOARD: "/owner/dashboard",
  OWNER_MENU: "/owner/menu",
  OWNER_ORDERS: "/owner/orders",

  // Admin
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_OWNERS: "/admin/owners",
} as const;

// ==================== Local Storage Keys ====================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  CART: "cart",
  USER: "user",
} as const;

// ==================== Mock Delays ====================

export const MOCK_DELAYS = {
  MIN: 500,
  MAX: 1000,
  AVERAGE: 750,
} as const;

// ==================== Order Status Labels ====================

export const ORDER_STATUS_LABELS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  READY: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const;

// ==================== Payment Status Labels ====================

export const PAYMENT_STATUS_LABELS = {
  UNPAID: "Unpaid",
  PAID: "Paid",
} as const;

// ==================== Payment Method Labels ====================

export const PAYMENT_METHOD_LABELS = {
  CASH: "Cash",
  BANK_TRANSFER: "Bank Transfer",
  E_WALLET: "E-Wallet",
  QRIS: "QRIS",
} as const;

// ==================== Menu Category Labels ====================

export const MENU_CATEGORY_LABELS = {
  FOOD: "Food",
  BEVERAGE: "Beverage",
} as const;

// ==================== Validation ====================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_PATTERN: /^(\+62|62|0)[0-9]{9,12}$/,
  EMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  RATING_MIN: 1,
  RATING_MAX: 5,
  QUANTITY_MIN: 1,
  QUANTITY_MAX: 99,
  PRICE_MIN: 0,
  STOCK_MIN: 0,
} as const;

// ==================== File Upload ====================

export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
} as const;
