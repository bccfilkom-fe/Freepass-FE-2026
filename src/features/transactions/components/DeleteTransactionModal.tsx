"use client";

import { FC } from "react";

interface Props {
  transactionName: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteTransactionModal: FC<Props> = ({
  transactionName,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-sm glass-strong rounded-3xl p-6 space-y-4 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
        <h2 className="text-xl font-semibold text-red-400">Delete Transaction</h2>
        <p className="text-gray-300">
          Are you sure you want to delete history transaction for <span className="font-medium">{transactionName}</span>?
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 transition text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransactionModal;
