
import Image from "next/image";
import Link from "next/link";
import { Bungee } from "next/font/google";

const bunge = Bungee({
    weight: '400',
    subsets: ['latin']
})
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t mt-12">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href="/" className="flex items-center hover:opacity-75 transition-opacity ">
                        <Image src="/logoloop.png" alt="logoloop" width={60} height={60} />
                        <span className={`text-xl font-bold bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent ${bunge.className}`}>LOOPFLIX</span>
                    </Link>

                    <div className="text-sm text-muted-foreground">
                        © {currentYear} Loopflix, Data provided by &nbsp;
                        <Link href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            TMDB.
                        </Link>
                    </div>
                    <br />
                </div>
                <div className="flex flex-col items-center justify-center mt-10 max-w-2xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        LOOPFLIX is a movie application that allows users to browse trailers, check ratings, and save titles to a personal watchlist. Our philosophy is built on the word &quot;Loop,&quot; representing infinity, and &quot;Flix,&quot; a nod to the cinematic world Together, they signify our passion for watching movies infinitely.Special thanks to TMDB and YouTube for providing the data and trailers that make this platform possible. <br/>- from Jason Enkristo
                    </p>
                </div>
            </div>
        </footer>
    )
}