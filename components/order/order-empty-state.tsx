/**
 * Order Empty State Component
 * Displays message when no orders exist
 */

import Link from "next/link";
import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function OrderEmptyState() {
   return (
      <div className="container mx-auto p-6 max-w-5xl">
         <h1 className="text-4xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            My Orders
         </h1>
         <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardContent className="flex flex-col items-center justify-center py-16">
               <Package className="w-16 h-16 text-muted-foreground mb-4" />
               <p className="text-xl font-semibold mb-2">No orders yet</p>
               <p className="text-muted-foreground text-center max-w-md mb-6">
                  Start exploring our canteens and place your first order!
               </p>
               <Link
                  href="/canteens"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
               >
                  Browse Canteens
               </Link>
            </CardContent>
         </Card>
      </div>
   );
}
