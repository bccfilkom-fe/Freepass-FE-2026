'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { useCartStore } from '../store';
import { useRemoveFromCart } from '../hooks';
import type { CartItem as CartItemType } from '../schema';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useRemoveFromCart();

  return (
    <div className="flex gap-4 py-4 animate-in fade-in-0 slide-in-from-left-4">

      <Link
        href={`/products/${item.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border bg-white"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2"
          sizes="96px"
        />
      </Link>


      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="space-y-1">
          <Link
            href={`/products/${item.id}`}
            className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors"
          >
            {item.title}
          </Link>
          <p className="text-sm text-muted-foreground capitalize">
            {item.category}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>


          <div className="flex items-center gap-3">
            <span className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeFromCart(item.id, item.title)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

