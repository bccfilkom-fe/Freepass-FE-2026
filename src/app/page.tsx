'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InfiniteGallery from '@/shared/components/3d-gallery-photography';
import { Button } from '@/shared/components/button';
import { useProducts } from '@/features/product/hooks';
import Logo from '@/shared/components/logo';
import { LoaderCircle } from 'lucide-react';

export default function LandingPage() {
  const { data: products, isLoading } = useProducts();

  const productImages = products?.map((product) => ({
    src: product.image,
    alt: product.title,
  })) || [];

  if (isLoading || productImages.length === 0) {
    return (
      <main className="min-h-screen h-full w-full flex flex-col items-center justify-center gap-6">
        <LoaderCircle className="size-12 animate-spin" />
        <p className="text-lg text-muted-foreground">Loading page...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen h-full w-full">
      <InfiniteGallery
        images={productImages}
        className="h-screen w-full rounded-lg overflow-hidden"
      />
      <div className="h-screen inset-0 pointer-events-none fixed flex flex-col items-center justify-center text-center px-3 text-primary gap-6">
        <Logo className="size-20" />
        <h1 className="text-4xl md:text-7xl tracking-tight">
          <span className="font-bold">ShipIt</span>
        </h1>
        <p className="text-lg md:text-xl opacity-80">Your one-stop shop for everything</p>
        <Button asChild size="lg" className="pointer-events-auto gap-2 px-8 py-6 text-lg">
          <Link href="/products">
            Shop Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="fixed bottom-10 left-0 right-0 flex flex-col items-center gap-4">

        <p className="uppercase text-[11px] hidden lg:flex font-semibold opacity-60">
          Use mouse wheel or arrow keys to scroll
        </p>
      </div>
    </main>
  );
}

