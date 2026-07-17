"use client";

import { useSaved } from "@/lib/useSaved";
import { HeartIcon } from "@/components/icons";

export default function SaveButton({
  id,
  size = 20,
  variant = "circle",
}: {
  id: string;
  size?: number;
  variant?: "circle" | "plain";
}) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={saved ? "Quitar de guardados" : "Guardar"}
      className={
        variant === "circle"
          ? `flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card/80 backdrop-blur transition active:scale-90 ${
              saved ? "text-accent" : "text-muted"
            }`
          : `transition active:scale-90 ${saved ? "text-accent" : "text-muted"}`
      }
    >
      <HeartIcon size={size} filled={saved} />
    </button>
  );
}
