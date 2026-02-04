import { WatchlistItem } from "@/app/types/movie";


const globalForDb = global as unknown as { watchlistDB: WatchlistItem[] }; // assertion global node to database array

export const watchlistDB = globalForDb.watchlistDB || [];

if (process.env.NODE_ENV !== 'production') globalForDb.watchlistDB = watchlistDB;
