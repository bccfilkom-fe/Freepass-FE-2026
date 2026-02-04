"use client";

import { Bell, Settings, Menu as MenuIcon } from "lucide-react";

interface NavbarProps {
  onMobileMenuClick?: () => void;
}

export default function Navbar({ onMobileMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-4 z-30 mx-4 lg:mx-8">
      <div className="
        flex items-center justify-between
        px-4 sm:px-6
        h-16
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-lg
        gap-3 sm:gap-6
      ">
        <div className="flex items-center gap-2">

          {/* mobile burger */}
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10"
          >
            <MenuIcon size={20} />
          </button>

          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            F
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">
            Finexa
          </span>
        </div>
      </div>
    </header>
  );
}
