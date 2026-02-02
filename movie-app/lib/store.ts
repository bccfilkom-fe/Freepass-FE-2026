// watchlist

import { Movie, Watchlist, WatchlistFormData } from "@/app/types/movie";

const WATCHLIST_KEY = 'movieapp_watchlist';

// check client side
const isClient = typeof window !== 'undefined';

export function getWatchList(): Watchlist[] {
    if (!isClient) return [];

    try {
        const data = localStorage.getItem(WATCHLIST_KEY);
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error(`Error reading watchlist: ${error}`);
        return [];
    }
};

function saveWatchList(watchlist: Watchlist[]): void {
    if (!isClient) return;

    try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch (error) {
        console.error(`Error saving watchlist: ${error}`);
    }
};


// mengecek apakah ada item di watchlist
export function isInWatchList(movieId: number): boolean {
    const watchList = getWatchList();
    return watchList.some(item => item.movieId === movieId);
}

export function getWatchListItem(movieId: number): Watchlist | null {
    const watchList = getWatchList();
    return watchList.find(item => item.movieId === movieId) || null;
}

export function addToWatchList(movie: Movie, formData: WatchlistFormData): Watchlist {
    const watchList = getWatchList();

    if (watchList.some(item => item.movieId === movie.id)) {
        throw new Error('Movie already in watchlist!');
    }

    const newItem: Watchlist = {
        movieId: movie.id,
        movie,
        status: formData.status,
        rating: formData.rating,
        notes: formData.notes,
        addedAt: new Date().toISOString(),
    }

    const updatedWatchList = [...watchList, newItem];
    saveWatchList(updatedWatchList);

    return newItem;
}

// update watchlist dengan form yang opsional
export function updatedWatchListItem(movieId: number, updates: Partial<WatchlistFormData>): Watchlist {
    const watchList = getWatchList();
    const index = watchList.findIndex(item => item.movieId === movieId);

    if (index === -1) {
        throw new Error('Movie not found in watchlist');
    }

    const updatedItem = {
        ...watchList[index],
        ...updates,
    };

    const updatedWatchList = [...watchList];
    updatedWatchList[index] = updatedItem;

    saveWatchList(updatedWatchList);
    return updatedItem;
}

export function removeWatchList(movieId: number): void {
    const watchList = getWatchList();
    const updatedWatchList = watchList.filter(item => item.movieId !== movieId);
    saveWatchList(updatedWatchList);
}

export function getWatchListByStatus(status?: Watchlist['status']): Watchlist[] {
    const watchList = getWatchList();
    if (!status) return watchList;

    return watchList.filter(item => item.status === status);
}

export function getWatchListStats() {
    const watchList = getWatchList();

    return {
        total: watchList.length,
        wantToWatch: watchList.filter(item => item.status === 'want-to-watch').length,
        watching: watchList.filter(item => item.status === "watching").length,
        completed: watchList.filter(item => item.status === 'completed').length
    }
}

