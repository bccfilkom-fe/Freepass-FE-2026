'use client';

import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-skeleton';
import { EmptyState } from '@/shared/components/empty-state';
import { useRouter } from 'next/navigation';
import type { Product } from '../schema';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        type="search"
        action={{
          label: 'View All Products',
          onClick: () => router.push('/products'),
        }}
        className="min-h-[40vh]"
      />
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-in fade-in-0 slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

