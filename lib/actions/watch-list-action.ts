
"use server";

import { revalidatePath } from "next/cache";

import { Watchlist } from "@/database/models/watch-list-model";
import { connectToDatabase } from "@/database/mongoose";
import { IWatchlist } from "@/app/types";

export const addToWatchlist = async (symbol: string, userId: string) => {
  try {
    await connectToDatabase();
    const newWatchlistItem = new Watchlist({ symbol, userId });
    await newWatchlistItem.save();
    revalidatePath("/watchlist");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add to watchlist");
  }
};

export const removeFromWatchlist = async (symbol: string, userId: string) => {
  try {
    await connectToDatabase();
    await Watchlist.findOneAndDelete({ symbol, userId });
    revalidatePath("/watchlist");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove from watchlist");
  }
};

export const getUserWatchlist = async (userId: string): Promise<IWatchlist[]> => {
  try {
    await connectToDatabase();
    const watchlist = await Watchlist.find({ userId });
    return watchlist;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch watchlist");
  }
};

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}
