"use client";

import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        md:bottom-10
        md:right-10
        z-50
        w-14
        h-14
        md:w-16
        md:h-16
        rounded-full
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        shadow-xl
        flex
        items-center
        justify-center
        transition
        active:scale-95
      "
    >
      <Plus size={26} />
    </button>
  );
}