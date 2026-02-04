import { category } from "../types/categories";
import { create } from "zustand";

type modalStore = {
  isOpen: boolean,
  data: category | null,
  type: "edit" | "create" | null,
  openCreate: () => void,
  openEdit: (data: category) => void,
  closeModal: () => void
}

export const useCategoryModalStore = create<modalStore>(
  (set) => ({
    isOpen: false,
    data: null,
    type: null,
    openEdit: (data) => set(() => ({ data: data, isOpen: true, type: "edit" })),
    openCreate: () => set(() => ({ isOpen: true, type: "create" })),
    closeModal: () => set(() => ({ data: null, isOpen: false, type: null }))
  })
)