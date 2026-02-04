'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  size?: 'sm' | 'default';
  className?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  size = 'default',
  className,
}: QuantitySelectorProps) {
  const isSmall = size === 'sm';
  const buttonSize = isSmall ? 'h-8 w-8' : '';
  const iconSize = isSmall ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = isSmall ? 'text-sm' : '';
  const textWidth = isSmall ? 'w-8' : 'w-12';

  return (
    <div className={cn('flex items-center', className)}>
      <Button
        variant="outline"
        size="icon"
        className={buttonSize}
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <Minus className={iconSize} />
      </Button>
      <span className={cn('text-center font-medium', textWidth, textSize)}>
        {quantity}
      </span>
      <Button
        variant="outline"
        size="icon"
        className={buttonSize}
        onClick={onIncrease}
      >
        <Plus className={iconSize} />
      </Button>
    </div>
  );
}
