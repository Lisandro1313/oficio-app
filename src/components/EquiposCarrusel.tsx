import Link from "next/link";
import { equipos, getProfesional } from "@/lib/data";
import { OficioIcon } from "@/components/icons";

export default function EquiposCarrusel() {
  return (
    <section className="mt-4">
      <div className="mb-2 flex items-center justify-between px-4">
        <h2 className="text-sm font-bold">Equipos cerca tuyo</h2>
        <span className="text-xs text-muted">Varios oficios, un solo contacto</span>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
        {equipos.map((e) => {
          const miembros = e.miembros
            .map((id) => getProfesional(id))
            .filter(Boolean)
            .slice(0, 5);
          return (
            <Link
              key={e.id}
              href={`/equipo/${e.id}`}
              className="relative w-64 shrink-0 overflow-hidden rounded-2xl border border-line"
            >
              <div className="relative h-28 w-full overflow-hidden">
                <img src={e.cover} alt={e.nombre} className="h-full w-full object-cover" />
                <div className="photo-shade absolute inset-0" />
                <div className="absolute left-3 top-3 flex gap-1">
                  {e.oficios.slice(0, 4).map((o) => (
                    <span
                      key={o}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
                    >
                      <OficioIcon oficio={o} size={13} />
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="text-sm font-bold text-white drop-shadow">
                    {e.nombre}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-card p-3">
                <div className="flex -space-x-2">
                  {miembros.map((m) =>
                    m ? (
                      <span
                        key={m.id}
                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card text-[10px] font-bold text-white"
                        style={{ background: m.avatar }}
                      >
                        {m.inicial}
                      </span>
                    ) : null
                  )}
                </div>
                <span className="text-xs font-semibold text-accent">
                  ★ {e.rating}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
