import { Suspense } from 'react'
import ShopClient from './ShopClient'
import ShopSkeleton from '@/src/feature/shop/components/shop/ShopSkeleton'

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  )
}
