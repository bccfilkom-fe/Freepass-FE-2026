import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "@/src/features/transactions/services/transactionService";
import { Transaction } from "../types/transaction.types";

export const useTransactions = () => {
  const queryClient = useQueryClient();

  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionService.getTransactions,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Transaction, "id">) =>
      transactionService.createTransaction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Transaction>;
    }) => transactionService.updateTransaction(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: transactionService.deleteTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  return {
    transactionsQuery,
    createMutation,
    updateMutation, 
    deleteMutation,
  };
};
