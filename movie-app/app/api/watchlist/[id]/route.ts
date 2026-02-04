import { watchlistDB } from "@/lib/db";
import { NextResponse } from "next/server";


interface Params {
    params: Promise<{
        id: string;
    }>
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { id } = await params; 
        const body = await request.json();
        const movieId = parseInt(id); // parsing the url to int

        const index = watchlistDB.findIndex(item => item.movieId === movieId);

        if (index === -1) {
            return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
        }

        watchlistDB[index] = {
            ...watchlistDB[index],
            ...body // just update the user change
        };
        return NextResponse.json(watchlistDB[index]);
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Error Updating'
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const { id } = await params;
        const movieId = parseInt(id);

        const index = watchlistDB.findIndex(item => item.movieId === movieId);

        if (index === -1) {
            return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
        }

        watchlistDB.splice(index, 1);
        return NextResponse.json({ message: 'Deleted Successfully' });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error deleting' },
            { status: 500 },
        )
    }
}