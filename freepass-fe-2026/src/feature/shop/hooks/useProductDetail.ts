"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Product } from '@/src/shared/types'
import { productService } from '@/src/api/services/product'
import { useCart } from '@/src/shared/hooks/useCart'

export function useProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const id = Number(params.id)
        const data = await productService.getProductById(id)
        setProduct(data)
      } catch (err) {
        setError('Failed to load product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product) return

    setAddingToCart(true)
    try {
      addToCart(product, quantity)
      alert(`Added ${quantity} ${product.title} to cart!`)
      setQuantity(1)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert('Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  return {
    router,
    product,
    loading,
    error,
    quantity,
    selectedSize,
    addingToCart,
    setSelectedSize,
    handleAddToCart,
    incrementQuantity,
    decrementQuantity,
  }
}
