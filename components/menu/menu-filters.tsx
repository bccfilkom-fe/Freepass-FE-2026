/**
 * MenuFilters Component (Dumb)
 * Filter menu items by category and search query
 */

"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MenuCategory } from "@/types/dto";

interface MenuFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: MenuCategory | "ALL";
  onCategoryChange: (category: MenuCategory | "ALL") => void;
  className?: string;
}

const CATEGORIES: Array<{
  value: MenuCategory | "ALL";
  label: string;
  emoji: string;
}> = [
  //  TODO: improve these icons
  { value: "ALL", label: "All", emoji: "🍽️" },
  { value: MenuCategory.FOOD, label: "Food", emoji: "🍱" },
  { value: MenuCategory.BEVERAGE, label: "Beverages", emoji: "🥤" },
];

export function MenuFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  className,
}: MenuFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search menu items..."
          className="pl-10 h-12 text-base border-2 focus-visible:ring-2"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            variant={
              selectedCategory === category.value ? "default" : "outline"
            }
            className={cn(
              "font-semibold transition-all",
              selectedCategory === category.value && "shadow-lg",
            )}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
