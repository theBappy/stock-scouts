
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Star } from "lucide-react";

import { addToWatchlist, removeFromWatchlist } from "@/lib/actions/watch-list-action";

interface WatchlistButtonProps {
  symbol: string;
  userId: string;
  isWatched: boolean;
}

const WatchlistButton = ({ symbol, userId, isWatched }: WatchlistButtonProps) => {
  const [isWatchlisted, setIsWatchlisted] = useState(isWatched);

  const handleClick = async () => {
    if (isWatchlisted) {
      try {
        await removeFromWatchlist(symbol, userId);
        setIsWatchlisted(false);
        toast.success(`${symbol} removed from watchlist`);
      } catch (error) {
        toast.error("Failed to remove from watchlist");
      }
    } else {
      try {
        await addToWatchlist(symbol, userId);
        setIsWatchlisted(true);
        toast.success(`${symbol} added to watchlist`);
      } catch (error) {
        toast.error("Failed to add to watchlist");
      }
    }
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-2">
      <Star fill={isWatchlisted ? "#FACC15" : "none"} stroke="#FACC15" />
      <span>{isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}</span>
    </button>
  );
};

export default WatchlistButton;
