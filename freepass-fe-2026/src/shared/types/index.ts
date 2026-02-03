export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export interface FilterOptions {
  category: string
  minPrice: number
  maxPrice: number
  search: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
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

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}
