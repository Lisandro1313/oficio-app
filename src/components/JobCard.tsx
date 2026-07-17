import Link from "next/link";
import { getProfesional, type Trabajo } from "@/lib/data";
import { Avatar, OficioBadge, Stars } from "@/components/ui";

export default function JobCard({ trabajo }: { trabajo: Trabajo }) {
  const prof = getProfesional(trabajo.profId);

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
      {/* Foto del trabajo (placeholder con gradiente) */}
      <Link href={`/trabajo/${trabajo.id}`} className="block">
        <div
          className="relative h-52 w-full"
          style={{ background: trabajo.foto }}
        >
          <div className="absolute left-3 top-3">
            <OficioBadge oficio={trabajo.oficio} />
          </div>
          <div className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            📍 {trabajo.barrio}
          </div>
          <div className="absolute bottom-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            🕐 {trabajo.duracion}
          </div>
        </div>
      </Link>

      <div className="p-4">
        {/* Cabecera del profesional */}
        {prof && (
          <Link
            href={`/perfil/${prof.id}`}
            className="mb-3 flex items-center gap-3"
          >
            <Avatar gradient={prof.avatar} inicial={prof.inicial} size={40} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-semibold">
                  {prof.nombre}
                </span>
                {prof.verificado && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#059669">
                    <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1L12 2Z" />
                    <path d="m8.5 12 2.3 2.3 4.7-4.7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Stars value={prof.rating} />
                <span className="font-medium text-ink">{prof.rating}</span>
                <span>· {prof.trabajos} trabajos</span>
              </div>
            </div>
          </Link>
        )}

        <Link href={`/trabajo/${trabajo.id}`} className="block">
          <h3 className="text-[15px] font-semibold leading-snug">
            {trabajo.titulo}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {trabajo.descripcion}
          </p>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-accent">
            {trabajo.precioRango}
          </span>
          <Link
            href={`/trabajo/${trabajo.id}`}
            className="rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white active:scale-95"
          >
            Pedir algo parecido
          </Link>
        </div>
      </div>
    </article>
  );
}
