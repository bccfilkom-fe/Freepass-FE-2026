import { useMemo } from "react";
import { useTransactions } from "@/src/features/transactions/hooks/useTransactions";

export const useFinancialSummary = () => {
  const { transactionsQuery } = useTransactions();
  const transactions = transactionsQuery.data ?? [];

  const { income, expense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const chartData = useMemo(
    () => [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ],
    [income, expense]
  );

  const statisticData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const result = days.map((day) => ({
      name: day,
      income: 0,
      expense: 0,
    }));

    transactions.forEach((t) => {
      const date = new Date(t.date + "T00:00:00"); 
      const dayIndex = date.getDay();

      if (dayIndex >= 0 && dayIndex <= 6) {
        if (t.type === "income") {
          result[dayIndex].income += t.amount;
        } else {
          result[dayIndex].expense += t.amount;
        }
      }
    });

    return result;
  }, [transactions]);

  return {
    income,
    expense,
    balance,
    chartData,
    statisticData,
    isLoading: transactionsQuery.isLoading,
  };
};
