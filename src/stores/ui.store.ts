import { create } from "zustand";

interface UIState { isModalOpen: boolean; selectedTransactionId: string|null; openModal:(id?:string)=>void; closeModal:()=>void }
export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  selectedTransactionId: null,
  openModal: (id)=>set({isModalOpen:true, selectedTransactionId:id||null}),
  closeModal: ()=>set({isModalOpen:false, selectedTransactionId:null})
}));