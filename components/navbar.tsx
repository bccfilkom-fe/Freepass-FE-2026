"use client";

import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import {
  Home,
  type LucideIcon,
  ReceiptText,
  ShoppingCart,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

type NavItemProp = {
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number;
};

const NavItem = ({
  data,
  isActive,
  ...rest
}: {
  data: NavItemProp;
  isActive: boolean;
} & Omit<LinkProps, "href">) => {
  const Icon = data.icon;

  return (
    <Link
      {...rest}
      href={data.path}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-md px-4 py-2 transition relative",
        isActive ? "text-primary" : "text-muted-foreground hover:bg-muted",
      )}
    >
      <div className="relative">
        <Icon className={isActive ? "h-3 w-3" : "h-4 w-4"} />
        {data.badge && data.badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center z-50"
          >
            {data.badge > 99 ? "99+" : data.badge}
          </motion.div>
        )}
      </div>
      {isActive && <span className="text-xs">{data.label}</span>}
    </Link>
  );
};

// TODO: change this to match app domain
const navItems: NavItemProp[] = [
  { label: "Canteens", icon: Home, path: "/canteens" },
  { label: "Cart", icon: ShoppingCart, path: "/cart" },
  { label: "Orders", icon: ReceiptText, path: "/orders" },
  { label: "Profile", icon: User, path: "/profile" },
];

const MotionNavItem = motion(NavItem);

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useHideOnScroll(navRef, {
    minDelta: 40,
  });

  return (
    <motion.nav
      layout
      initial={{
        y: 100,
      }}
      animate={{
        y: 0,
      }}
      ref={navRef}
      className={cn(
        "fixed bottom-0 z-10 flex w-full gap-2 rounded-tl-2xl rounded-tr-2xl bg-muted px-2 py-4 border-2 border-primary/10",
        "translate-y-0 transition-transform duration-300",
        "max-w-lg left-1/2 -translate-x-1/2",
      )}
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path !== "/" && pathname.startsWith(`${item.path}/`));

        // Add badge count to cart item
        const itemWithBadge =
          item.path === "/cart"
            ? { ...item, badge: totalItems === 0 ? undefined : totalItems }
            : item;

        return (
          <MotionNavItem
            key={item.label}
            data={itemWithBadge}
            isActive={isActive}
          />
        );
      })}
    </motion.nav>
  );
}
