// src/lib/react-query-client.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Don't retry aggressively
      refetchOnWindowFocus: false, // Prevent unexpected reloads
      staleTime: 1000 * 60, // 1 minute
      cacheTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 0, // Let the user retry manually for mutations
    },
  },
});
