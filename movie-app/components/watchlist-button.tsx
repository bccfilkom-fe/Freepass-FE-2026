'use client';
import { Movie, WatchlistFormData } from "@/app/types/movie";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Check, Edit, Plus, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useWatchlistStore } from "@/lib/store";

interface WatchlistButtonProp {
    movie: Movie
}

export default function WatchlistButton({ movie }: WatchlistButtonProp) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'want-to-watch' | 'watching' | 'completed'>('want-to-watch');
    const [rating, setRating] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    const watchlist = useWatchlistStore((state) => state.watchlist);
    const addItem = useWatchlistStore((state) => state.addItem);
    const updateItem = useWatchlistStore((state) => state.updateItem);
    const removeItem = useWatchlistStore((state) => state.removeItem);

    // Check if this movie is in the global list
    const watchlistItem = watchlist.find((item) => item.movieId === movie.id);
    const isInList = !!watchlistItem; // if exist means true
    const [isSubmitting, setIsSubmitting] = useState(false); // Local loading for button action

    // checking if there is watchlist and 
    useEffect(() => {
        if (watchlistItem) {
            setStatus(watchlistItem.status);
            setRating(watchlistItem.rating?.toString() || '');
            setNotes(watchlistItem.notes || '');
        } else {
            // Reset if not in list
            setStatus('want-to-watch');
            setRating('');
            setNotes('');
        }
    }, [watchlistItem, isOpen]);

    const handleSave = async () => {
        setIsSubmitting(true);
        const formData: WatchlistFormData = {
            status,
            rating: rating ? parseFloat(rating) : undefined,
            notes: notes || undefined
        };

        try {
            if (isInList) {
                await updateItem(movie.id, formData);
            } else {
                await addItem(movie, formData);
            }
            setIsOpen(false);
        } catch (error) {
            console.error('Error saving to watchlist', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleRemove = async () => {
        setIsSubmitting(true);
        try {
            await removeItem(movie.id);
            setIsOpen(false);
        } catch (error) {
            console.error("Error removing from watchlist", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {isInList ? (
                    <Button variant="outline" className="gap-2">
                        <Check className="h-4 w-4" />
                        In Watchlist
                        <Edit className="h-3 w-3 ml-1" />
                    </Button>
                ) : (
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add to Watchlist
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isInList ? 'Edit Watchlist Item' : 'Add to Watchlist'}
                    </DialogTitle>
                    <DialogDescription>
                        {movie.title}
                    </DialogDescription>
                </DialogHeader>

                {/* status */}
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                            <SelectTrigger id="status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="want-to-watch">Want to Watch</SelectItem>
                                <SelectItem value="watching">Watching</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* rating */}
                    <div className="grid gap-2">
                        <Label htmlFor="rating">Your Rating (optional)</Label>
                        <Input
                            id="rating"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            placeholder="0.0 - 10.0"
                            value={rating}
                            onChange={(e) => {
                                let value = e.target.value;
                                if (parseFloat(value) > 10) value = '10';
                                if (parseFloat(value) < 0) value = '0';
                                setRating(value);
                            }}
                        />
                    </div>
                    {/* notes */}
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Textarea id="notes" placeholder="Add your thoughts..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    {isInList && (
                        <Button variant="destructive" onClick={handleRemove} className="w-full sm:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Remove'}
                        </Button>
                    )}
                    <Button onClick={handleSave} className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (isInList ? 'Update' : 'Add to Watchlist')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}