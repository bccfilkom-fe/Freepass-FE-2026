/**
 * UI Types - Frontend-friendly data structures
 * These types are optimized for UI consumption and may include computed fields
 */

import type {
  MenuCategory,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  UserRole,
} from "../dto";

// ==================== User ====================

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  avatarUrl: string;
  isActive: boolean;
}

// ==================== Canteen ====================

export interface Canteen {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  rating: number;
  totalReviews: number;
  isActive: boolean;
  ownerName?: string; // Computed from owner.fullName
}

export interface CanteenDetail extends Canteen {
  ownerId: string;
  owner?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

// ==================== Review ====================

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
  canteenId: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string; // Formatted date
  relativeTime: string; // e.g., "2 days ago"
}

export interface ReviewFilters {
  canteenId?: string;
  rating?: number;
  limit?: number;
}

// ==================== Menu ====================

export interface MenuItem {
  id: string;
  canteenId: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  stock: number;
  imageUrl: string;
  isAvailable: boolean;
}

// ==================== Cart ====================

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  canteenId?: string; // All items must be from the same canteen
  canteenName?: string;
}

// ==================== Order ====================

export interface OrderItem {
  id: string;
  menuItemName: string;
  quantity: number;
  priceAtOrder: number;
  subtotal: number;
  category?: MenuCategory;
}

export interface Order {
  id: string;
  canteenId: string;
  canteenName: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  hasReview: boolean;
  reviewId: string | null;
  createdAt: string; // ISO string
  updatedAt: string;
  // Computed fields
  formattedDate: string; // e.g., "Feb 3, 2026"
  formattedTime: string; // e.g., "2:30 PM"
  itemCount: number;
}

export interface OrderDetail extends Order {
  userId: string;
  customerName?: string;
  customerPhone?: string;
}

// ==================== Payment ====================

export interface PaymentInfo {
  orderId: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAt?: string;
}

// ==================== Feedback ====================

export interface Feedback {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
  formattedDate?: string;
}

// ==================== Pagination ====================

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ==================== Form Data ====================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
}

export interface ProfileUpdateFormData {
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface MenuItemFormData {
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  stock: number;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface FeedbackFormData {
  rating: number;
  comment: string;
}

export interface CreateCanteenOwnerFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  canteenName: string;
  canteenDescription: string;
  canteenLocation: string;
}

// ==================== Filters ====================

export interface CanteenFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface MenuFilters {
  category?: MenuCategory | "ALL";
  availableOnly?: boolean;
}

export interface OrderFilters {
  status?: OrderStatus | "ALL";
  paymentStatus?: PaymentStatus | "ALL";
  page?: number;
  limit?: number;
}

export interface UserFilters {
  role?: UserRole | "ALL";
  page?: number;
  limit?: number;
}
