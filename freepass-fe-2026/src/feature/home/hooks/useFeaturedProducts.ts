"use client"
import { useEffect, useState } from 'react'
import { Product } from '@/src/shared/types/product'
import { productService } from '@/src/api/services/product'

export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getLimitedProducts(limit)
        setProducts(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return { products, loading, error }
}
