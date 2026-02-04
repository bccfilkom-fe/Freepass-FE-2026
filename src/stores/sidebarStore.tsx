import { create } from "zustand";

type sidebarStore = {
  isOpen: boolean,
  openSidebar: () => void,
  closeSidebar: () => void
}

export const useSidebarStore = create<sidebarStore>(
  (set) => ({
    isOpen: false,
    openSidebar: () => set(() => ({ isOpen: true })),
    closeSidebar: () => set(() => ({ isOpen: false })),
  })
)