import { Movie } from "@/app/types/movie";
import MovieCard from "./movie-card";


interface MovieGridProps {
    movies: Movie[];
    title?: string;
}

export default function MovieGrid({movies, title}: MovieGridProps) {
    if (movies.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No Movies Found</p>
            </div>
        )
    } 

    return (
        <section className="space-y-4">
            {title && <h2 className="text-2xl font-bold">{title}</h2>}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </section>
    )
}