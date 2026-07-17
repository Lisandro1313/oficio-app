import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProfesional,
  profesionales,
  trabajosDeProfesional,
} from "@/lib/data";
import { Avatar, OficioBadge, Stars, Verificado } from "@/components/ui";
import BackBar from "@/components/BackBar";
import {
  ChatIcon,
  HandshakeIcon,
  PinIcon,
  ShieldIcon,
  ToolsIcon,
  WhatsappIcon,
} from "@/components/icons";

export function generateStaticParams() {
  return profesionales.map((p) => ({ id: p.id }));
}

export default async function Perfil({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prof = getProfesional(id);
  if (!prof) notFound();

  const trabajos = trabajosDeProfesional(prof.id);
  const cover = trabajos[0]?.img;

  return (
    <div>
      <div className="absolute left-0 right-0 top-0 z-40">
        <BackBar />
      </div>

      {/* Portada */}
      <div className="relative h-40 w-full overflow-hidden">
        {cover && (
          <img src={cover} alt="" className="h-full w-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/40 to-bg" />
      </div>

      {/* Cabecera */}
      <section className="-mt-12 px-4">
        <div className="flex items-end gap-4">
          <div className="rounded-full ring-4 ring-bg">
            <Avatar gradient={prof.avatar} inicial={prof.inicial} size={84} />
          </div>
          <div className="flex-1 pb-1">
            <div className="mb-1">
              <OficioBadge oficio={prof.oficio} />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">{prof.nombre}</h1>
          {prof.verificado && <VerifDot />}
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm">
          <Stars value={prof.rating} size={15} />
          <span className="font-bold">{prof.rating}</span>
          <span className="text-muted">· {prof.trabajos} trabajos · {prof.barrio}</span>
        </div>

        {/* Chips de estado */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {prof.disponible}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
            <ChatIcon size={13} /> {prof.respondeEn}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
            <PinIcon size={13} /> hasta {prof.radioKm} km
          </span>
        </div>

        {/* Verificaciones */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 rounded-2xl border border-line card-grad p-3.5">
          {prof.verificado && <Verificado label="Identidad verificada" />}
          {prof.matriculado && <Verificado label={`${prof.oficio} matriculado`} />}
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-400">
            <HandshakeIcon size={13} /> Recomendado por {prof.recomendadoPor} colegas
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{prof.bio}</p>

        {/* Datos rápidos */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat valor={`${prof.aniosExp}`} label="años de exp." />
          <Stat valor={`${prof.trabajos}`} label="trabajos" />
          <Stat valor={`$${(prof.precioDesde / 1000).toFixed(0)}k`} label="desde" />
        </div>
      </section>

      {/* Especialidades */}
      <Section title="Especialidades">
        <div className="flex flex-wrap gap-2">
          {prof.especialidades.map((e) => (
            <span
              key={e}
              className="rounded-full border border-accent-soft bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
            >
              {e}
            </span>
          ))}
        </div>
      </Section>

      {/* Cómo trabaja */}
      <Section title="Cómo trabaja">
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-start gap-2.5">
            <ToolsIcon size={16} className="mt-0.5 shrink-0 text-muted" />
            <span className="text-muted">{prof.herramientas.join(" · ")}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <ShieldIcon size={16} className="mt-0.5 shrink-0 text-muted" />
            <span className="text-muted">Garantía: {prof.garantia}</span>
          </li>
        </ul>
      </Section>

      {/* Trabajos realizados */}
      <Section title={`Trabajos realizados · ${trabajos.length}`}>
        {trabajos.length === 0 ? (
          <p className="text-sm text-muted">Todavía no cargó trabajos.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {trabajos.map((t) => (
              <Link
                key={t.id}
                href={`/trabajo/${t.id}`}
                className="group overflow-hidden rounded-2xl border border-line bg-card"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.titulo}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-active:scale-105"
                  />
                </div>
                <div className="p-2.5">
                  <p className="line-clamp-2 text-[12px] font-medium leading-tight">
                    {t.titulo}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-accent">
                    {t.precioRango}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {/* Reseñas */}
      <Section title="Reseñas verificadas">
        <div className="space-y-3">
          {trabajos.map((t) => (
            <div key={t.id} className="rounded-2xl border border-line card-grad p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{t.review.autor}</span>
                <Stars value={t.review.rating} />
              </div>
              <p className="mt-1.5 text-sm text-muted">“{t.review.texto}”</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                <ShieldIcon size={12} /> Trabajo: {t.titulo}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Barra de acción fija */}
      <div className="sticky bottom-[68px] z-30 mt-6 border-t border-line bg-surface/85 p-3 backdrop-blur-xl md:bottom-0">
        <div className="flex gap-2.5">
          <a
            href="https://wa.me/5492210000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-sm font-bold text-white active:scale-[0.98]"
          >
            <WhatsappIcon size={17} /> WhatsApp
          </a>
          <Link
            href="/trabajo/t1"
            className="flex flex-1 items-center justify-center rounded-2xl bg-accent-strong py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.4)] active:scale-[0.98]"
          >
            Pedir presupuesto
          </Link>
        </div>
      </div>
    </div>
  );
}

function VerifDot() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#34d399">
      <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1L12 2Z" />
      <path d="m8.5 12 2.3 2.3 4.7-4.7" stroke="#0a0a0d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stat({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line card-grad py-3.5">
      <div className="text-lg font-extrabold">{valor}</div>
      <div className="text-[11px] text-muted">{label}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7 px-4">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}
