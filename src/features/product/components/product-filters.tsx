'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import { Badge } from '@/shared/components/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/dropdown-menu';
import { useProductStore } from '../store';
import { cn } from '@/shared/lib/utils';

interface ProductFiltersProps {
  categories: string[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const { filters, setCategory, setSearch, setSortBy, resetFilters } = useProductStore();

  const hasActiveFilters = filters.category || filters.search || filters.sortBy;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
              {filters.sortBy && (
                <Badge variant="secondary" className="ml-1">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setSortBy(null)}
              className={cn(!filters.sortBy && 'bg-accent')}
            >
              Default
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy('price-asc')}
              className={cn(filters.sortBy === 'price-asc' && 'bg-accent')}
            >
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy('price-desc')}
              className={cn(filters.sortBy === 'price-desc' && 'bg-accent')}
            >
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy('name')}
              className={cn(filters.sortBy === 'name' && 'bg-accent')}
            >
              Name: A to Z
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="gap-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>


      <div className="flex flex-wrap gap-2">
        <Button
          variant={!filters.category ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCategory(null)}
          className="capitalize"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={filters.category === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

