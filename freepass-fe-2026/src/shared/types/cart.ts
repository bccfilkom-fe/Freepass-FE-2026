import type { Product } from './product'

export interface CartItem extends Product {
  quantity: number
}

export interface CartProduct {
  productId: number
  quantity: number
}

export interface Cart {
  id: number
  userId: number
  date: string
  products: CartProduct[]
}

export interface AddToCartRequest {
  userId: number
  date: string
  products: CartProduct[]
}

export interface AddToCartResponse {
  id: number
  userId: number
  date: string
  products: CartProduct[]
}