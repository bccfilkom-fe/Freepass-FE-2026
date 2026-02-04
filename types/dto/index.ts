/**
 * Data Transfer Objects (DTOs) - Backend API Contracts
 * Generated from OpenAPI specification (openapi.yaml)
 * These types represent the exact structure returned by the backend API
 */

// ==================== Enums ====================

export enum UserRole {
  USER = "USER",
  CANTEEN_OWNER = "CANTEEN_OWNER",
  ADMIN = "ADMIN",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  READY = "READY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
}

export enum PaymentMethod {
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
  E_WALLET = "E_WALLET",
  QRIS = "QRIS",
}

export enum MenuCategory {
  FOOD = "FOOD",
  BEVERAGE = "BEVERAGE",
}

// ==================== Review ====================

/**
 * Review entity from backend
 */
export interface ReviewDTO {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string | null;
  canteenId: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create review payload
 */
export interface CreateReviewDTO {
  orderId: string;
  rating: number;
  comment?: string;
}

// ==================== User & Auth ====================

/**
 * User entity from backend
 */
export interface UserDTO {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication response
 */
export interface AuthResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}

/**
 * Token refresh response
 */
export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}

/**
 * Registration request payload
 */
export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

/**
 * Login request payload
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * Update user profile payload
 */
export interface UpdateUserDTO {
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

// ==================== Canteen ====================

/**
 * Canteen entity from backend
 */
export interface CanteenDTO {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string | null;
  ownerId: string;
  owner?: UserDTO;
  isActive: boolean;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Paginated canteens response
 */
export interface PaginatedCanteensDTO {
  data: CanteenDTO[];
  pagination: PaginationDTO;
}

// ==================== Menu ====================

/**
 * Menu item entity from backend
 */
export interface MenuItemDTO {
  id: string;
  canteenId: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  stock: number;
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create menu item payload (owner)
 */
export interface CreateMenuItemDTO {
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  stock: number;
  imageUrl?: string;
}

/**
 * Update menu item payload (owner)
 */
export interface UpdateMenuItemDTO {
  name?: string;
  description?: string;
  category?: MenuCategory;
  price?: number;
  stock?: number;
  imageUrl?: string;
  isAvailable?: boolean;
}

// ==================== Order ====================

/**
 * Order item within an order
 */
export interface OrderItemDTO {
  id: string;
  orderId: string;
  menuItemId: string;
  menuItem?: MenuItemDTO;
  quantity: number;
  priceAtOrder: number;
  subtotal: number;
}

/**
 * Order entity from backend
 */
export interface OrderDTO {
  id: string;
  userId: string;
  user?: UserDTO;
  canteenId: string;
  canteen?: CanteenDTO;
  items: OrderItemDTO[];
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  reviewId: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create order payload
 */
export interface CreateOrderDTO {
  canteenId: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
}

/**
 * Paginated orders response
 */
export interface PaginatedOrdersDTO {
  data: OrderDTO[];
  pagination: PaginationDTO;
}

/**
 * Update order status payload (owner)
 */
export interface UpdateOrderStatusDTO {
  status: OrderStatus;
}

// ==================== Payment ====================

/**
 * Make payment payload
 */
export interface MakePaymentDTO {
  paymentMethod: PaymentMethod;
}

/**
 * Payment response
 */
export interface PaymentResponseDTO {
  orderId: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAt: string;
}

// ==================== Feedback ====================

/**
 * Feedback entity from backend
 */
export interface FeedbackDTO {
  id: string;
  orderId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

/**
 * Submit feedback payload
 */
export interface SubmitFeedbackDTO {
  rating: number;
  comment: string;
}

/**
 * Feedback response
 */
export interface FeedbackResponseDTO {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ==================== Admin ====================

/**
 * Create canteen owner payload (admin)
 */
export interface CreateCanteenOwnerDTO {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  canteenName: string;
  canteenDescription: string;
  canteenLocation: string;
}

/**
 * Update canteen owner payload (admin)
 */
export interface UpdateCanteenOwnerDTO {
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  isActive?: boolean;
}

/**
 * Paginated users response
 */
export interface PaginatedUsersDTO {
  data: UserDTO[];
  pagination: PaginationDTO;
}

// ==================== Pagination ====================

/**
 * Pagination metadata
 */
export interface PaginationDTO {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

// ==================== API Response ====================

/**
 * Standard API error response
 */
export interface APIErrorDTO {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Generic API response wrapper
 */
export interface APIResponseDTO<T> {
  data: T;
  message?: string;
}
