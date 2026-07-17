"use client";

import { useState } from "react";
import Link from "next/link";
import {
  profesionales,
  OFICIO_EMOJI,
  type Oficio,
} from "@/lib/data";
import { Avatar, Stars, Verificado } from "@/components/ui";

const sugerencias = [
  "Pérdida de agua urgente en Los Hornos",
  "Hacer una parrilla en el fondo",
  "Recablear la casa",
  "Instalar un calefón",
  "Pintar el frente",
];

// "motor" de búsqueda de mentira: matchea palabras clave con oficios
const reglas: { claves: string[]; oficio: Oficio }[] = [
  { claves: ["perdida", "pérdida", "agua", "destap", "termotanque", "caño", "plomer"], oficio: "Plomero" },
  { claves: ["parrilla", "pared", "muro", "contrapiso", "revoque", "albañil", "ampliac"], oficio: "Albañil" },
  { claves: ["cable", "recable", "luz", "enchufe", "tablero", "electric", "term"], oficio: "Electricista" },
  { claves: ["gas", "calefon", "calefón", "estufa", "gasista"], oficio: "Gasista" },
  { claves: ["pint", "frente", "latex", "látex"], oficio: "Pintor" },
];

export default function Buscar() {
  const [q, setQ] = useState("");

  const oficioDetectado: Oficio | null = (() => {
    const t = q.toLowerCase();
    for (const r of reglas) {
      if (r.claves.some((c) => t.includes(c))) return r.oficio;
    }
    return null;
  })();

  const urgente = /urgen|hoy|ya|ahora/.test(q.toLowerCase());

  const resultados = q
    ? profesionales
        .filter((p) => (oficioDetectado ? p.oficio === oficioDetectado : true))
        .sort((a, b) => b.rating - a.rating)
    : [];

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 px-4 pb-3 pt-5 backdrop-blur">
        <h1 className="mb-3 text-xl font-bold">Buscar</h1>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Contá qué necesitás, como le hablarías a un amigo"
            className="w-full bg-transparent text-sm outline-none"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-muted">
              ✕
            </button>
          )}
        </div>
      </header>

      <div className="p-4">
        {!q && (
          <>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
              Probá con
            </p>
            <div className="flex flex-col gap-2">
              {sugerencias.map((s) => (
                <button
                  key={s}
                  onClick={() => setQ(s)}
                  className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-3 text-left text-sm active:bg-elevated"
                >
                  <span>🔎</span>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        {q && (
          <>
            <div className="mb-3 rounded-xl bg-accent-soft px-3 py-2 text-sm text-accent">
              {oficioDetectado ? (
                <>
                  Entendí que buscás un{" "}
                  <span className="font-bold">
                    {OFICIO_EMOJI[oficioDetectado]} {oficioDetectado}
                  </span>
                  {urgente && " para una urgencia"}. Estos son los mejores de tu
                  zona:
                </>
              ) : (
                <>Estos profesionales pueden ayudarte:</>
              )}
            </div>

            <div className="space-y-2">
              {resultados.map((p) => (
                <Link
                  key={p.id}
                  href={`/perfil/${p.id}`}
                  className="block rounded-xl border border-line bg-card p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar gradient={p.avatar} inicial={p.inicial} size={44} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{p.nombre}</div>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <span>{p.oficio}</span>·<Stars value={p.rating} />
                        <span className="font-medium text-ink">{p.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted">{p.barrio}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-medium text-emerald-400">
                      🟢 {p.disponible}
                    </span>
                    {p.matriculado && <Verificado label="Matriculado" />}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
