import { WatchlistItem } from "@/app/types/movie";
import { NextResponse } from "next/server";
import { watchlistDB } from "@/lib/db";

export async function GET() {
    return NextResponse.json(watchlistDB);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const exist = watchlistDB.find((item) => item.movieId === body.movieId);
        if (exist) {
            return NextResponse.json(
                { message: 'Movie is already in your watchlist' },
                { status: 400 }
            );
        }

        const newItem: WatchlistItem = {
            ...body,
            addedAt: new Date().toISOString(),
        };

        watchlistDB.push(newItem);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error adding to watchlist', error },
            { status: 500 }
        );
    }
}