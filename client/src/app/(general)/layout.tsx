import MenuOverlay from "@/components/menu-overlay/MenuOverlay";
import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full min-h-screen relative">
      <Navbar />
      <MenuOverlay />
      { children }
    </section>
  )
}
