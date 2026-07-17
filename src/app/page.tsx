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
    filtro === "Todos"
      ? trabajos
      : trabajos.filter((t) => t.oficio === filtro);

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 px-4 pb-3 pt-5 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Oficio<span className="text-accent">.</span>
            </h1>
            <p className="text-xs text-muted">Trabajos reales cerca tuyo</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium">
            📍 La Plata
          </div>
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
                    ? "bg-accent text-white"
                    : "border border-line bg-card text-ink"
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
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-accent-soft px-3 py-2 text-[12px] text-accent">
        <span>👀</span>
        <span>
          Mirá todo sin registrarte. Creás cuenta recién cuando querés
          contactar.
        </span>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4 p-4">
        {lista.map((t) => (
          <JobCard key={t.id} trabajo={t} />
        ))}
        <p className="py-6 text-center text-xs text-muted">
          Seguí bajando · más trabajos de tu zona
        </p>
      </div>
    </div>
  );
}
