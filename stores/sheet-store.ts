/**
 * Global Sheet Store
 * Zustand store for managing a global sheet/bottom-sheet state
 */

"use client";

import { create } from "zustand";

type SheetStore = {
  isOpen: boolean;
  openSheet: (props: { children: React.ReactNode }) => void;
  children: React.ReactNode;
  closeSheet: () => void;
};

export const useSheetStore = create<SheetStore>((set) => ({
  isOpen: false,
  openSheet: ({ children }) => {
    set({ isOpen: true, children });
  },
  closeSheet: () => {
    set({ isOpen: false, children: null });
  },
  children: null,
}));
