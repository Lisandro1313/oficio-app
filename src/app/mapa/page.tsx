"use client";

import { useState } from "react";
import Link from "next/link";
import {
  profesionales,
  OFICIO_EMOJI,
  type Oficio,
  type Profesional,
} from "@/lib/data";
import { Avatar, Stars } from "@/components/ui";

const oficios: (Oficio | "Todos")[] = [
  "Todos",
  "Albañil",
  "Electricista",
  "Plomero",
  "Gasista",
  "Pintor",
];

export default function Mapa() {
  const [filtro, setFiltro] = useState<Oficio | "Todos">("Todos");
  const [soloVerificados, setSoloVerificados] = useState(false);
  const [sel, setSel] = useState<Profesional | null>(null);

  const lista = profesionales.filter((p) => {
    if (filtro !== "Todos" && p.oficio !== filtro) return false;
    if (soloVerificados && !p.verificado) return false;
    return true;
  });

  return (
    <div>
      {/* Header + filtros */}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 px-4 pb-3 pt-5 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Cerca tuyo</h1>
          <span className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium">
            📍 La Plata
          </span>
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {oficios.map((o) => {
            const active = filtro === o;
            return (
              <button
                key={o}
                onClick={() => {
                  setFiltro(o);
                  setSel(null);
                }}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                  active ? "bg-accent text-white" : "border border-line bg-card"
                }`}
              >
                {o !== "Todos" && (
                  <span className="mr-1">{OFICIO_EMOJI[o as Oficio]}</span>
                )}
                {o}
              </button>
            );
          })}
          <button
            onClick={() => setSoloVerificados((v) => !v)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
              soloVerificados
                ? "bg-emerald-600 text-white"
                : "border border-line bg-card"
            }`}
          >
            ✅ Verificados
          </button>
        </div>
      </header>

      {/* "Mapa" — placeholder estilizado con pins */}
      <div
        className="relative mx-4 mt-3 h-[380px] overflow-hidden rounded-2xl border border-line"
        style={{
          background:
            "linear-gradient(135deg,#eef2f0,#e6ece8), repeating-linear-gradient(0deg,transparent,transparent 38px,#0000000a 39px), repeating-linear-gradient(90deg,transparent,transparent 38px,#0000000a 39px)",
        }}
      >
        {/* "calles" decorativas */}
        <div className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 bg-white/60" />
        <div className="absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2 bg-white/60" />
        <div className="absolute left-0 right-0 top-[22%] h-2 bg-white/40" />
        <div className="absolute bottom-0 left-[28%] top-0 w-2 bg-white/40" />

        {/* "Vos estás acá" */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="h-4 w-4 rounded-full border-2 border-white bg-sky-500 shadow" />
          <div className="absolute -inset-3 -z-10 animate-ping rounded-full bg-sky-400/30" />
        </div>

        {/* Pins */}
        {lista.map((p) => (
          <button
            key={p.id}
            onClick={() => setSel(p)}
            className="absolute z-20 -translate-x-1/2 -translate-y-full transition active:scale-90"
            style={{ left: `${p.mapX}%`, top: `${p.mapY}%` }}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-base shadow-md ${
                sel?.id === p.id ? "ring-2 ring-accent" : ""
              }`}
              style={{ background: p.avatar }}
            >
              {OFICIO_EMOJI[p.oficio]}
            </div>
            <div className="mx-auto h-2 w-2 -translate-y-1 rotate-45 bg-white" />
          </button>
        ))}
      </div>

      {/* Tarjeta del seleccionado */}
      {sel && (
        <Link
          href={`/perfil/${sel.id}`}
          className="mx-4 mt-3 flex items-center gap-3 rounded-2xl border border-line bg-card p-3 shadow-sm"
        >
          <Avatar gradient={sel.avatar} inicial={sel.inicial} size={48} />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">{sel.nombre}</span>
              <span className="text-xs text-muted">· {sel.oficio}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted">
              <Stars value={sel.rating} />
              <span className="font-medium text-ink">{sel.rating}</span>
              <span>· {sel.barrio}</span>
            </div>
            <span className="mt-0.5 inline-block text-[11px] font-medium text-emerald-600">
              🟢 {sel.disponible}
            </span>
          </div>
          <span className="text-xs font-semibold text-accent">Ver →</span>
        </Link>
      )}

      {/* Lista debajo del mapa */}
      <div className="mt-4 px-4 pb-4">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
          {lista.length} profesionales en el área
        </h2>
        <div className="space-y-2">
          {lista.map((p) => (
            <Link
              key={p.id}
              href={`/perfil/${p.id}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-card p-3"
            >
              <Avatar gradient={p.avatar} inicial={p.inicial} size={40} />
              <div className="flex-1">
                <div className="text-sm font-semibold">{p.nombre}</div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <span>{OFICIO_EMOJI[p.oficio]} {p.oficio}</span>
                  <span>·</span>
                  <Stars value={p.rating} />
                  <span className="font-medium text-ink">{p.rating}</span>
                </div>
              </div>
              <span className="text-xs text-muted">{p.barrio}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
