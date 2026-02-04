"use client";

import { useState, useEffect } from "react";
import { useWallets } from "../hooks/useWallets";
import { Wallet } from "../types/wallet";

interface Props {
  onClose: () => void;
  wallet?: Wallet;
}

const COLORS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#22c55e,#4ade80)",
  "linear-gradient(135deg,#0ea5e9,#38bdf8)",
  "linear-gradient(135deg,#f59e0b,#fbbf24)",
];

export default function AddWalletModal({ onClose, wallet }: Props) {
  const { createMutation, updateMutation } = useWallets();

  const [name, setName] = useState(wallet?.name || "");
  const [balance, setBalance] = useState(wallet?.balance || 0);
  const [color, setColor] = useState(wallet?.color || COLORS[0]);

  const [error, setError] = useState({ name: "", balance: "" });

  const handleSubmit = async () => {
    let hasError = false;
    const newError = { name: "", balance: "" };

    if (!name.trim()) {
      newError.name = "Wallet name is required";
      hasError = true;
    }

    if (balance === 0 || isNaN(balance)) {
      newError.balance = "Balance must be greater than 0";
      hasError = true;
    }

    setError(newError);
    if (hasError) return;

    if (wallet) {
      await updateMutation.mutateAsync({
        id: wallet.id,
        data: { name, balance, color },
      });
    } else {
      await createMutation.mutateAsync({ name, balance, color });
    }

    onClose();
  };

  const resetForm = () => {
    setName("");
    setBalance(0);
    setColor(COLORS[0]);
    setError({ name: "", balance: "" });
  };

  useEffect(() => {
    if (wallet) {
      setName(wallet.name);
      setBalance(wallet.balance);
      setColor(wallet.color);
    } else {
      resetForm();
    }
  }, [wallet]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)] space-y-4">
        <h2 className="text-2xl font-semibold">{wallet ? "Edit Wallet" : "Add Wallet"}</h2>

        <div>
          <input
            placeholder="Wallet name (BCA, Cash...)"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Initial balance"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
            value={balance === 0 ? "" : balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
          {error.balance && <p className="text-red-500 text-sm mt-1">{error.balance}</p>}
        </div>

        <div className="flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{ background: c }}
              className={`w-10 h-10 rounded-full border-4 ${
                color === c ? "border-black" : "border-transparent"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 hover:scale-105 transition text-white"
          >
            {wallet ? "Save Changes" : "Create Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
}