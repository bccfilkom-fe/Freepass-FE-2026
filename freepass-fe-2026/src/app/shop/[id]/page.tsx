"use client"

import { ArrowLeft } from 'lucide-react'
import { useProductDetail } from '@/src/feature/shop/hooks/useProductDetail'
import ProductDetailSkeleton from '@/src/feature/shop/components/shop[id]/ProductDetailSkeleton'
import ProductDetailError from '@/src/feature/shop/components/shop[id]/ProductDetailError'
import ProductImageGallery from '@/src/feature/shop/components/shop[id]/ProductImageGallery'
import ProductInfo from '@/src/feature/shop/components/shop[id]/ProductInfo'

export default function ProductDetailPage() {
  const {
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
  } = useProductDetail()

  if (loading) return <ProductDetailSkeleton />

  if (error || !product) {
    return (
      <ProductDetailError
        error={error || 'Product not found'}
        onBack={() => router.push('/shop')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 bg-white rounded-lg shadow-sm p-6 md:p-8">
          <ProductImageGallery product={product} />
          <ProductInfo
            product={product}
            quantity={quantity}
            selectedSize={selectedSize}
            addingToCart={addingToCart}
            setSelectedSize={setSelectedSize}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}
