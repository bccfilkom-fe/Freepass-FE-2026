/**
 * CanteenSearch Component (Dumb)
 * Search input with debounced onChange
 */

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CanteenSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CanteenSearch({
  value,
  onChange,
  placeholder = "Search canteens...",
  className,
}: CanteenSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 h-12 text-base border-2 focus-visible:ring-2"
      />
    </div>
  );
}
