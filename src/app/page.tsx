"use client";

import { useState } from "react";
import { trabajos, OFICIO_EMOJI, type Oficio } from "@/lib/data";
import JobCard from "@/components/JobCard";

const oficios: (Oficio | "Todos")[] = [
  "Todos",
  "Albañil",
  "Electricista",
  "Plomero",
  "Gasista",
  "Pintor",
];

export default function Feed() {
  const [filtro, setFiltro] = useState<Oficio | "Todos">("Todos");

  const lista =
    filtro === "Todos" ? trabajos : trabajos.filter((t) => t.oficio === filtro);

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 px-4 pb-3 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Oficio<span className="text-accent">.</span>
            </h1>
            <p className="text-xs text-muted">Trabajos reales cerca tuyo</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-2 text-xs font-medium">
            📍 La Plata
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9aa5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Filtros por oficio */}
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {oficios.map((o) => {
            const active = filtro === o;
            return (
              <button
                key={o}
                onClick={() => setFiltro(o)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-accent-strong text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)]"
                    : "border border-line bg-card text-muted"
                }`}
              >
                {o !== "Todos" && (
                  <span className="mr-1">{OFICIO_EMOJI[o as Oficio]}</span>
                )}
                {o}
              </button>
            );
          })}
        </div>
      </header>

      {/* Banner sin registro */}
      <div className="mx-4 mt-4 flex items-center gap-2.5 rounded-2xl border border-accent-soft bg-accent-soft px-3.5 py-3 text-[12px] text-accent">
        <span className="text-base">👀</span>
        <span>
          Mirá todo <b>sin registrarte</b>. Creás cuenta recién cuando querés
          contactar.
        </span>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-5 p-4">
        {lista.map((t, i) => (
          <div key={t.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <JobCard trabajo={t} />
          </div>
        ))}
        <p className="py-4 text-center text-xs text-muted">
          Seguí bajando · más trabajos de tu zona
        </p>
      </div>
    </div>
  );
}
