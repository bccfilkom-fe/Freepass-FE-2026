/**
 * Global Sheet Component
 * Renders a global sheet controlled by Zustand store
 */

"use client";

import { Sheet } from "@/components/ui/sheet";
import { useSheetStore } from "@/stores/sheet-store";

export default function GlobalSheet() {
  const { isOpen, children, closeSheet } = useSheetStore();

  return (
    <Sheet open={isOpen} onOpenChange={() => closeSheet()}>
      {children}
    </Sheet>
  );
}
