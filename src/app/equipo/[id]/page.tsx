import Link from "next/link";
import { notFound } from "next/navigation";
import { equipos, getEquipo, getProfesional } from "@/lib/data";
import { Avatar, OficioBadge, Stars } from "@/components/ui";
import BackBar from "@/components/BackBar";
import PedirTrabajo from "@/components/PedirTrabajo";
import { PinIcon } from "@/components/icons";

export function generateStaticParams() {
  return equipos.map((e) => ({ id: e.id }));
}

export default async function EquipoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipo = getEquipo(id);
  if (!equipo) notFound();

  const miembros = equipo.miembros
    .map((m) => getProfesional(m))
    .filter((p): p is NonNullable<ReturnType<typeof getProfesional>> => Boolean(p));

  return (
    <div>
      <div className="absolute left-0 right-0 top-0 z-40">
        <BackBar />
      </div>

      {/* Portada */}
      <div className="relative h-56 w-full overflow-hidden">
        <img src={equipo.cover} alt={equipo.nombre} className="h-full w-full object-cover" />
        <div className="photo-shade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mb-2 flex gap-1.5">
            {equipo.oficios.map((o) => (
              <OficioBadge key={o} oficio={o} />
            ))}
          </div>
          <h1 className="text-2xl font-extrabold text-white drop-shadow">
            {equipo.nombre}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
            <Stars value={equipo.rating} />
            <span className="font-bold text-white">{equipo.rating}</span>
            <span>· {equipo.trabajos} trabajos en equipo</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
            <PinIcon size={13} /> {equipo.zona}
          </span>
          <span className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
            Desde ${(equipo.desde / 1000).toFixed(0)}k
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {equipo.descripcion}
        </p>

        {/* Cómo funciona */}
        <div className="mt-5 rounded-2xl border border-line card-grad p-4">
          <h2 className="text-sm font-bold">Cómo funciona</h2>
          <ol className="mt-3 space-y-3">
            {[
              "Contás qué querés hacer y te pasamos un presupuesto único.",
              "El equipo se coordina solo: cada uno hace su parte en orden.",
              "Un solo contacto, una sola garantía, un solo pago.",
            ].map((paso, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-strong text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-muted">{paso}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Integrantes */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase tracking-widest text-muted">
          El equipo · {miembros.length} integrantes
        </h2>
        <div className="space-y-2.5">
          {miembros.map((m) => (
            <Link
              key={m.id}
              href={`/perfil/${m.id}`}
              className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3"
            >
              <Avatar gradient={m.avatar} inicial={m.inicial} size={44} />
              <div className="flex-1">
                <div className="text-sm font-semibold">{m.nombre}</div>
                <div className="mt-0.5">
                  <OficioBadge oficio={m.oficio} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Stars value={m.rating} />
                <span className="font-semibold text-ink">{m.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Acción */}
      <div className="sticky bottom-[68px] z-30 border-t border-line bg-surface/85 p-3 backdrop-blur-xl md:bottom-0">
        <PedirTrabajo trabajo={`Trabajo con ${equipo.nombre}`} profesional={equipo.nombre} />
      </div>
    </div>
  );
}
