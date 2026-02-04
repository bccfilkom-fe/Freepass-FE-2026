/**
 * Order List Skeleton Component
 * Loading skeleton for orders list
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderListSkeleton() {
   return (
      <div className="container mx-auto p-6 max-w-5xl">
         <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
         </div>
         <div className="space-y-4">
            {[1, 2, 3].map((i) => (
               <Card key={i} className="overflow-hidden border-2">
                  <CardHeader className="pb-4">
                     <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                           <Skeleton className="h-6 w-3/4" />
                           <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <Skeleton className="h-20 w-full" />
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
