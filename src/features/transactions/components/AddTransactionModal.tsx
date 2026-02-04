"use client";

import { Fragment, useState, useEffect } from "react";
import { useTransactions } from "@/src/features/transactions/hooks/useTransactions";
import { useWallets } from "../../wallets/hooks/useWallets";
import { Transaction } from "../types/transaction.types";
import { Listbox, Transition } from "@headlessui/react";

interface Props {
  onClose: () => void;
  transaction?: Transaction;
  onAdd?: (
    type: "income" | "expense",
    amount: number,
    category: string,
    date: string
  ) => void;
}

export default function AddTransactionModal({ onClose, onAdd, transaction }: Props) {
  const isEdit = !!transaction;

  const { createMutation, updateMutation } = useTransactions();
  const { walletsQuery } = useWallets();

  const wallets = walletsQuery.data ?? [];

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [walletId, setWalletId] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState({
    category: "",
    amount: "",
    wallet: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setCategory(transaction.category);
      setAmount(transaction.amount);
      setType(transaction.type);
      setWalletId(transaction.walletId);
      setDate(transaction.date);
    }
  }, [transaction]);

  const handleSubmit = async () => {
    let hasError = false;
    const newError = { category: "", amount: "", wallet: "", date: "" };

    if (!category.trim()) {
      newError.category = "Category is required";
      hasError = true;
    }

    if (!amount || amount <= 0) {
      newError.amount = "Amount must be greater than 0";
      hasError = true;
    }

    if (!walletId) {
      newError.wallet = "Please select a wallet";
      hasError = true;
    }

    if (!date) {
      newError.date = "Date is required";
      hasError = true;
    }

    setError(newError);
    if (hasError) return;

    const payload = { category, amount, type, walletId, date };

    if (isEdit) {
      await updateMutation.mutateAsync({ id: transaction!.id, data: payload });
    } else {
      await createMutation.mutateAsync(payload);

      if (onAdd) onAdd(type, amount, category, date);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-lg glass-strong rounded-3xl p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)] space-y-4">
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="space-y-3">
          <div>
            <input
              placeholder="Food, Salary..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {error.category && (
              <p className="text-red-500 text-sm mt-1">{error.category}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Amount"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
              value={amount === 0 ? "" : amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            {error.amount && (
              <p className="text-red-500 text-sm mt-1">{error.amount}</p>
            )}
          </div>

          <Listbox value={type} onChange={setType}>
            <div className="relative mt-1">
              <Listbox.Button className="w-full cursor-pointer rounded-xl bg-white/5 border border-white/10 py-3 pl-4 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {type === "expense" ? "Expense" : "Income"}
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                  {["expense", "income"].map((t) => (
                    <Listbox.Option
                      key={t}
                      value={t}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                          active ? "bg-indigo-500 text-white" : "text-white"
                        }`
                      }
                    >
                      {t === "expense" ? "Expense" : "Income"}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <div>
            <Listbox value={walletId} onChange={setWalletId}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-white/5 border border-white/10 py-3 pl-4 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  {wallets.find((w) => w.id === walletId)?.name ||
                    "Select Wallet"}
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                    {wallets.map((w) => (
                      <Listbox.Option
                        key={w.id}
                        value={w.id}
                        className={({ active }) =>
                          `cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                            active ? "bg-indigo-500 text-white" : "text-white"
                          }`
                        }
                      >
                        {w.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {error.wallet && (
              <p className="text-red-500 text-sm mt-1">{error.wallet}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {error.date && (
              <p className="text-red-500 text-sm mt-1">{error.date}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 hover:scale-105 transition text-white"
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
