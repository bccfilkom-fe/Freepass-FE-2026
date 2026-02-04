import TransactionList from "@/src/features/transactions/components/TransactionList";

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h1 className="mt-3 text-2xl font-semibold">
        My History Transactions
      </h1>

      <TransactionList />
    </div>
  );
}