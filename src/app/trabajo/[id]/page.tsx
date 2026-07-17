import { notFound } from "next/navigation";
import Link from "next/link";
import { trabajos, getProfesional } from "@/lib/data";
import { Avatar, OficioBadge, Stars } from "@/components/ui";
import BackBar from "@/components/BackBar";
import PedirTrabajo from "@/components/PedirTrabajo";

export function generateStaticParams() {
  return trabajos.map((t) => ({ id: t.id }));
}

export default async function TrabajoDetalle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trabajo = trabajos.find((t) => t.id === id);
  if (!trabajo) notFound();
  const prof = getProfesional(trabajo.profId);

  return (
    <div>
      <BackBar />

      {/* Foto grande */}
      <div className="relative h-64 w-full" style={{ background: trabajo.foto }}>
        <div className="absolute left-3 top-3">
          <OficioBadge oficio={trabajo.oficio} />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            📍 {trabajo.barrio}
          </span>
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            🕐 {trabajo.duracion}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-lg font-bold leading-snug">{trabajo.titulo}</h1>
        <p className="mt-1 text-xs text-muted">{trabajo.fecha}</p>

        {/* Profesional */}
        {prof && (
          <Link
            href={`/perfil/${prof.id}`}
            className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-card p-3"
          >
            <Avatar gradient={prof.avatar} inicial={prof.inicial} size={44} />
            <div className="flex-1">
              <div className="text-sm font-semibold">{prof.nombre}</div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Stars value={prof.rating} />
                <span className="font-medium text-ink">{prof.rating}</span>
                <span>· {prof.barrio}</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent">Ver perfil →</span>
          </Link>
        )}

        <p className="mt-4 text-sm leading-relaxed text-ink">
          {trabajo.descripcion}
        </p>

        {/* Ficha */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Ficha label="💰 Precio" valor={trabajo.precioRango} />
          <Ficha label="🕐 Duración" valor={trabajo.duracion} />
          <Ficha label="🧱 Materiales" valor={trabajo.materiales} full />
        </div>

        {/* Reseña del cliente */}
        <div className="mt-4 rounded-xl border border-line bg-accent-soft/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              Opinión de {trabajo.review.autor}
            </span>
            <Stars value={trabajo.review.rating} />
          </div>
          <p className="mt-1 text-sm text-muted">“{trabajo.review.texto}”</p>
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            ✅ Reseña verificada — contrató por la app
          </p>
        </div>
      </div>

      {/* Acción */}
      <div className="sticky bottom-[68px] z-30 border-t border-line bg-card/95 p-3 backdrop-blur">
        <PedirTrabajo trabajo={trabajo.titulo} profesional={prof?.nombre} />
      </div>
    </div>
  );
}

function Ficha({
  label,
  valor,
  full,
}: {
  label: string;
  valor: string;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-card p-3 ${
        full ? "col-span-2" : ""
      }`}
    >
      <div className="text-[11px] text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{valor}</div>
    </div>
  );
}
