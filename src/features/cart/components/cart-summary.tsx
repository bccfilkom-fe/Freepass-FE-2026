'use client';

import { ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/card';
import { Separator } from '@/shared/components/separator';
import { formatPrice } from '@/shared/lib/utils';
import { useCartStore } from '../store';
import { useSyncCart } from '../hooks';
import { useAuthStore } from '@/features/auth/store';
import { toast } from 'sonner';

export function CartSummary() {
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const syncCart = useSyncCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      return;
    }
    syncCart.mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Items ({getTotalItems()})
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">
            Free shipping on orders over $50
          </p>
        )}
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={items.length === 0 || syncCart.isPending}
        >
          {syncCart.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Checkout'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

