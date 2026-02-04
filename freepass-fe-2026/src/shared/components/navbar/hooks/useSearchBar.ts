import { useEffect, useState, useRef } from "react"
import { Product } from "@/src/shared/types/product"
import { productService } from "@/src/api/services/product"

export function useSearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setLoading(true)
      try {
        const products = await productService.getAllProducts()
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered.slice(0, 5))
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  return {
    query,
    setQuery,
    results,
    loading,
    showResults,
    setShowResults,
    handleClear,
    searchRef,
  }
}