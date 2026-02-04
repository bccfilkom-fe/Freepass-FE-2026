'use client';
import { Bungee } from "next/font/google";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const bunge = Bungee({
    weight: '400',
    subsets: ['latin']
})
export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // handle input and encode component agar url aman
    const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    }

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 py-1">
                <div className="flex h-16 items-center justify-between ">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity ">
                        <Image src="/logoloop.png" alt="logoloop" width={60} height={60} />
                        <span className={`text-xl font-bold bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent ${bunge.className}`}>LOOPFLIX</span>
                    </Link>

                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="text" placeholder="Search movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full" />
                        </div>
                    </form>

                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon-lg">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full h-[40vh]">
                                <SheetTitle className="hidden">Nav Menu</SheetTitle>
                                <div className="mt-5 pb-5 border-b-2">
                                    <Link href="/" className="flex items-center justify-center">
                                        <Image src="/logoloop.png" alt="logoloop" width={60} height={60} />
                                        <span className={`text-xl font-bold bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent ${bunge.className}`}>LOOPFLIX</span>
                                    </Link>
                                </div>
                                <nav className="flex flex-col items-center gap-5 mt-10">
                                    <Link href="/">
                                        <Button variant={isActive("/") ? "default" : "ghost"}>
                                            Home
                                        </Button>
                                    </Link>
                                    <Link href="/browse">
                                        <Button variant={isActive("/browse") ? "default" : "ghost"}>
                                            Browse
                                        </Button>
                                    </Link>
                                    <Link href="/watchlist">
                                        <Button variant={isActive("/watchlist") ? "default" : "ghost"}>
                                            Watchlist
                                        </Button>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* navbar */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/">
                            <Button variant={isActive("/") ? "default" : "ghost"}>
                                Home
                            </Button>
                        </Link>
                        <Link href="/browse">
                            <Button variant={isActive("/browse") ? "default" : "ghost"}>
                                Browse
                            </Button>
                        </Link>
                        <Link href="/watchlist">
                            <Button variant={isActive("/watchlist") ? "default" : "ghost"}>
                                Watchlist
                            </Button>
                        </Link>
                    </div>
                </div>



                <form onSubmit={handleSearch} className="md:hidden pb-4 ">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Search movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full" />
                    </div>
                </form>
            </div>
        </nav>
    )
}