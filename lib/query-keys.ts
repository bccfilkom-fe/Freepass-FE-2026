/**
 * Centralized Query Keys
 * All TanStack Query keys must be defined here to prevent typos and ensure consistency
 */

import type {
  CanteenFilters,
  MenuFilters,
  OrderFilters,
  UserFilters,
} from "@/types/ui";

export const queryKeyStore = {
  // ==================== Auth ====================
  auth: {
    user: () => ["auth", "user"] as const,
  },

  // ==================== Canteen ====================
  canteen: {
    all: ["canteen"] as const,
    lists: () => [...queryKeyStore.canteen.all, "list"] as const,
    list: (filters?: CanteenFilters) =>
      [...queryKeyStore.canteen.lists(), filters] as const,
    details: () => [...queryKeyStore.canteen.all, "detail"] as const,
    detail: (id: string) => [...queryKeyStore.canteen.details(), id] as const,
    menus: () => [...queryKeyStore.canteen.all, "menu"] as const,
    menu: (canteenId: string, filters?: MenuFilters) =>
      [...queryKeyStore.canteen.menus(), canteenId, filters] as const,
  },

  // ==================== Order ====================
  order: {
    all: ["order"] as const,
    lists: () => [...queryKeyStore.order.all, "list"] as const,
    list: (filters?: OrderFilters) =>
      [...queryKeyStore.order.lists(), filters] as const,
    details: () => [...queryKeyStore.order.all, "detail"] as const,
    detail: (id: string) => [...queryKeyStore.order.details(), id] as const,
    feedback: (orderId: string) =>
      [...queryKeyStore.order.all, "feedback", orderId] as const,
  },

  // ==================== Owner ====================
  owner: {
    menus: {
      all: ["owner", "menu"] as const,
      list: (filters?: MenuFilters) =>
        [...queryKeyStore.owner.menus.all, "list", filters] as const,
    },
    orders: {
      all: ["owner", "order"] as const,
      list: (filters?: OrderFilters) =>
        [...queryKeyStore.owner.orders.all, "list", filters] as const,
    },
  },

  // ==================== Admin ====================
  admin: {
    users: {
      all: ["admin", "user"] as const,
      list: (filters?: UserFilters) =>
        [...queryKeyStore.admin.users.all, "list", filters] as const,
    },
    owners: {
      all: ["admin", "owner"] as const,
      list: (page?: number, limit?: number) =>
        [...queryKeyStore.admin.owners.all, "list", { page, limit }] as const,
    },
  },
} as const;
