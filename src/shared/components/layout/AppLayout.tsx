"use client";

import { useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0E1424] to-[#0B0F19] text-white">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-32 transition-all">
        <Navbar onMobileMenuClick={() => setMobileOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 min-h-screen">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
