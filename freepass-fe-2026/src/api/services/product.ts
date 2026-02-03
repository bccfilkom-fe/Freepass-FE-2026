import api from "../core/axios"
import { User, Product } from "@/src/shared/types"

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products')
    return response.data
  },

  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products?limit=${limit}`)
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${category}`)
    return response.data
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/categories')
    return response.data
  },
}