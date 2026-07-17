import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProfesional,
  profesionales,
  trabajosDeProfesional,
} from "@/lib/data";
import { Avatar, OficioBadge, Stars, Verificado } from "@/components/ui";
import BackBar from "@/components/BackBar";

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

  return (
    <div>
      <BackBar title={prof.nombre} />

      {/* Cabecera */}
      <section className="px-4 pt-4">
        <div className="flex items-start gap-4">
          <Avatar gradient={prof.avatar} inicial={prof.inicial} size={72} />
          <div className="flex-1 pt-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{prof.nombre}</h1>
            </div>
            <div className="mt-1">
              <OficioBadge oficio={prof.oficio} />
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <Stars value={prof.rating} />
              <span className="font-bold">{prof.rating}</span>
              <span className="text-muted">· {prof.trabajos} trabajos</span>
            </div>
          </div>
        </div>

        {/* Chips de estado */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            🟢 {prof.disponible}
          </span>
          <span className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
            💬 {prof.respondeEn}
          </span>
          <span className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-muted">
            📍 {prof.barrio} · hasta {prof.radioKm} km
          </span>
        </div>

        {/* Verificaciones */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 rounded-xl border border-line bg-card p-3">
          {prof.verificado && <Verificado label="Identidad verificada" />}
          {prof.matriculado && <Verificado label={`${prof.oficio} matriculado`} />}
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
            🤝 Recomendado por {prof.recomendadoPor} colegas
          </span>
        </div>

        <p className="mt-4 text-sm text-muted">{prof.bio}</p>

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
              className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
            >
              {e}
            </span>
          ))}
        </div>
      </Section>

      {/* Herramientas y garantía */}
      <Section title="Cómo trabaja">
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span>🧰</span>
            <span className="text-muted">{prof.herramientas.join(" · ")}</span>
          </li>
          <li className="flex gap-2">
            <span>🛡️</span>
            <span className="text-muted">Garantía: {prof.garantia}</span>
          </li>
        </ul>
      </Section>

      {/* Trabajos realizados */}
      <Section title={`Trabajos realizados (${trabajos.length})`}>
        {trabajos.length === 0 ? (
          <p className="text-sm text-muted">Todavía no cargó trabajos.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {trabajos.map((t) => (
              <Link
                key={t.id}
                href={`/trabajo/${t.id}`}
                className="overflow-hidden rounded-xl border border-line bg-card"
              >
                <div className="h-24 w-full" style={{ background: t.foto }} />
                <div className="p-2">
                  <p className="line-clamp-2 text-[12px] font-medium leading-tight">
                    {t.titulo}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-accent">
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
            <div key={t.id} className="rounded-xl border border-line bg-card p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{t.review.autor}</span>
                <Stars value={t.review.rating} />
              </div>
              <p className="mt-1 text-sm text-muted">“{t.review.texto}”</p>
              <p className="mt-1 text-[11px] text-muted">
                Trabajo: {t.titulo}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Barra de acción fija */}
      <div className="sticky bottom-[68px] z-30 mt-6 border-t border-line bg-card/95 p-3 backdrop-blur">
        <div className="flex gap-2">
          <a
            href="https://wa.me/5492210000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white active:scale-95"
          >
            💬 WhatsApp
          </a>
          <Link
            href="/trabajo/t1"
            className="flex flex-1 items-center justify-center rounded-xl bg-accent py-3 text-sm font-semibold text-white active:scale-95"
          >
            Pedir presupuesto
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-card py-3">
      <div className="text-lg font-bold">{valor}</div>
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
    <section className="mt-6 px-4">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}
