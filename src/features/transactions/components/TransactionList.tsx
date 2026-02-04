"use client";

import { useState } from "react";
import { useTransactions } from "@/src/features/transactions/hooks/useTransactions";
import FloatingAddButton from "@/src/shared/components/FloatingAddButton";
import AddTransactionModal from "./AddTransactionModal";
import DeleteTransactionModal from "./DeleteTransactionModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function TransactionList() {
  const { transactionsQuery, deleteMutation } = useTransactions();
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<any>(null);

  const [search, setSearch] = useState("");

  if (transactionsQuery.isLoading) return null;
  if (transactionsQuery.error) return null;

  const handleEdit = (tx: any) => {
    setSelectedTransaction(tx);
    setOpen(true);
  };

  const handleDeleteClick = (tx: any) => {
    setTransactionToDelete(tx);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete) {
      await deleteMutation.mutateAsync(transactionToDelete);
      setDeleteModalOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = transactionsQuery.data?.filter((tx) =>
    tx.category.toLowerCase().includes(search.toLowerCase()) ||
    tx.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <input
          type="text"
          placeholder="Search by category or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-64
            p-2.5
            rounded-lg
            bg-white/10
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
            text-sm sm:text-base
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
              items-center
              transition
              hover:bg-white/10
              hover:scale-[1.01]
              flex-wrap
            "
          >
            <div className="flex flex-col flex-1 min-w-0">
              <p className="font-medium text-sm sm:text-base truncate">{tx.category}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{tx.date}</p>
            </div>

            <p
              className={`font-semibold text-base sm:text-lg w-32 sm:w-48 text-right ${
                tx.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"} Rp {tx.amount.toLocaleString()}
            </p>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleEdit(tx)}
                className="p-2 rounded-xl hover:bg-white/10 transition"
                title="Edit"
              >
                <PencilIcon className="w-5 h-5 text-indigo-400" />
              </button>
              <button
                onClick={() => handleDeleteClick(tx)}
                className="p-2 rounded-xl hover:bg-white/10 transition"
                title="Delete"
              >
                <TrashIcon className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        ))}

        {filteredTransactions?.length === 0 && (
          <p className="text-center text-gray-400 mt-4 text-sm sm:text-base">
            No transactions found.
          </p>
        )}
      </div>

      <FloatingAddButton onClick={() => setOpen(true)} />
      {open && (
        <AddTransactionModal
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}

      {transactionToDelete && (
        <DeleteTransactionModal
          isOpen={deleteModalOpen}
          transactionName={transactionToDelete.category}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
