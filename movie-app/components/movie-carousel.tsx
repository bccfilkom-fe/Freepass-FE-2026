'use client';

import { Movie } from "@/app/types/movie";
import { useRef } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./movie-card";

interface MovieCarouselProp {
    movies: Movie[];
    title?: string;
}

export default function MovieCarousel({ movies, title }: MovieCarouselProp) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 500;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const targetScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth',
            });
        }
    };

    if (movies.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4 relative ">
            <h2 className="text-2xl font-bold">{title}</h2>

            <div className="relative ">
                {/* scroll button */}
                <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full rounded-none bg-linear-to-r from-background to-transparent opacity-100 transition-opacity" onClick={() => scroll('left')}>
                    <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full rounded-none bg-liner-to-l from-background to-transparent opacity-100 transition-opacity" onClick={() => scroll('right')}>
                    <ChevronRight className="w-8 h8"  />
                </Button>

                {/* Scroll container */}
                <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {movies.map((movie, index) => (
                        <div key={movie.id} className="flex-none w-[150px] sm:w-[180px] md:w-[200px]">
                            <MovieCard movie={movie} priority={index < 6} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}