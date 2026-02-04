"use client";

import { useState } from "react";
import { useTransactions } from "@/src/features/transactions/hooks/useTransactions";

export default function HistoryTransaction() {
  const { transactionsQuery } = useTransactions();
  const [search, setSearch] = useState("");

  if (transactionsQuery.isLoading) return null;
  if (transactionsQuery.error) return null;

  const filteredTransactions = transactionsQuery.data?.filter((tx) =>
    tx.category.toLowerCase().includes(search.toLowerCase()) ||
    tx.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-white text-lg font-semibold">
          Recent Transaction
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-64
            p-2.5
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
          "
        />
      </div>

      <div className="space-y-3">
        {filteredTransactions?.map((tx) => (
          <div
            key={tx.id}
            className="
              glass
              rounded-2xl
              p-4
              flex
              justify-between
              items-center
              transition
              hover:bg-white/10
              hover:scale-[1.01]
            "
          >
            <div>
              <p className="font-medium">{tx.category}</p>
              <p className="text-sm text-gray-400">{tx.date}</p>
            </div>

            <p
              className={`font-semibold text-lg ${
                tx.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"} Rp{" "}
              {tx.amount.toLocaleString()}
            </p>
          </div>
        ))}

        {filteredTransactions?.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}
