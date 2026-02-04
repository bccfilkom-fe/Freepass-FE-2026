/**
 * Canteen Hooks
 * TanStack Query hooks for canteen-related data fetching
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import * as rpc from "@/rpc/canteen";
import { mapCanteen, mapMenuItem } from "@/types/mappers";

/**
 * Fetch all canteens
 */
export function useCanteens() {
  return useQuery({
    queryKey: queryKeyStore.canteen.list(),
    queryFn: async () => {
      const dtos = await rpc.getCanteens();
      return dtos.map(mapCanteen);
    },
  });
}

/**
 * Fetch single canteen by ID
 */
export function useCanteen(id: string) {
  return useQuery({
    queryKey: queryKeyStore.canteen.detail(id),
    queryFn: async () => {
      const dto = await rpc.getCanteenById(id);
      return mapCanteen(dto);
    },
    enabled: !!id,
  });
}

/**
 * Fetch menu items for a canteen
 */
export function useCanteenMenu(canteenId: string) {
  return useQuery({
    queryKey: queryKeyStore.canteen.menu(canteenId),
    queryFn: async () => {
      const dtos = await rpc.getCanteenMenu(canteenId);
      return dtos.map(mapMenuItem);
    },
    enabled: !!canteenId,
  });
}
