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
        w-full           
        max-w-md      
        h-[140px]      
        sm:h-[160px] 
        rounded-3xl
        overflow-hidden
        shadow-lg
        transition-all 
        active:scale-95
        hover:scale-[1.02] 
        text-white
        flex flex-col justify-between
        p-5          
        shrink-0 
      `}
      style={{ background: wallet.color }}
    >
      <svg className="absolute bottom-0 left-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 260 160" preserveAspectRatio="none">
        <path d="M0,100 C60,150 200,50 260,120 L260,160 L0,160 Z" fill="rgba(255,255,255,0.1)" />
      </svg>

      <div className="relative z-10 text-left">
        <p className="text-xs sm:text-sm font-medium opacity-80 uppercase tracking-wider">
          Total Balance
        </p>
        <div className="font-semibold text-lg sm:text-xl truncate">{wallet.name}</div>
      </div>

      <div className="relative z-10 text-left mb-2">
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Rp {wallet.balance.toLocaleString("id-ID")}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/20 to-transparent rounded-b-3xl pointer-events-none" />
    </button>
  );
}