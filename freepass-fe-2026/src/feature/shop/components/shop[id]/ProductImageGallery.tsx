import Image from 'next/image'
import { Product } from '@/src/shared/types'

interface Props {
  product: Product
}

export default function ProductImageGallery({ product }: Props) {
  return (
    <div className="relative">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Image
              src={product.image}
              alt={`${product.title} ${i}`}
              fill
              className="object-contain p-2"
              sizes="25vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
