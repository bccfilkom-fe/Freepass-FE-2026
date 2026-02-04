import { create } from "zustand";

export type toast = {
  id: number,
  success: boolean,
  message: string
}

export type toastStore = {
  toasts: toast[],
  addToast: (success: boolean, message: string) => void
}

export const useToastStore = create<toastStore>(
  (set) => {
    return {
      toasts: [],
      addToast: (success, message) => {
        const id = Math.random() * 100000;
        set((state) => ({
          toasts: [...state.toasts, {
            id: id,
            success: success,
            message: message
          }]
        }));
        setTimeout(() => {
          set((state) => {
            const toastFiltered = state.toasts.filter((item) => item.id !== id);
            return {
              toasts: toastFiltered,
            }
          })
        }, 3000);
      }
    }
  }
)