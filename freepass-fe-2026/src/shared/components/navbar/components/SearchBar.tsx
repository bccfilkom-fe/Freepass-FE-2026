"use client"

import { Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchBar } from '../hooks/useSearchBar'

interface SearchBarProps {
  onClose?: () => void
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const {
    query,
    setQuery,
    results,
    loading,
    showResults,
    setShowResults,
    handleClear,
    searchRef,
  } = useSearchBar()

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  onClick={() => {
                    setShowResults(false)
                    onClose?.()
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <div className="relative w-12 h-12 bg-gray-100 rounded">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}

              <Link
                href={`/shop?search=${query}`}
                onClick={() => {
                  setShowResults(false)
                  onClose?.()
                }}
                className="block px-4 py-3 text-center text-sm text-gray-600 border-t hover:bg-gray-50"
              >
                See all results for &quot;{query}`&quot;`
              </Link>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  )
}
