interface Props {
  searchQuery: string
  total: number
}

export default function ShopHeader({ searchQuery, total }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {searchQuery ? `Search results for "${searchQuery}"` : 'Shop'}
      </h1>
      <p className="text-gray-600">
        {total} product{total !== 1 ? 's' : ''} found
      </p>
    </div>
  )
}
