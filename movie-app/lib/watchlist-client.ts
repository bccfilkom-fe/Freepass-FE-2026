import { Movie, WatchlistFormData, WatchlistItem } from "@/app/types/movie";



const API_URL = `/api/watchlist`;

// get
export async function fetchWatchlist(): Promise<WatchlistItem[]> {
    const res = await fetch(API_URL);
    const data = res.json();

    if (!res.ok) throw new Error('Failed to fetch watchlist');
    return data;
}

// post
export async function addWatchlist(movie: Movie, formData: WatchlistFormData) {
    const payload = { ...movie, ...formData, movieId: movie.id};

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Failed to add to watchlist');
    return res.json();
}

// put
export async function updateWatchList(movieId: number, formData: WatchlistFormData) {
    const res = await fetch(`${API_URL}/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if (!res.ok) throw new Error('Failed to update the watchlist')
    return res.json();
}

export async function deleteWatchlist(movieId: number) {
    const res = await fetch(`${API_URL}/${movieId}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete the watchlist');
    return res.json();
}