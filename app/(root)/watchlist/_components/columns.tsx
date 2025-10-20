import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeFromWatchlist } from "@/lib/actions/watch-list-action";
import TradingViewWidget from "@/app/(root)/stocks/_components/trading-view-widget";

export type Watchlist = {
  symbol: string;
  name: string;
};

export const columns: ColumnDef<Watchlist>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const watchlist = row.original;

      const handleRemove = async () => {
        try {
          await removeFromWatchlist(watchlist.symbol);
          toast.success(`${watchlist.symbol} removed from watchlist`);
        } catch (error) {
          toast.error("Failed to remove from watchlist");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleRemove}>Remove</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(watchlist.symbol)}
            >
              Copy symbol
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "widget",
    header: "Chart",
    cell: ({ row }) => {
      const watchlist = row.original;
      return <TradingViewWidget symbol={watchlist.symbol} />;
    },
  },
];
