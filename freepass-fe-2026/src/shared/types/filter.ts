export type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'

export interface FilterOptions {
  category: string
  minPrice: number
  maxPrice: number
  search: string
}