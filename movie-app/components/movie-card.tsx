'use client';

import { Movie } from "@/app/types/movie";
import { getPosterUrl } from "@/lib/api";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Film, Star } from "lucide-react";
import { Badge } from "./ui/badge";



import FadeIn from "@/components/fade-in";

interface MovieCardProps {
    movie: Movie,
    priority?: boolean
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
    const posterUrl = getPosterUrl(movie.poster_path);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
    const rating = movie.vote_average.toFixed(1); // 1 angka di belakang koma

    return (
        <FadeIn className="h-full">
            <Link href={`/movie/${movie.id}`} className="block h-full transition-all duration-300 hover:!scale-105 hover:z-50">
                <Card className="overflow-visible transition-transform duration-300 cursor-pointer h-full group relative shadow-md hover:shadow-xl bg-transparent border-0">
                    <div className="relative aspect-2/3 bg-muted rounded-md overflow-hidden">
                        {movie.poster_path ? (
                            <Image src={posterUrl} alt={movie.title} fill className="object-cover" priority={priority} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <Film className="h-16 w-16" />
                            </div>
                        )}


                        {/* rating */}
                        <div className="absolute top-2 right-2">
                            <Badge className="bg-black/60 text-white backdrop-blur-sm flex items-center gap-1 text-xs border border-white/20">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {rating}
                            </Badge>
                        </div>

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white text-sm px-4 text-center line-clamp-3">
                                {movie.overview || 'No Overview Available'}
                            </p>
                        </div>
                    </div>

                    <CardContent className="p-0 ">
                        <h3 className="font-semibold text-sm line-clamp-1 text-foreground group-hover:text-primary transition-colors">
                            {movie.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {year}
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </FadeIn>
    )
}
