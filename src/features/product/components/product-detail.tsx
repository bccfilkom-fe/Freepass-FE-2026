'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/button';
import { Badge } from '@/shared/components/badge';
import { Separator } from '@/shared/components/separator';
import { QuantitySelector } from '@/shared/components/quantity-selector';
import { StarRating } from '@/features/product/components/star-rating';
import { formatPrice } from '@/shared/lib/utils';
import { useAddToCart } from '@/features/cart/hooks';
import type { Product } from '../schema';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="space-y-6">

      <Link
        href="/products"
        className="inline-flex items-center gap-2  text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">

        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
          />
        </div>


        <div className="space-y-6 md:col-span-2">
          <div className="space-y-2">
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          </div>

          {product.rating && (
            <StarRating
              rating={product.rating.rate}
              count={product.rating.count}
            />
          )}

          <p className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>

          <Separator />

          <div className="space-y-2">
            <h2 className="font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />


          <div className="flex items-center gap-6">

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="gap-2 bg-chart-2/90 hover:bg-chart-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>

            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


