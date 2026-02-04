/**
 * Canteens Page
 * Display list of all canteens with search and filtering
 */

"use client";

import { CanteenList, CanteenSearch } from "@/components/canteen";
import { CanteenListSkeleton } from "@/components/canteen/canteen-list-skeleton";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useCanteenSearch } from "@/hooks/use-canteen-search";
import { useCanteens } from "@/hooks/use-canteens";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";


// TODO: add items canteen's info
//    - the current UI of this page is confusing because there's no way to know from  which canteen they order. 
// FIXME: redirect to order on checkout
export default function CanteensPage() {
  const router = useRouter();
  const { data: canteens, isLoading, error } = useCanteens();
  
  const { searchQuery, setSearchQuery, filteredCanteens, hasActiveSearch } =
    useCanteenSearch({
      canteens: canteens || [],
    });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Canteeneo</h1>
        <CanteenListSkeleton count={6} />
      </div>
    );
  }


  // Error state
  if (error) {
    return (
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
       >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Canteeneo</h1>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load canteens</p>
          <p className="text-sm mt-1">{error.message}</p>
        </Alert>
      </div>
       </motion.div>
    );
  }

  // Empty/Success state handled by CanteenList component
  return (
     <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
     >
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Canteeneo</h1>
          {canteens && canteens.length > 0 && (
            <Badge variant="secondary">
              {hasActiveSearch
                ? `${filteredCanteens.length} of ${canteens.length}`
                : `${canteens.length} canteens`}
            </Badge>
          )}
        </div>

        <CanteenSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, location, or description..."
        />
      </div>

      <div className="p-4 border-rounded bg-primary/5 rounded-3xl">
        <CanteenList
          canteens={filteredCanteens}
          onCanteenClick={(canteen) => router.push(`/canteens/${canteen.id}`)}
        />
      </div>
        </div> 
     </motion.div>
  );
}
