"use client";

import { useFinancialSummary } from "../hooks/useFinanceSummary";
import FinanceDonutChart from "./FinanceDonutChart";

const COLORS = ["#4ade80", "#f87171"];

export default function FinanceCard() {
  const { balance, income, expense, chartData, isLoading } =
    useFinancialSummary();

  if (isLoading) return null;

  return (
    <div
      className="
      relative
      glass-strong
      rounded-3xl
      p-6
      shadow-[0_20px_60px_rgba(0,0,0,0.5)]
    "
    >
      {/* glow effect */}
      <div className="
        absolute
        w-40 h-40
        bg-indigo-500/20
        blur-3xl
        rounded-full
        -top-10
        -right-10
      "/>

      <p className="text-sm text-gray-400">Total Balance</p>

      <h2
        className="
        text-2xl
        md:text-3xl
        font-semibold
        tracking-tight
        mt-1
      "
      >
        Rp {balance.toLocaleString()}
      </h2>

      <div className="mt-3">
        <p className="text-sm text-center text-gray-400 mb-3">Financial Ratio</p>
      </div>

      <FinanceDonutChart data={chartData} />

      <div className="flex justify-between text-sm mt-4">
        <div>
          <p className="text-gray-400">Income</p>
          <p className="text-green-400 font-semibold">
            Rp {income.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400">Expense</p>
          <p className="text-red-400 font-semibold">
            Rp {expense.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
