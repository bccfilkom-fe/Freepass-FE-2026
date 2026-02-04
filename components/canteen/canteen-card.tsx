/**
 * CanteenCard Component (Dumb)
 * Displays a single canteen with image, name, description, rating, and location
 */

"use client";

import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Canteen } from "@/types/ui";

interface CanteenCardProps {
  canteen: Canteen;
  onClick?: () => void;
  className?: string;
  disabled: boolean;
}

// TODO: improve this to use link insted of onClick handldr for SSR
export function CanteenCard({
  canteen,
  onClick,
  className,
  disabled = false,
}: CanteenCardProps) {
  const rootClasses = cn(
    // interactive / motion classes only when not disabled
    !disabled
      ? "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      : "overflow-hidden",
    // border hover only when interactive
    !disabled ? "border-2 hover:border-primary/20" : "border-2",
    !canteen.isActive && "opacity-60",
    className,
  );

  return (
    <Card className={rootClasses} onClick={disabled ? undefined : onClick}>
      {/* Image */}
      <div className="relative aspect-[7/6] md:aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={canteen.imageUrl}
          alt={canteen.name}
          fill
          className={cn(
            "object-cover",
            // only apply zoom/transform when not disabled
            !disabled &&
              "transition-transform duration-500 group-hover:scale-110",
            !canteen.isActive && "grayscale",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Status Badge */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3">
          <Badge
            variant={canteen.isActive ? "default" : "secondary"}
            className="shadow-lg font-semibold text-xs md:text-sm px-2 md:px-2.5"
          >
            {canteen.isActive ? "Open" : "Closed"}
          </Badge>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 flex items-center gap-0.5 md:gap-1 bg-background/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
          {/* FIXME: non theme-token color usage */}
          <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-xs md:text-sm">
            {canteen.rating.toFixed(1)}
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground">
            ({canteen.totalReviews})
          </span>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="px-3 md:px-6 md:pt-2">
        <h3
          className={cn(
            "font-bold text-base md:text-xl line-clamp-2",
            // color transition only when not disabled
            !disabled && "group-hover:text-primary transition-colors",
          )}
        >
          {canteen.name}
        </h3>
      </CardHeader>

      <CardContent className="space-y-2 md:space-y-3 px-3 md:px-6 pb-3 md:pb-6">
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 min-h-[2rem] md:min-h-[2.5rem]">
          {canteen.description}
        </p>

        <div className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm text-muted-foreground">
          <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="line-clamp-1">{canteen.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
