'use client';

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface TrailerModalProps {
    videoId: string | null;
    isOpen: boolean;
    onClose: () => void;
}


export default function TrailerModal({ videoId, isOpen, onClose }: TrailerModalProps) {
    if (!videoId) return;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px] p-0 bg-black border-white/10 overflow-hidden">
                <div className="sr-only">
                    <DialogTitle>Movie Trailer</DialogTitle>
                </div>

                <div className="relative aspect-video w-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}