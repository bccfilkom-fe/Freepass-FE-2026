'use client'
import { useShopProducts } from '@/src/feature/shop/hooks/useShopProducts'
import ShopHeader from '@/src/feature/shop/components/shop/ShopHeaders'
import ShopFilters from '@/src/feature/shop/components/shop/ShopFilters'
import ShopProductGrid from '@/src/feature/shop/components/shop/ShopProductGrid'
import ShopSkeleton from '@/src/feature/shop/components/shop/ShopSkeleton'

export default function ShopClient() {
  const {
    searchQuery,
    filteredProducts,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
  } = useShopProducts()

  if (loading) {
    return <ShopSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShopHeader
          searchQuery={searchQuery}
          total={filteredProducts.length}
        />

        <ShopFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <ShopProductGrid
          products={filteredProducts}
          resetFilters={() => {
            setSelectedCategory('all')
            setSortBy('default')
          }}
        />
      </div>
    </div>
  )
}
