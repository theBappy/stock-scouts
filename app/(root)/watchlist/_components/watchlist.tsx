"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns, Watchlist as WatchlistType } from "./columns";
import { DataTable } from "./data-table";

const Watchlist = ({ watchlist }: { watchlist: string }) => {
  const data = JSON.parse(watchlist) as WatchlistType[];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <DataTable table={table} columns={columns} />
      </div>
      <div className="lg:col-span-1">
        <div className="bg-secondary p-5 rounded-lg">
          <h2 className="text-xl font-bold mb-5">Highest Month</h2>
          {/* Placeholder for highest month company */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">AAPL</p>
              <p>Apple Inc.</p>
            </div>
            <div>
              <p className="text-green-500 font-bold">+10%</p>
            </div>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg mt-5 w-full">
            Create Alert
          </button>
        </div>
        <div className="bg-secondary p-5 rounded-lg mt-5">
          <h2 className="text-xl font-bold mb-5">Company News</h2>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
