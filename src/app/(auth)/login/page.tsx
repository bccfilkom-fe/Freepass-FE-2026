'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/shared/components/card';
import { LoginForm } from '@/features/auth/components/login-form';
import Logo from '@/shared/components/logo';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-8 duration-500">
      <Card className="border-none shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <Link
            href="/products"
            className="mx-auto flex items-center gap-2 font-bold text-2xl"
          >
            <Logo className="size-10 text-primary" />
            ShipIt
          </Link>
          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>

        <LoginForm />
      </Card>
    </div>
  );
}


