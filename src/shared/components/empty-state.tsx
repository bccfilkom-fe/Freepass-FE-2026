'use client';

import { Package, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/lib/utils';

type EmptyStateType = 'products' | 'cart' | 'search';

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const icons = {
  products: Package,
  cart: ShoppingCart,
  search: Search,
};

const defaults = {
  products: {
    title: 'No products found',
    message: 'There are no products available at the moment.',
  },
  cart: {
    title: 'Your cart is empty',
    message: 'Add some products to your cart to get started.',
  },
  search: {
    title: 'No results found',
    message: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
};

export function EmptyState({
  type,
  title,
  message,
  action,
  className,
}: EmptyStateProps) {
  const Icon = icons[type];
  const defaultContent = defaults[type];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-8 text-center',
        className
      )}
    >
      <div className="rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title || defaultContent.title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {message || defaultContent.message}
        </p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="default">
          {action.label}
        </Button>
      )}
    </div>
  );
}

