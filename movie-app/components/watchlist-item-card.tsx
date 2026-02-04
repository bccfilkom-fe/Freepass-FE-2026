import { WatchlistItem } from "@/app/types/movie";
import { getPosterUrl } from "@/lib/api";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Calendar, Star } from "lucide-react";
import WatchlistButton from "./watchlist-button";


interface WatchlistItemCardProps {
    item: WatchlistItem
}


const statusColors = {
    'want-to-watch': 'bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold',
    'watching': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 font-bold',
    'completed': 'bg-green-500/10 text-green-500 border-green-500/20 font-bold'
}

const statusLabels = {
    'want-to-watch': 'Want to Watch',
    'watching': 'Watching',
    'completed': 'Completed'
}

export default function WatchlistItemCard({ item }: WatchlistItemCardProps) {
    const { status, rating, notes, addedAt } = item;
    const movie = item;

    const posterUrl = getPosterUrl(movie.poster_path);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
    const addedDate = new Date(addedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/movie/${movie.movieId}`}>
                <div className="relative aspect-2/3 bg-muted cursor-pointer group">
                    {movie.poster_path ? (
                        <Image src={posterUrl} alt={movie.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <span>No Poster</span>
                        </div>
                    )}

                    <div className="absolute top-2 left-2 z-10">
                        <Badge className={`${statusColors[status]} backdrop-blur-sm`}>
                            {statusLabels[status]}
                        </Badge>
                    </div>

                    <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-black/70 text-white backdrop-blur-sm flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {movie.vote_average.toFixed(1)}
                        </Badge>
                    </div>
                </div>
            </Link>

            <CardContent className="p-4 space-y-3">
                <Link href={`/movie/${movie.movieId}`}>
                    <h3 className="font-semibold text-lg line-clamp-1 hover:text-red-500 transition-colors cursor-pointer">
                        {movie.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{year}</span>
                </div>

                {rating && (
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm text-muted-foreground">
                            Your Rating:
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-white">{rating.toFixed(1)}</span>
                        </div>
                    </div>
                )}

                {notes && (
                    <p className="text-sm text-muted-foreground line-clamp-2 pl-2">
                        &quot;{notes}&quot;
                    </p>
                )}

                <p className="text-xs text-muted-foreground pt-2">
                    Added {addedDate}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="w-full">
                    <WatchlistButton movie={{ ...movie, id: movie.movieId }} />
                </div>
            </CardFooter>
        </Card>
    )
}
