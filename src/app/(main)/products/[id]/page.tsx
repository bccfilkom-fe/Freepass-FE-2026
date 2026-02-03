'use client';

import { use } from 'react';
import { useProduct } from '@/features/product/hooks';
import { ProductDetail } from '@/features/product/components/product-detail';
import { ProductDetailSkeleton } from '@/features/product/components/product-skeleton';
import { ErrorState } from '@/shared/components/error-state';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const productId = parseInt(id, 10);
    const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

    if (isLoading) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <ProductDetailSkeleton />
            </section>
        );
    }

    if (isError || !product) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <ErrorState
                    title="Product not found"
                    message={error?.message || 'The product you are looking for does not exist.'}
                    onRetry={() => refetch()}
                    className="min-h-[50vh]"
                />
            </section>
        );
    }

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <ProductDetail product={product} />
        </section>
    );
}

