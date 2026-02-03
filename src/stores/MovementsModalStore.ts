import { movement } from "@/types/movements";
import { create } from "zustand";

type modalStore = {
  isOpen: boolean,
  data: movement | null,
  type: "edit" | "create" | null,
  openCreate: () => void,
  openEdit: (data: movement) => void,
  closeModal: () => void
}

export const useMovementModalStore = create<modalStore>(
  (set) => ({
    isOpen: false,
    data: null,
    type: null,
    openEdit: (data) => set(() => ({ data: data, isOpen: true, type: "edit" })),
    openCreate: () => set(() => ({ isOpen: true, type: "create" })),
    closeModal: () => set(() => ({ data: null, isOpen: false, type: null }))
  })
)