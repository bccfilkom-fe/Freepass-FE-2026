import { Card, CardContent, CardHeader } from '@/shared/components/card';
import { Skeleton } from '@/shared/components/skeleton';

export function ProfileSkeleton() {
  return (
    <section className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-5 w-56 mt-2" />
      </header>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-10 w-56" />
        </CardContent>
      </Card>
    </section>
  );
}
