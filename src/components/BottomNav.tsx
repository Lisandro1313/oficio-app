"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/mapa", label: "Mapa", icon: MapIcon },
  { href: "/buscar", label: "Buscar", icon: SearchIcon },
  { href: "/guardados", label: "Guardados", icon: HeartIcon },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 border-t border-line bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[440px] items-stretch justify-around px-2 py-2 pb-3">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 py-1"
            >
              <Icon active={active} />
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function base(active: boolean) {
  return {
    width: 24,
    height: 24,
    fill: "none",
    stroke: active ? "#fb923c" : "#8b8b95",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}
function MapIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6 9 3Z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}
function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" {...base(active)} fill={active ? "#fb923c" : "none"}>
      <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5.15-7 9.5-7 9.5Z" />
    </svg>
  );
}
