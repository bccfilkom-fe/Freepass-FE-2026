/**
 * useCanteenSearch Hook
 * Handles canteen search logic with debouncing
 */

import { useMemo, useState } from "react";
import type { Canteen } from "@/types/ui";

interface UseCanteenSearchOptions {
  canteens: Canteen[];
  debounceMs?: number;
}

export function useCanteenSearch({
  canteens,
  debounceMs = 300,
}: UseCanteenSearchOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    // Debounce the actual filter
    const timer = setTimeout(() => {
      setDebouncedQuery(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  };

  // Filter canteens based on search query
  const filteredCanteens = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return canteens;
    }

    const query = debouncedQuery.toLowerCase().trim();

    return canteens.filter((canteen) => {
      const matchesName = canteen.name.toLowerCase().includes(query);
      const matchesDescription = canteen.description
        .toLowerCase()
        .includes(query);
      const matchesLocation = canteen.location.toLowerCase().includes(query);

      return matchesName || matchesDescription || matchesLocation;
    });
  }, [canteens, debouncedQuery]);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    filteredCanteens,
    hasActiveSearch: debouncedQuery.trim().length > 0,
  };
}
