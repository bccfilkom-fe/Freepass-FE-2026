'use client';

import Link from 'next/link';
import { Package, Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex justify-between">
          <Link
            href="/products"
            className="flex items-center gap-2 font-bold text-xl"
          >
            <div className="rounded-lg bg-primary p-1.5">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            ShipIt
          </Link>

          <p className=" text-sm text-muted-foreground text-end max-w-sm">
            Your one-stop shop for quality products. Fast shipping, great prices,
            and excellent customer service.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} ShipIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

