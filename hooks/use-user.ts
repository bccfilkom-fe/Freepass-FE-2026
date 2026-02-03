/**
 * User Hooks
 * TanStack Query hooks for user-related data fetching
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import * as rpc from "@/rpc/user";
import { mapUser } from "@/types/mappers";

/**
 * Fetch current authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeyStore.auth.user(),
    queryFn: async () => {
      const dto = await rpc.getCurrentUser();
      return mapUser(dto);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - user data doesn't change often
  });
}

/**
 * Update user profile
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName?: string;
      phoneNumber?: string;
      avatarUrl?: string;
    }) => {
      const dto = await rpc.updateUserProfile(data);
      return mapUser(dto);
    },
    onSuccess: () => {
      // Invalidate user query to refetch
      queryClient.invalidateQueries({ queryKey: queryKeyStore.auth.user() });
    },
  });
}
