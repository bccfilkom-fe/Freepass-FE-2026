'use client'
import { useState, useEffect } from 'react';
import { useWatchlistStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import WatchlistItemCard from '@/components/watchlist-item-card';
import { Loader2 } from 'lucide-react';

type FilterStatus = 'all' | 'want-to-watch' | 'watching' | 'completed';

export default function WatchlistPage() {
    // 🐻 Zustand: Select state and actions
    const watchlist = useWatchlistStore(state => state.watchlist);
    const isLoading = useWatchlistStore(state => state.isLoading);
    const loadWatchlist = useWatchlistStore(state => state.loadWatchlist);
    const [filter, setFilter] = useState<FilterStatus>('all');

    // Load data on mount
    useEffect(() => {
        loadWatchlist();
    }, [loadWatchlist])

    // Derive stats directly from the store's watchlist
    const stats = {
        total: watchlist.length,
        wantToWatch: watchlist.filter(movie => movie.status === 'want-to-watch').length,
        watching: watchlist.filter(movie => movie.status === 'watching').length,
        completed: watchlist.filter(movie => movie.status === 'completed').length
    };

    const filteredWatchlist = filter === 'all' ? watchlist : watchlist.filter(item => item.status === filter);
    const sortedWatchlist = [...filteredWatchlist].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());

    if (isLoading && watchlist.length === 0) { // Only show full loader if empty
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className='container mx-auto px-4 py-12'>
            {/* header */}
            <div className='mb-8'>
                <span className='text-4xl font-bold mb-2 bg-linear-to-r from-red-700 to-pink-500 text-transparent bg-clip-text'>My Watchlist</span>
                <p className='text-muted-foreground'>
                    {stats.total} {stats.total === 1 ? 'movie' : 'movies'} in your collection
                </p>
            </div>

            <div className='flex flex-wrap gap-2 mb-8'>
                <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')} className='gap-2'>
                    All
                    <Badge variant="secondary" className='ml-1'>
                        {stats.total}
                    </Badge>
                </Button>

                <Button variant={filter === 'want-to-watch' ? 'default' : 'outline'} onClick={() => setFilter('want-to-watch')} className='gap-2'>
                    Want to Watch
                    <Badge variant="secondary" className='ml-1'>
                        {stats.wantToWatch}
                    </Badge>
                </Button>

                <Button variant={filter === "watching" ? 'default' : 'outline'} onClick={() => setFilter('watching')} className='gap-2'>
                    Watching
                    <Badge variant="secondary" className='ml-1'>
                        {stats.watching}
                    </Badge>
                </Button>

                <Button variant={filter === "completed" ? 'default' : 'outline'} onClick={() => setFilter('completed')} className='ml-1'>
                    Completed
                    <Badge variant="secondary" className='ml-1'>
                        {stats.completed}
                    </Badge>
                </Button>
            </div>

            {/* watchlist grid */}
            {sortedWatchlist.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-muted-foreground text-lg mb-4'>
                        {filter === 'all'
                            ? 'Your watchlist is empty. Start adding movies!'
                            : `No Movies in "${filter.replace('-', ' ')}" status.`}
                    </p>
                    <Button asChild>
                        <Link href='/'>Browse Movies</Link>
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {sortedWatchlist.map((item) => (
                        <WatchlistItemCard key={item.movieId} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
} 