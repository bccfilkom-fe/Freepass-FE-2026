/**
 * TanStack Query Client Configuration
 * Centralized configuration for React Query
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh
      gcTime: 1000 * 60 * 30, // 30 minutes - cache time
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: true, // Refetch when reconnecting
      refetchOnMount: true, // Refetch on component mount
    },
    mutations: {
      retry: 1, // Retry mutations once
      retryDelay: 1000, // Wait 1 second before retrying mutation
    },
  },
});
