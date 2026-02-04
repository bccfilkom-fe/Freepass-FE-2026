"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/src/shared/types/product'
import { useCart } from '@/src/shared/hooks/useCart'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group h-full flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-gray-500 uppercase mb-1">{product.category}</p>
          <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 flex-1">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating.rate}</span>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-[#255e61] hover:bg-[#2b7a7e] text-white rounded-full transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
