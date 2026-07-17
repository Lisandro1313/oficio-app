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
      <div className="absolute left-0 right-0 top-0 z-40">
        <BackBar />
      </div>

      {/* Foto grande */}
      <div className="relative h-72 w-full overflow-hidden">
        <img src={trabajo.img} alt={trabajo.titulo} className="h-full w-full object-cover" />
        <div className="photo-shade absolute inset-0" />
        <div className="absolute left-3 top-16">
          <OficioBadge oficio={trabajo.oficio} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mb-1 flex gap-2 text-[11px] font-medium text-white/70">
            📍 {trabajo.barrio} · {trabajo.fecha}
          </div>
          <h1 className="text-xl font-extrabold leading-snug text-white drop-shadow">
            {trabajo.titulo}
          </h1>
        </div>
      </div>

      <div className="p-4">
        {/* Profesional */}
        {prof && (
          <Link
            href={`/perfil/${prof.id}`}
            className="flex items-center gap-3 rounded-2xl border border-line card-grad p-3"
          >
            <Avatar gradient={prof.avatar} inicial={prof.inicial} size={44} />
            <div className="flex-1">
              <div className="text-sm font-semibold">{prof.nombre}</div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Stars value={prof.rating} />
                <span className="font-semibold text-ink">{prof.rating}</span>
                <span>· {prof.barrio}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-accent">Ver perfil →</span>
          </Link>
        )}

        <p className="mt-4 text-sm leading-relaxed text-ink/90">
          {trabajo.descripcion}
        </p>

        {/* Ficha */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Ficha label="💰 Precio" valor={trabajo.precioRango} />
          <Ficha label="🕐 Duración" valor={trabajo.duracion} />
          <Ficha label="🧱 Materiales" valor={trabajo.materiales} full />
        </div>

        {/* Reseña del cliente */}
        <div className="mt-4 rounded-2xl border border-accent-soft bg-accent-soft/40 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              Opinión de {trabajo.review.autor}
            </span>
            <Stars value={trabajo.review.rating} />
          </div>
          <p className="mt-1.5 text-sm text-muted">“{trabajo.review.texto}”</p>
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            ✅ Reseña verificada — contrató por la app
          </p>
        </div>
      </div>

      {/* Acción */}
      <div className="sticky bottom-[68px] z-30 border-t border-line bg-surface/85 p-3 backdrop-blur-xl">
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
      className={`rounded-2xl border border-line card-grad p-3.5 ${
        full ? "col-span-2" : ""
      }`}
    >
      <div className="text-[11px] text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{valor}</div>
    </div>
  );
}
