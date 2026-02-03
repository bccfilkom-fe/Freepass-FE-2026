interface Props {
  error: string
  onBack: () => void
}

export default function ProductDetailError({ error, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error}
        </h2>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    </div>
  )
}
