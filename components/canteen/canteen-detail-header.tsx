/**
 * CanteenDetailHeader Component (Dumb)
 * Displays canteen details with image, name, description, rating, and location
 */

import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Canteen } from "@/types/ui";

interface CanteenDetailHeaderProps {
  canteen: Canteen;
  className?: string;
}

export function CanteenDetailHeader({
  canteen,
  className,
}: CanteenDetailHeaderProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Hero Image */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border-2 shadow-lg">
        <Image
          src={canteen.imageUrl}
          alt={canteen.name}
          fill
          className={cn("object-cover", !canteen.isActive && "grayscale")}
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant={canteen.isActive ? "default" : "secondary"}
            className="shadow-lg font-semibold text-base px-4 py-1.5"
          >
            {/* TODO: improve icon */}
            {canteen.isActive ? "🟢 Open Now" : "🔴 Closed"}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <h1 className="text-4xl font-bold tracking-tight">
              {canteen.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {canteen.description}
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {/* Rating */}
          {/* FIXME: direct use of 'absolute' color instead of using theme tokens */}
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/20 px-4 py-2 rounded-full border-2 border-amber-200 dark:border-amber-800">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-base">
              {canteen.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({canteen.totalReviews} reviews)
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{canteen.location}</span>
          </div>

          {/* Open Hours (placeholder) */}
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">8:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
