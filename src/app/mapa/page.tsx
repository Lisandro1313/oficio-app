"use client";

import { useState } from "react";
import Link from "next/link";
import {
  profesionales,
  type Oficio,
  type Profesional,
} from "@/lib/data";
import { Avatar, Stars } from "@/components/ui";
import { OficioIcon, PinIcon, ShieldIcon } from "@/components/icons";

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
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 px-4 pb-3 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold">Cerca tuyo</h1>
            <p className="text-xs text-muted">{lista.length} profesionales disponibles</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-2 text-xs font-medium text-muted">
            <PinIcon size={13} className="text-accent" /> La Plata
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
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                  active
                    ? "bg-accent-strong text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)]"
                    : "border border-line bg-card text-muted"
                }`}
              >
                {o !== "Todos" && <OficioIcon oficio={o as Oficio} size={13} />}
                {o}
              </button>
            );
          })}
          <button
            onClick={() => setSoloVerificados((v) => !v)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
              soloVerificados
                ? "bg-emerald-500 text-white"
                : "border border-line bg-card text-muted"
            }`}
          >
            <ShieldIcon size={13} /> Verificados
          </button>
        </div>
      </header>

      {/* "Mapa" oscuro estilizado con pins */}
      <div
        className="relative mx-4 mt-3 h-[400px] overflow-hidden rounded-3xl border border-line"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, #1a1c22, #0e0f13), repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.03) 41px), repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.03) 41px)",
        }}
      >
        {/* "calles" */}
        <div className="absolute left-0 right-0 top-1/2 h-2.5 -translate-y-1/2 bg-white/[0.06]" />
        <div className="absolute bottom-0 left-1/2 top-0 w-2.5 -translate-x-1/2 bg-white/[0.06]" />
        <div className="absolute left-0 right-0 top-[22%] h-1.5 bg-white/[0.04]" />
        <div className="absolute bottom-0 left-[28%] top-0 w-1.5 bg-white/[0.04]" />

        {/* "Vos estás acá" */}
        <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
          <div className="h-4 w-4 rounded-full border-2 border-bg bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <div className="absolute -inset-3 -z-10 animate-ping rounded-full bg-sky-400/20" />
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
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-bg text-white shadow-lg ${
                sel?.id === p.id ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : ""
              }`}
              style={{ background: p.avatar }}
            >
              <OficioIcon oficio={p.oficio} size={18} />
            </div>
            <div className="mx-auto h-2 w-2 -translate-y-1 rotate-45 border-b-2 border-r-2 border-bg bg-white/90" />
          </button>
        ))}

        {/* Tarjeta flotante del seleccionado */}
        {sel && (
          <Link
            href={`/perfil/${sel.id}`}
            className="absolute inset-x-3 bottom-3 z-30 flex items-center gap-3 rounded-2xl border border-line bg-elevated/95 p-3 shadow-2xl backdrop-blur-xl fade-up"
          >
            <Avatar gradient={sel.avatar} inicial={sel.inicial} size={46} />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{sel.nombre}</span>
                <span className="text-xs text-muted">· {sel.oficio}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Stars value={sel.rating} />
                <span className="font-semibold text-ink">{sel.rating}</span>
                <span>· {sel.barrio}</span>
              </div>
              <span className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {sel.disponible}
              </span>
            </div>
            <span className="text-xs font-bold text-accent">Ver →</span>
          </Link>
        )}
      </div>

      {/* Lista debajo del mapa */}
      <div className="mt-5 px-4 pb-4">
        <h2 className="mb-2.5 text-xs font-bold uppercase tracking-widest text-muted">
          {lista.length} en el área
        </h2>
        <div className="space-y-2.5">
          {lista.map((p) => (
            <Link
              key={p.id}
              href={`/perfil/${p.id}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3 active:border-accent-soft"
            >
              <Avatar gradient={p.avatar} inicial={p.inicial} size={42} />
              <div className="flex-1">
                <div className="text-sm font-semibold">{p.nombre}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <OficioIcon oficio={p.oficio} size={13} />
                  <span>{p.oficio}</span>
                  <span>·</span>
                  <Stars value={p.rating} />
                  <span className="font-semibold text-ink">{p.rating}</span>
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
