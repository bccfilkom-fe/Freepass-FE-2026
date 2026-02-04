import WalletList from "@/src/features/wallets/components/walletList";

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h1 className="mt-3 text-2xl font-semibold">
        My Wallets
      </h1>

      <WalletList />
    </div>
  );
}