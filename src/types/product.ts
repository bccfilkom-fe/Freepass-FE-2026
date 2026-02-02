export type category = "Men's Clothing" | "Women's Clothing" | "Jewelery" | "Electronics";

export type product = {
  id: number,
  sku: string,
  qty: number,
  title: string,
  price: number,
  description: string,
  category: category,
  image: string,
  rating_rate: number,
  rating_count: number
}