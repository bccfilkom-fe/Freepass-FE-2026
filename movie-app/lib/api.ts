import { Cast, Movie, MovieDetail, TMDBesponse, Video } from "@/app/types/movie";


const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

if (!API_KEY) {
    throw new Error("API key is undefined");
}


// url endpoint
const buildUrl = (endpoint: string, params: Record<string, string> = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append(`api_key`, API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });


    return url.toString();
};


// fetch with cache revalidate per 1 hour
async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    try {
        const url = buildUrl(endpoint, params);
        const response = await fetch(url, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from TMDB:`, error);
        throw error;
    }
}

export const getImageUrl = (path: string | null, size: 'w500' | 'w-780' | 'original' = 'w500') => {
    if (!path) return '/placephoto.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
}

export const getPosterUrl = (path: string | null) => getImageUrl(path, "w500");
export const getBackdropUrl = (path: string | null) => getImageUrl(path, "original");

// trending movies
export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
    const data = await fetchFromTMDB<TMDBesponse<Movie>>(`/trending/movie/${timeWindow}`);
    return data.results;
}

// popular movie
export async function getPopularMovies(page: number = 1): Promise<TMDBesponse<Movie>> {
    const data = await fetchFromTMDB<TMDBesponse<Movie>>(`/movie/popular`, { page: page.toString() });
    return data;
}

// top rated movie
export async function getTopRatedMovies(page: number = 1): Promise<TMDBesponse<Movie>> {
    const data = await fetchFromTMDB<TMDBesponse<Movie>>(`/movie/top_rated`, { page: page.toString() });
    return data;
}

// now playing
export async function getNowPlayingMovies(page: number = 1): Promise<TMDBesponse<Movie>> {
    const data = await fetchFromTMDB<TMDBesponse<Movie>>(`/movie/now_playing`, { page: page.toString() });
    return data;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
    const data = await fetchFromTMDB<MovieDetail>(`/movie/${movieId}`);
    return data;
}

export async function getMovieVideos(movieId: number): Promise<Video[]> {
    const data = await fetchFromTMDB<{results: Video[]}>(`/movie/${movieId}/videos`);
    return data.results;
}

export async function getMovieCredits(movieId: number): Promise<{ cast: Cast[] }> {
    const data = await fetchFromTMDB<{ cast: Cast[] }>(`/movie/${movieId}/credits`);
    return data;
}

export async function searchMovie(query: string, page: number = 1): Promise<TMDBesponse<Movie>> {
    const data = await fetchFromTMDB<TMDBesponse<Movie>>(`/search/movie`, {
        query,
        page: page.toString()
    });
    return data;
}

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBesponse<Movie>> {
    const data = await fetchFromTMDB<TMDBesponse<Movie>>(`/discover/movie`, {
        with_genres: genreId.toString(),
        page: page.toString(),
    });
    return data;
}

export async function getGenre(): Promise<{ id: number, name: string }[]> {
    const data = await fetchFromTMDB<{ genres: { id: number; name: string; }[] }>(`/genre/movie/list`);
    return data.genres;
}

export interface DiscoverFilters {
    genre?: number;
    year?: number;
    sortBy?: 'popularity.desc' | 'vote_average.desc' | 'release_date.desc';
    page?: number;
}

export async function discoverMovies(filters: DiscoverFilters = {}): Promise<TMDBesponse<Movie>> {
    const params: Record<string, string> = {
        page: (filters.page || 1).toString(),
        sort_by: filters.sortBy || 'popularity.desc',
    };

    if (filters.genre) {
        params.with_genres = filters.genre.toString();
    }

    if (filters.year) {
        params.primary_release_year = filters.year.toString();
    }

    return fetchFromTMDB<TMDBesponse<Movie>>(`/discover/movie`, params);
};





