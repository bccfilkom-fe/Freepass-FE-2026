"use client";

import { useState } from "react";
import WalletCard from "./walletCard";
import AddWalletCard from "./AddWalletCard";
import AddWalletModal from "./AddWalletModal";
import { useWallets } from "../hooks/useWallets";
import { Wallet } from "../types/wallet";

export default function WalletList() {
  const { walletsQuery } = useWallets();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Wallet | null>(null);

  if (walletsQuery.isLoading) return <p>Loading wallets...</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {walletsQuery.data?.map((wallet) => (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            onEdit={(w) => {
              setSelected(w);
              setOpen(true);
            }}
          />
        ))}

        <AddWalletCard
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        />
      </div>

      {open && (
        <AddWalletModal
          wallet={selected ?? undefined}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
