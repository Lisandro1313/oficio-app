"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MapIcon,
  SearchIcon,
  HeartIcon,
} from "@/components/icons";

const items = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/mapa", label: "Mapa", icon: MapIcon },
  { href: "/buscar", label: "Buscar", icon: SearchIcon },
  { href: "/guardados", label: "Guardados", icon: HeartIcon },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-line px-3 py-6 md:flex">
      <Link href="/" className="mb-6 px-3">
        <span className="text-2xl font-extrabold tracking-tight">
          Oficio<span className="text-accent">.</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 rounded-full px-4 py-3 text-[15px] transition hover:bg-elevated ${
                active ? "font-bold text-ink" : "font-medium text-muted"
              }`}
            >
              <Icon size={24} className={active ? "text-accent" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/buscar"
        className="mt-4 rounded-full bg-accent-strong py-3 text-center text-sm font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition active:scale-95"
      >
        Publicar trabajo
      </Link>

      <div className="mt-auto flex items-center gap-3 rounded-full px-3 py-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-white">
          L
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Invitado</div>
          <div className="text-xs text-muted">Entrar / Registrarse</div>
        </div>
      </div>
    </aside>
  );
}
