'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from 'react';
import { Movie } from "../types/movie";
import { discoverMovies, getGenre, searchMovie } from "@/lib/api";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MovieGrid from "@/components/movie-grid";
import { Button } from "@/components/ui/button";



export default function BrowsePage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const [selectedGenre, setSelectedGenres] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'popularity.desc' | 'vote_average.desc' | 'release_date.desc'>('popularity.desc');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        async function loadGenres() {
            try {
                const genreList = await getGenre();
                setGenres(genreList);
            } catch (error) {
                console.error('Error loading genres:', error);
            }
        }
        loadGenres();
    }, []);


    const loadMovies = useCallback(async (reset: boolean = false) => {
        setLoading(true);
        const currentPage = reset ? 1 : page;

        try {
            let response: any;

            if (query.trim()) {
                response = await searchMovie(query, currentPage);
            } else {
                const filters = {
                    genre: selectedGenre !== 'all' ? parseInt(selectedGenre) : undefined,
                    year: selectedYear !== 'all' ? parseInt(selectedYear) : undefined,
                    sortBy,
                    page: currentPage,
                };
                response = await discoverMovies(filters);
            }

            if (reset) {
                setMovies(response.results);
                setPage(1);
            } else {
                setMovies(prev => {
                    const uniqueMovies = response.results.filter((newMovie: Movie) => !prev.some(m => m.id === newMovie.id));
                    return [...prev, ...uniqueMovies];
                });
            }

            setHasMore(currentPage < response.total_pages)
        } catch (error) {
            console.error('Error loading movies: ', error);
        } finally {
            setLoading(false);
        }
    }, [query, selectedGenre, selectedYear, page, sortBy]);

    // Auto-fetch when filters change
    useEffect(() => {
        loadMovies(true);
    }, [selectedGenre, selectedYear, sortBy]);

    // search handles manual submission
    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault();
        loadMovies(true);
    }

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
        loadMovies(false);
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

    const sortOptions = [
        { value: 'popularity.desc', label: 'Most Popular' },
        { value: 'vote_average.desc', label: 'Highest Rated' },
        { value: 'release_date.desc', label: 'Latest Release' }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent inline-block">Browse Movies</h1>
                <p className="text-muted-foreground">
                    Search and discover your next favourite movie
                </p>
            </div>

            {/* Search and Filters Container */}
            <div className="space-y-6 mb-12">
                {/* Search bar */}
                <form onSubmit={handleSearch} className="relative w-full mx-auto sm:mx-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 text-lg h-14 rounded-full shadow-lg border-2 focus:border-red-500 transition-colors"
                    />
                </form>

                {/* Filters Grid - Improved Symmetry */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto sm:mx-0">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Genre</label>
                        <Select value={selectedGenre} onValueChange={setSelectedGenres}>
                            <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="All Genres" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="all">All Genres</SelectItem>
                                {genres.map((genre) => (
                                    <SelectItem key={genre.id} value={genre.id.toString()}>
                                        {genre.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Year</label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="All Years" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="all">All Years</SelectItem>
                                {years.slice(0, 50).map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Sort By</label>
                        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                            <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* results */}
            {loading && movies.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    <MovieGrid movies={movies} />

                    {hasMore && movies.length > 0 && (
                        <div className="flex justify-center mt-8">
                            <Button size='lg' disabled={loading} onClick={handleLoadMore}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    'Load More'
                                )}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}