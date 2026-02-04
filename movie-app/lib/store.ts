import { Movie, WatchlistFormData, WatchlistItem } from "@/app/types/movie";
import { create } from "zustand";
import { addWatchlist, deleteWatchlist, fetchWatchlist, updateWatchList } from "./watchlist-client";


interface WatchlistState {
    watchlist: WatchlistItem[];
    isLoading: boolean;
    loadWatchlist: () => Promise<void>;
    addItem: (movie: Movie, data: WatchlistFormData) => Promise<void>;
    removeItem: (movieId: number) => Promise<void>;
    updateItem: (movieId: number, data: WatchlistFormData) => Promise<void>;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
    watchlist: [],
    isLoading: false,

    loadWatchlist: async () => {
        set({ isLoading: true });
        try {
            const items = await fetchWatchlist();
            set({ watchlist: items });
        } catch (error) {
            console.error('Failed to load watchlist', error);
        } finally {
            set({ isLoading: false })
        }
    },

    addItem: async (movie, data) => {
        await addWatchlist(movie, data);
        get().loadWatchlist(); // refresh the list auto
    },

    removeItem: async (movieId) => {
        await deleteWatchlist(movieId);
        get().loadWatchlist();
    },

    updateItem: async (movieId, data) => {
        await updateWatchList(movieId, data);
        get().loadWatchlist();
    }
}));