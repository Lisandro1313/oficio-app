"use client";

import Link from "next/link";
import { profesionales } from "@/lib/data";
import { Avatar, OficioBadge, Stars } from "@/components/ui";
import { HeartIcon } from "@/components/icons";
import { useSaved } from "@/lib/useSaved";
import SaveButton from "@/components/SaveButton";

export default function Guardados() {
  const { ids } = useSaved();
  const guardados = ids
    .map((id) => profesionales.find((p) => p.id === id))
    .filter((p): p is (typeof profesionales)[number] => Boolean(p));

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 px-4 pb-3 pt-5 backdrop-blur-xl">
        <h1 className="text-xl font-extrabold">Guardados</h1>
        <p className="text-xs text-muted">
          Tus profesionales para cuando los necesites
        </p>
      </header>

      {guardados.length === 0 ? (
        <div className="flex flex-col items-center px-8 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-elevated text-muted">
            <HeartIcon size={28} />
          </div>
          <h2 className="text-base font-semibold">Todavía no guardaste a nadie</h2>
          <p className="mt-1 text-sm text-muted">
            Tocá el corazón en cualquier profesional para tenerlo a mano acá,
            aunque todavía no lo necesites.
          </p>
          <Link
            href="/"
            className="mt-5 rounded-full bg-accent-strong px-5 py-2.5 text-sm font-bold text-white"
          >
            Explorar trabajos
          </Link>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {guardados.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3"
            >
              <Link href={`/perfil/${p.id}`} className="flex flex-1 items-center gap-3">
                <Avatar gradient={p.avatar} inicial={p.inicial} size={52} />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.nombre}</div>
                  <div className="mt-0.5">
                    <OficioBadge oficio={p.oficio} />
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <Stars value={p.rating} />
                    <span className="font-semibold text-ink">{p.rating}</span>
                    <span>· {p.barrio}</span>
                  </div>
                </div>
              </Link>
              <SaveButton id={p.id} variant="plain" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
