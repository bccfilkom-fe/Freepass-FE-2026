import { product } from "@/types/product";
import { create } from "zustand";

type modalStore = {
  openCreateModal: boolean,
  openEditModal: boolean,
  data: product | null,
  setOpenCreateModal: () => void,
  setOpenEditModal: (data: product) => void,
  closeModal: () => void;
}

export const useProductModalStore = create<modalStore>(
  (set) => ({
    openCreateModal: false,
    openEditModal: false,
    data: null,
    setOpenCreateModal: () => set(() => ({ openCreateModal: true })),
    setOpenEditModal: (data) => set(() => ({ data: data, openEditModal: true })),
    closeModal: () => set(() => ({ data: null, openCreateModal: false, openEditModal: false })),
  })
)