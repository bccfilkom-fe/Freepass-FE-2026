import { useEffect, useRef } from "react";

export function useHideOnScroll(
  ref: React.RefObject<HTMLElement | null>,
  {
    hideClass = "translate-y-[100%]",
    showClass = "translate-y-0",
    minDelta = 10,
    shortCircuit = true,
  }: {
    hideClass?: string;
    showClass?: string;
    minDelta?: number;
    shortCircuit?: boolean;
  } = {},
) {
  const lastScrollY = useRef(0);
  const dirRef = useRef<"up" | "down">("up");

  // biome-ignore lint/correctness/useExhaustiveDependencies: shortCircuit is for performance optimization, adding it to deps causes unwanted rerender
  useEffect(() => {
    let el: HTMLElement | null = null;

    const onScroll = () => {
      if (!el) return;

      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // Short-circuit option: avoid Math.abs call in hot path by
      // checking signed delta against minDelta. This saves the
      // function-call/boxing overhead when enabled.
      let nextDir: "up" | "down" | null = null;

      if (shortCircuit) {
        if (diff > minDelta) nextDir = "down";
        else if (diff < -minDelta) nextDir = "up";
        else return; // below threshold, no change
      } else {
        const scrollDelta = Math.abs(diff);
        if (scrollDelta < minDelta) return;
        nextDir = diff > 0 ? "down" : "up";
      }

      if (nextDir !== dirRef.current) {
        el.classList.toggle(hideClass, nextDir === "down");
        el.classList.toggle(showClass, nextDir === "up");
        dirRef.current = nextDir;
      }

      lastScrollY.current = currentY;
    };

    const tryAttach = () => {
      if (!ref.current) return false;
      el = ref.current;

      // Ensure initial state is correct
      el.classList.add(showClass);
      el.classList.remove(hideClass);

      window.addEventListener("scroll", onScroll, { passive: true });
      return true;
    };

    // Try immediately
    if (!tryAttach()) {
      // Retry on next frame if ref isn't ready yet
      const raf = requestAnimationFrame(() => tryAttach());
      return () => cancelAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, hideClass, showClass, minDelta]);
}
