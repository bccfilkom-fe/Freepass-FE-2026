import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ReservationSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 space-y-3 bg-neutral-400">
      {/* Date and Time */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      
      {/* Service Name */}
      <Skeleton className="h-5 w-32" />
      
      {/* Status Badge */}
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  )
}

export default ReservationSkeleton