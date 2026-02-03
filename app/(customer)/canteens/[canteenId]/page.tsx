/**
 * Canteen Detail Page
 * Display canteen information and menu
 */

"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { toast } from "sonner";
import { CanteenDetailHeader } from "@/components/canteen";
import { MenuList } from "@/components/menu";
import { MenuListSkeleton } from "@/components/menu/menu-list-skeleton";
import { ReviewPreview } from "@/components/review";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCanteen, useCanteenMenu } from "@/hooks/use-canteens";
import { useCartStore } from "@/stores/cart-store";
import type { MenuItem } from "@/types/ui";

interface CanteenDetailPageProps {
  params: Promise<{
    canteenId: string;
  }>;
}

/*
I see that in this page there's a rating and review count
i want you to implement a preview of top reivews in this canteen,  it will  be implemented as a section of review cards with horizontal scrolling, max displayed review cards is 5,
there will also be a 'see more' button that upon clicked will redirect the user to a dedicated review page containing all the reviews for the corresponding canteen,
*/
export default function CanteenDetailPage({ params }: CanteenDetailPageProps) {
  const { canteenId } = use(params);
  const {
    data: canteen,
    isLoading: isLoadingCanteen,
    error: canteenError,
  } = useCanteen(canteenId);
  const {
    data: menuItems,
    isLoading: isLoadingMenu,
    error: menuError,
  } = useCanteenMenu(canteenId);

  // Cart store
  const addItem = useCartStore((state) => state.addItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);
  const canAddFromCanteen = useCartStore((state) => state.canAddFromCanteen);

  // Build quantity map
  const itemQuantities: Record<string, number> = {};
  if (menuItems) {
    menuItems.forEach((item) => {
      itemQuantities[item.id] = getItemQuantity(item.id);
    });
  }

  // Cart handlers
  const handleAddToCart = (item: MenuItem) => {
    if (!canAddFromCanteen(item.canteenId)) {
      toast.error("Cannot mix items from different canteens", {
        description:
          "Please clear your cart or complete your current order first",
      });
      return;
    }

    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  const handleIncrement = (item: MenuItem) => {
    if (getItemQuantity(item.id) >= item.stock) {
      toast.error("Cannot add more items", {
        description: `Only ${item.stock} items available`,
      });
      return;
    }

    incrementItem(item.id);
  };

  const handleDecrement = (item: MenuItem) => {
    decrementItem(item.id);
  };

  // Loading state for canteen info
  if (isLoadingCanteen) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-10 w-32 mb-6" />
        <Skeleton className="h-[400px] w-full mb-8" />
      </div>
    );
  }

  // Error state for canteen info
  if (canteenError) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/canteens">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </Link>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load canteen</p>
          <p className="text-sm mt-1">{canteenError.message}</p>
        </Alert>
      </div>
    );
  }

  // Canteen not found
  if (!canteen) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/canteens">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Canteens
          </Button>
        </Link>
        <Alert>
          <p className="font-semibold">Canteen not found</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back button */}
      <Link href="/canteens">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Canteens
        </Button>
      </Link>

      {/* Canteen Info */}
      <CanteenDetailHeader canteen={canteen} className="mb-8" />

      <Separator className="my-8" />

      {/* Reviews Section */}
      <ReviewPreview canteenId={canteenId} />

      <Separator className="my-8" />

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        {/* Loading state for menu */}
        {isLoadingMenu && <MenuListSkeleton count={6} />}

        {/* Error state for menu */}
        {menuError && (
          <Alert variant="destructive">
            <p className="font-semibold">Failed to load menu</p>
            <p className="text-sm mt-1">{menuError.message}</p>
          </Alert>
        )}

        {/* Menu items - empty state handled by MenuList component */}
        {!isLoadingMenu && !menuError && (
          <MenuList
            items={menuItems || []}
            itemQuantities={itemQuantities}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
      </div>
    </div>
  );
}
