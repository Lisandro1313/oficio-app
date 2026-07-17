import Link from "next/link";
import { getProfesional, type Trabajo } from "@/lib/data";
import { Avatar, OficioBadge, Stars } from "@/components/ui";
import { ClockIcon, PinIcon } from "@/components/icons";

export default function JobCard({ trabajo }: { trabajo: Trabajo }) {
  const prof = getProfesional(trabajo.profId);

  return (
    <article className="overflow-hidden rounded-3xl border border-line card-grad shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      {/* Foto real del trabajo con degradado oscuro */}
      <Link href={`/trabajo/${trabajo.id}`} className="block">
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={trabajo.img}
            alt={trabajo.titulo}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="photo-shade absolute inset-0" />

          <div className="absolute left-3 top-3">
            <OficioBadge oficio={trabajo.oficio} />
          </div>
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
            <ClockIcon size={12} /> {trabajo.duracion}
          </div>

          {/* Título sobre la foto */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="mb-1 flex items-center gap-1 text-[11px] font-medium text-white/75">
              <PinIcon size={12} /> {trabajo.barrio} · {trabajo.fecha}
            </div>
            <h3 className="text-[17px] font-bold leading-snug text-white drop-shadow">
              {trabajo.titulo}
            </h3>
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
            <Avatar gradient={prof.avatar} inicial={prof.inicial} size={38} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-semibold">
                  {prof.nombre}
                </span>
                {prof.verificado && <VerifDot />}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Stars value={prof.rating} />
                <span className="font-semibold text-ink">{prof.rating}</span>
                <span>· {prof.trabajos} trabajos</span>
              </div>
            </div>
          </Link>
        )}

        <p className="line-clamp-2 text-sm text-muted">{trabajo.descripcion}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted">
              Costó
            </div>
            <span className="text-[15px] font-bold text-accent">
              {trabajo.precioRango}
            </span>
          </div>
          <Link
            href={`/trabajo/${trabajo.id}`}
            className="rounded-full bg-accent-strong px-4 py-2.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] active:scale-95"
          >
            Pedir algo parecido
          </Link>
        </div>
      </div>
    </article>
  );
}

function VerifDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#34d399">
      <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1L12 2Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" stroke="#0a0a0d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
