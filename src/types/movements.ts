import { product } from "./product";

export type inventory_movement = "IN" | "OUT";

export type movement = {
  id?: number,
  product_id: number,
  created_at?: string,
  type: inventory_movement,
  nexstore_product?: product,
  quantity: number,
  note?: string,
  user_id: string,
}