"use client";

interface Props {
  onClick: () => void;
}

export default function AddWalletCard({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full sm:min-w-[200px] md:min-w-[220px] lg:min-w-[260px]
        h-[160px]
        rounded-3xl
        border-2 border-dashed border-gray-300
        flex items-center justify-center
        text-gray-500
        hover:border-indigo-500
        hover:text-indigo-600
        transition
        relative
        bg-white/5
        shadow-sm
      "
    >
      + Add Wallet
    </button>
  );
}
