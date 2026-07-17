"use client";

import { useRouter } from "next/navigation";

export default function BackBar({ title }: { title?: string }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-bg/80 px-2 py-2.5 backdrop-blur-xl">
      <button
        onClick={() => router.back()}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card active:scale-95"
        aria-label="Volver"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f4f4f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      {title && <span className="truncate text-sm font-semibold">{title}</span>}
    </div>
  );
}
