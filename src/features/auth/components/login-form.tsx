'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Label } from '@/shared/components/label';
import { CardContent, CardFooter } from '@/shared/components/card';
import { loginSchema, type LoginCredentials } from '@/features/auth/schema';
import { useLogin } from '@/features/auth/hooks';

export function LoginForm() {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4">
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
            </CardContent>

            <CardFooter className="flex flex-col p-3">
                <p className="text-sm text-muted-foreground text-center">
                    Continue shopping?{' '}
                    <Link href="/products" className="text-primary hover:underline">
                        Browse products
                    </Link>
                </p>
            </CardFooter>
        </form>
    );
}
