import { category } from "./categories"

export type product = {
  id?: number,
  code: string,
  qty: number,
  title: string,
  price: number,
  description?: string,
  category_id: number,
  nexstore_category?: category,
  image?: string,
  rating_rate?: number,
  rating_count?: number
}