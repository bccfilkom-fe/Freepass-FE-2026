import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";

export default function BarberLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full min-h-screen relative">
      <Navbar />
      { children }
    </section>
  )
}