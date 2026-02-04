import api from "../core/axios"

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

export const cartService = {
  getUserCart: async (userId: number): Promise<Cart[]> => {
    const response = await api.get<Cart[]>(`/carts/user/${userId}`)
    return response.data
  },

  addToCart: async (
    userId: number, 
    products: CartProduct[]
  ): Promise<AddToCartResponse> => {
    const requestData: AddToCartRequest = {
      userId,
      date: new Date().toISOString(),
      products,
    }
    
    const response = await api.post<AddToCartResponse>('/carts', requestData)
    return response.data
  },

}