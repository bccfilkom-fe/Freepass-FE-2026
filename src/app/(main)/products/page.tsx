'use client';

import { useProducts, useCategories, useFilteredProducts } from '@/features/product/hooks';
import { ProductGrid } from '@/features/product/components/product-grid';
import { ProductFilters } from '@/features/product/components/product-filters';
import { ErrorState } from '@/shared/components/error-state';

export default function ProductsPage() {
    const { data: products, isError, error, refetch } = useProducts();
    const { data: categories = [] } = useCategories();
    const filteredProducts = useFilteredProducts(products);

    if (isError) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <ErrorState
                    message={error?.message}
                    onRetry={() => refetch()}
                    className="min-h-[50vh]"
                />
            </div>
        );
    }

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    All Products
                </h1>
                <p className="text-muted-foreground">
                    Discover our collection of {products?.length || 0} amazing products
                </p>
            </header>

            <ProductFilters categories={categories} />

            <ProductGrid products={filteredProducts} />
        </section>
    );
}

