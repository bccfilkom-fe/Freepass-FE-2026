'use client';

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Separator } from '@/shared/components/separator';
import { CartItem } from '@/features/cart/components/cart-item';
import { CartSummary } from '@/features/cart/components/cart-summary';
import { useCartStore } from '@/features/cart/store';
import { EmptyState } from '@/shared/components/empty-state';

export default function CartPage() {
    const router = useRouter();
    const { items, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <EmptyState
                    type="cart"
                    action={{
                        label: 'Browse Products',
                        onClick: () => router.push('/products'),
                    }}
                    className="min-h-[60vh]"
                />
            </section>
        );
    }

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                    <p className="text-muted-foreground">
                        {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="gap-2 text-destructive hover:text-destructive"
                    onClick={clearCart}
                >
                    <Trash2 className="h-4 w-4" />
                    Clear Cart
                </Button>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-0">
                    {items.map((item, index) => (
                        <div key={item.id}>
                            <CartItem item={item} />
                            {index < items.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>


                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <CartSummary />
                    </div>
                </div>
            </div>
        </section>
    );
}

