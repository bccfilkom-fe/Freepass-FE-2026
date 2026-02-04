import { create } from 'zustand';

interface ProductFilters {
  category: string | null;
  search: string;
  sortBy: 'price-asc' | 'price-desc' | 'name' | null;
}

interface ProductState {
  filters: ProductFilters;
  setCategory: (category: string | null) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: ProductFilters['sortBy']) => void;
  resetFilters: () => void;
}

const initialFilters: ProductFilters = {
  category: null,
  search: '',
  sortBy: null,
};

export const useProductStore = create<ProductState>((set) => ({
  filters: initialFilters,
  setCategory: (category) =>
    set((state) => ({ filters: { ...state.filters, category } })),
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),
  setSortBy: (sortBy) =>
    set((state) => ({ filters: { ...state.filters, sortBy } })),
  resetFilters: () => set({ filters: initialFilters }),
}));

