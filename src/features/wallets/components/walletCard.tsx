"use client";

interface Props {
  wallet: {
    id: string;
    name: string;
    balance: number;
    color: string;
  };
  onEdit: (wallet: any) => void;
}

export default function WalletCard({ wallet, onEdit }: Props) {
  return (
    <button
      onClick={() => onEdit(wallet)}
      className={`
        relative
        w-full sm:min-w-[200px] md:min-w-[220px] lg:min-w-[260px]
        h-[150px]
        rounded-3xl
        overflow-hidden
        shadow-lg
        transition-transform transform hover:scale-105 hover:shadow-2xl
        text-white
        flex flex-col justify-between
        p-4
      `}
      style={{ background: wallet.color }}
    >
      <svg
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 260 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C60,150 200,50 260,120 L260,160 L0,160 Z"
          fill="rgba(255,255,255,0.05)"
        />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="walletPattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
          >
            <path
              d="M0,0 L20,20 M20,0 L0,20"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#walletPattern)" />
      </svg>

      <div className="relative z-10">
        <div className="font-semibold text-lg">{wallet.name}</div>
        <div className="text-2xl font-bold mt-2">
          Rp {wallet.balance.toLocaleString("id-ID")}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl pointer-events-none" />
    </button>
  );
}
