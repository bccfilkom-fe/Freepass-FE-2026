'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Package } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Label } from '@/shared/components/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/card';
import { loginSchema, type LoginCredentials } from '@/features/auth/schema';
import { useLogin } from '@/features/auth/hooks';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    login.mutate(data);
  };

  return (
    <div className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-8 duration-500">
      <Card className="border-none shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <Link
            href="/products"
            className="mx-auto flex items-center gap-2 font-bold text-2xl"
          >
            <div className="rounded-lg bg-primary p-2">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            ShipIt
          </Link>
          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register('username')}
                disabled={login.isPending}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  disabled={login.isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>


            <div className="rounded-lg bg-muted p-3 text-sm">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p className="text-muted-foreground">
                Username: <code className="text-foreground">mor_2314</code>
              </p>
              <p className="text-muted-foreground">
                Password: <code className="text-foreground">83r5^_</code>
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Continue shopping?
              <Link href="/products" className="text-primary hover:underline">
                Browse products
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

