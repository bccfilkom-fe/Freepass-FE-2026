import ProductCard from '../ProductCard'
import { Product } from '@/src/shared/types'

interface Props {
  products: Product[]
  resetFilters: () => void
}

export default function ShopProductGrid({ products, resetFilters }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
        <button
          onClick={resetFilters}
          className="mt-4 px-6 py-2 bg-[#18484b] text-white rounded-lg hover:bg-[#216468]"
        >
          Clear Filters
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
