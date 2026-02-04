'use client';

import { Movie } from "@/app/types/movie";
import { getBackdropUrl } from "@/lib/api";
import { Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface HeroSectionProps {
    movie: Movie;
    trailerKey: string | null;
}

export default function HeroSection({ movie, trailerKey }: HeroSectionProps) {
    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
    const rating = movie.vote_average.toFixed(1);

    return (
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
            {/* Backdrop url */}
            {trailerKey ? (
                <div className="absolute inset-0 w-full h-full scale-125 pointer-events-none">
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&modestbranding=1&playlist=${trailerKey}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="object-cover w-full h-full opacity-65" />
                </div>
            ) : movie.backdrop_path ? (
                <Image src={backdropUrl} alt={movie.title} fill className="object-cover" priority quality={90} />
            ) : (
                <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-gray-800" />
            )}


            {/* gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />

            <div className="relative h-full container mx-auto px-4 flex items-center z-20">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                        {movie.title}
                    </h1>

                    {/* meta info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{rating}</span>
                        </div>
                        <span>•</span>
                        <span>{year}</span>
                    </div>

                    {/* Overview */}
                    <p className="text-base sm:text-lg text-gray-300 line-clamp-3 max-w-xl">
                        {movie.overview}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href={`movie/${movie.id}`}>
                            <Button size="lg" className="gap-2 cursor-pointer">
                                <Play className="w-5 h-5" />
                                View Details
                            </Button>
                        </Link>


                        <Button className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 " size="lg" variant="outline" >
                            <Plus className="w-5 h-5" />
                            Add to Watchlist
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
} 