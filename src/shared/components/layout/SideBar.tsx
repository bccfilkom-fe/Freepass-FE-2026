"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ArrowLeftRight, Wallet, X } from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

const menus = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ArrowLeftRight, label: "Transactions", href: "/transactions" },
  { icon: Wallet, label: "Wallet", href: "/wallets" },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-1/2 -translate-y-1/2 left-4
          w-20 h-[520px]
          rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          flex flex-col items-center justify-between py-6
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-[140%] lg:translate-x-0"}
        `}
      >
        {/* close mobile mode */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>

        <div className="text-lg font-semibold tracking-wider">F</div>

        <nav className="flex flex-col gap-4">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.href;
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  group relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all
                  ${isActive
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-110"
                    : "hover:bg-white/10 text-gray-300"}
                `}
              >
                <Icon size={20} />
                <span className="
                  absolute left-16 opacity-0 group-hover:opacity-100
                  transition pointer-events-none whitespace-nowrap
                  text-sm bg-black/80 px-3 py-1.5 rounded-lg
                ">
                  {menu.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div />
      </aside>
    </>
  );
}
