import Link from "next/link";
import { CuriousBuddies, CharacterColors } from "@/shared/components/curious-buddies";
import { Button } from "@/shared/components/button";
import { Home } from "lucide-react";

const buddyColors: CharacterColors = {
    alto: "var(--buddy-alto)",
    shade: "var(--buddy-shade)",
    peach: "var(--buddy-peach)",
    sunny: "var(--buddy-sunny)",
    pupil: "var(--buddy-pupil)",
    eye: "var(--buddy-eye)",
};

export default function NotFound() {
    return (
        <main className="relative flex h-screen justify-center items-center flex-col overflow-hidden">
            <div className="flex z-10 flex-col items-center text-center px-4">
                <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-foreground/5 select-none dark:[text-shadow:0_0_80px_var(--foreground)]">
                    404
                </h1>

                <div className="relative -mt-20 space-y-2">
                    <h1 className="text-2xl md:text-5xl gap-1 md:h-16 justify-center font-bold text-foreground">
                        Hey Stranger, you seem lost...
                    </h1>
                    <p className="text-primary justify-center text-base md:text-lg max-w-md mx-auto">
                        The page you&apos;re looking for has vanished into the void. Even our buddies can&apos;t find it.
                    </p>
                    <div className="pt-6">
                        <Button size="lg" asChild>
                            <Link href="/products" aria-label="Navigate to home page">
                                <Home aria-hidden="true" />
                                Take me home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Curious Buddies - They're looking around confused */}
            <div className="absolute bottom-0 group left-0 overflow-hidden" aria-hidden="true">
                <CuriousBuddies
                    colors={buddyColors}
                    className="transition-transform duration-500 group-hover:translate-y-60"
                />
            </div>
        </main>
    );
}
