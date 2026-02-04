'use client';

import { Play } from "lucide-react";
import { Button } from "./ui/button";
import TrailerModal from "./trailer-modal";
import { getMovieVideos } from "@/lib/api";
import { useState } from "react";



interface PlayTrailerButtonProps {
    movieId: number;
    title?: string;
}

export default function PlayTrailerButton({ movieId, title }: PlayTrailerButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [loadingTrailer, setLoadingTrailer] = useState(false);

    const handlePlayTrailer = async () => {
        setLoadingTrailer(true);
        try {
            const videos = await getMovieVideos(movieId);
            const youtubeVideos = videos.filter(v => v.site === "YouTube");
            const trailer = youtubeVideos.find(v => v.type === "Trailer" && v.name.includes("Official")) ||
                youtubeVideos.find(v => v.type === "Trailer") || youtubeVideos.find(v => v.type === "Teaser");
            if (trailer) {
                setTrailerKey(trailer.key);
                setIsModalOpen(true)
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        } finally {
            setLoadingTrailer(false);
        }
    }

    return (
        <>
            <Button onClick={handlePlayTrailer} disabled={loadingTrailer} size="lg" className="gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-full px-8">
                {loadingTrailer ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Play className="fill-white w-5 h-5" />
                )}
            </Button>

            <TrailerModal videoId={trailerKey} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}