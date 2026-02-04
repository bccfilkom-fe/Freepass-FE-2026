"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const NAVBAR_ROUTES = ["/canteens", "/cart", "/orders", "/profile"];

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const showNavbar = NAVBAR_ROUTES.includes(pathname);

  if (!showNavbar) return null;

  return <Navbar />;
}
