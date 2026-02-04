import PlayTrailerButton from "@/components/play-trailer-button";
import { Badge } from "@/components/ui/badge";
import WatchlistButton from "@/components/watchlist-button";
import { getBackdropUrl, getMovieCredits, getMovieDetails, getPosterUrl } from "@/lib/api";
import { Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";


interface MovieDetailProps {
    params: Promise<{
        id: string
    }>
}

export default async function MovieDetailPage({ params }: MovieDetailProps) {
    const { id } = await params;
    const movieId = parseInt(id);

    if (isNaN(movieId)) {
        notFound()
    }

    // Next.js will automatically catch errors and show error.tsx if this fails
    const [movie, credits] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
    ]);

    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const posterUrl = getPosterUrl(movie.poster_path);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
    const rating = movie.vote_average.toFixed(1);
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

    const maincast = credits.cast.slice(0, 10);

    return (
        <div className="min-h-screen">
            {/* hero section w backrop */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                {/* backdrop */}
                {movie.backdrop_path ? (
                    <Image src={backdropUrl} alt={movie.title} fill className="object-cover" priority quality={90} />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-gray-800" />
                )}

                <div className="absolute inset-0 flex justify-center items-center z-20">
                    <PlayTrailerButton movieId={movie.id} title={movie.title} />
                </div>

                {/* gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
            </div>

            {/* content */}
            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="shrink-0">
                        <div className="relative w-[200px] sm:w-[250px] md:w-[300px] aspect-2/3 rounded-lg overflow-hidden shadow-2xl">
                            {movie.poster_path ? (
                                <Image src={posterUrl} alt={movie.title} fill priority className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <span>No Poster</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* movies info */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-lg text-muted-foreground font-bold mb-2">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-lg text-muted-foreground italic">
                                    &quot;{movie.tagline}&quot;
                                </p>
                            )}
                        </div>

                        {/* meta info aka meta data */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg font-bold">{rating}</span>
                                <span className="text-muted-foreground">/ 10</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-muted-foreground " />
                                <span>{year}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{runtime}</span>
                            </div>
                        </div>

                        {/* genre movie */}
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <Badge key={genre.id} variant="secondary">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>

                        {/* watchlist button */}
                        <WatchlistButton movie={movie} />

                        {/* Overview */}
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div>
                                <h3 className="font-semibold mb-1">Status</h3>
                                <p className="text-muted-foreground">{movie.status}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-1">Original Language</h3>
                                <p className="text-muted-foreground">{movie.original_language}</p>
                            </div>

                        </div>
                    </div>
                </div>

                {maincast.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {maincast.map((cast) => (
                                <div key={cast.cast_id} className="text-center">
                                    <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-muted mb-2">
                                        {cast.profile_path ? (
                                            <Image src={getPosterUrl(cast.profile_path)} alt={cast.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <span className="text-4xl">Cast</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-sm">{cast.name}</h3>
                                    <p className="text-xs text-muted-foreground">{cast.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* production company */}
                {movie.production_companies.length > 0 && (
                    <div className="mt-12 mb-12">
                        <h2 className="text-2xl font-bold mb-6">Production Companies</h2>
                        <div className="flex flex-wrap gap-6">
                            {movie.production_companies.map((company) => (
                                <div key={company.id} className="text-center">
                                    {company.logo_path ? (
                                        <div className="relative w-24 h-24 mb-2 bg-white rounded-lg p-2">
                                            <Image src={getPosterUrl(company.logo_path)} alt={company.name} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 mb-2 bg-muted rounded-lg flex items-center justify-center">
                                            <span className="text-sm">{company.name}</span>
                                        </div>
                                    )}
                                    <p className="text-xs text-muted-foreground max-w-[100px]">
                                        {company.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}