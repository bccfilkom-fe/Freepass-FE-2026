import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { SortOption } from '@/src/shared/types'

interface Props {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (v: string) => void
  sortBy: SortOption
  setSortBy: (v: SortOption) => void
  showFilters: boolean
  setShowFilters: (v: boolean) => void
}

export default function ShopFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
}: Props) {
  return (
    <div className="mb-8 space-y-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg w-full justify-center"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Filters & Sort</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 md:flex md:items-center md:justify-between`}>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#18484b] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-[#18484b] hover:text-white'
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-[#18484b] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-[#18484b] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#18484b]"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  )
}
