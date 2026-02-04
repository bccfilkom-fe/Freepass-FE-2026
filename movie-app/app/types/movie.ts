export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    genre_ids: number[];
    original_language: string;
    video: boolean;
}

export interface MovieDetail extends Movie {
    runtime: number;
    genres: Genre[];
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    homepage: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Cast {
    id: number;
    cast_id: number;
    character: string;
    credit_id: string;
    name: string;
    order: number;
    profile_path: string | null;
}

export interface TMDBesponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

type Status = 'want-to-watch' | 'watching' | 'completed';

export interface WatchlistItem extends Movie {
    movieId: number;
    status: Status;
    rating?: number;
    notes?: string;
    addedAt: string;
}

export interface WatchlistFormData {
    status: Status;
    rating?: number;
    notes?: string;
}

export interface Video {
    id: string;
    key: string; // yt
    name: string;
    site: string; // link
    size: number;
    type: string;
    official: string;
    published_at: string;
}