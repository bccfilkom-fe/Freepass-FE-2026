import { Star, ShoppingCart, Plus, Minus } from 'lucide-react'
import { Product } from '@/src/shared/types'

interface Props {
  product: Product
  quantity: number
  selectedSize: string
  addingToCart: boolean
  setSelectedSize: (v: string) => void
  incrementQuantity: () => void
  decrementQuantity: () => void
  handleAddToCart: () => void
}

export default function ProductInfo({
  product,
  quantity,
  selectedSize,
  addingToCart,
  setSelectedSize,
  incrementQuantity,
  decrementQuantity,
  handleAddToCart,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase">
          {product.category}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {product.title}
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < Math.floor(product.rating.rate)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating.rate} ({product.rating.count} reviews)
        </span>
      </div>

      <div className="border-t border-b border-gray-200 py-6">
        <span className="text-4xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {(product.category.includes('clothing') ||
        product.category.includes('men') ||
        product.category.includes('women')) && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Select Size</h3>
          <div className="flex gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-gray-900 bg-[#18484b] text-white'
                    : 'border-gray-300 hover:bg-[#18484b] hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 py-2 font-semibold text-lg min-w-[60px] text-center">
              {quantity}
            </span>
            <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={addingToCart}
        className="w-full bg-[#18484b] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1e5b60] disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        {addingToCart ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  )
}
