'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingCart, User, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/shared/components/button';
import { Badge } from '@/shared/components/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/dropdown-menu';
import { useAuthStore } from '@/features/auth/store';
import { useCartStore } from '@/features/cart/store';
import { useLogout } from '@/features/auth/hooks';
import { useMounted } from '@/shared/hooks/use-mounted';
import { cn } from '@/shared/lib/utils';

const navLinks = [
    { href: '/products', label: 'Products', icon: Package },
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
];

export function Navbar() {
    const mounted = useMounted();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { isAuthenticated, user } = useAuthStore();
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const logout = useLogout();

    const cartItemCount = mounted ? getTotalItems() : 0;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">

                <Link
                    href="/products"
                    className="flex items-center gap-2 font-bold text-xl transition-colors hover:text-primary shrink-0"
                >
                    <div className="rounded-lg bg-primary p-1.5">
                        <Package className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="hidden sm:inline">ShipIt</span>
                </Link>
                
                <div className="flex items-center gap-2 shrink-0">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted/50',
                                    isActive ? 'text-primary bg-muted/50' : 'text-muted-foreground'
                                )}
                                title={link.label}
                            >
                                <link.icon className="h-5 w-5 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">{link.label}</span>
                                {link.href === '/cart' && cartItemCount > 0 && (
                                    <Badge
                                        variant="secondary"
                                        className="hidden sm:flex ml-1 h-5 w-5 p-0 items-center justify-center text-xs"
                                    >
                                        {cartItemCount}
                                    </Badge>
                                )}
                                {link.href === '/cart' && cartItemCount > 0 && (
                                    <span className="sm:hidden absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                                )}
                            </Link>
                        );
                    })}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="h-9 w-9"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {mounted && isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <User className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="px-2 py-1.5">
                                    <p className="text-sm font-medium">
                                        {user?.name.firstname} {user?.name.lastname}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : mounted ? (
                        <Button asChild variant="default" size="sm">
                            <Link href="/login">Login</Link>
                        </Button>
                    ) : null}
                </div>
            </nav>
        </header>
    );
}

