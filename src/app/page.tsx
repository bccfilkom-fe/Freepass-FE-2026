"use client";

import { useState } from "react";
import FloatingAddButton from "../shared/components/FloatingAddButton";
import AddTransactionModal from "../features/transactions/components/AddTransactionModal";
import HistoryTransaction from "../features/transactions/components/HistoryTransaction";
import FinanceCard from "../features/dashboard/components/FinanceCard";
import StatisticCard from "../features/dashboard/components/StatisticCard";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 xl:col-span-2 w-full">
          <FinanceCard />
        </div>
        <div className="w-full">
          <StatisticCard />
        </div>
      </div>

      <div className="w-full">
        <HistoryTransaction />
      </div>

      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 z-50">
        <FloatingAddButton onClick={() => setOpen(true)} />
      </div>

      {open && (
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <AddTransactionModal onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
