'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMounted } from '@/shared/hooks/use-mounted';
import { Separator } from '@/shared/components/separator';
import { useAuthStore } from '@/features/auth/store';
import { ProfileInfo } from '@/features/auth/components/profile-info';
import { DeleteAccount } from '@/features/auth/components/delete-account';
import { ProfileSkeleton } from '@/features/auth/components/profile-skeleton';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const mounted = useMounted();

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <section className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </header>

      <div className="space-y-6">
        <ProfileInfo user={user} />
        
        <Separator />
        
        <DeleteAccount />
      </div>
    </section>
  );
}
