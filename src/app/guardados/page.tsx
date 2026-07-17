import Link from "next/link";
import { profesionales } from "@/lib/data";
import { Avatar, OficioBadge, Stars } from "@/components/ui";

// En la maqueta mostramos 2 profesionales "guardados" fijos.
const guardadosIds = ["ramon-fernandez", "carlos-gomez"];

export default function Guardados() {
  const guardados = profesionales.filter((p) => guardadosIds.includes(p.id));

  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 px-4 pb-3 pt-5 backdrop-blur">
        <h1 className="text-xl font-bold">Guardados</h1>
        <p className="text-xs text-muted">
          Tus profesionales para cuando los necesites
        </p>
      </header>

      <div className="space-y-3 p-4">
        {guardados.map((p) => (
          <Link
            key={p.id}
            href={`/perfil/${p.id}`}
            className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3"
          >
            <Avatar gradient={p.avatar} inicial={p.inicial} size={52} />
            <div className="flex-1">
              <div className="text-sm font-semibold">{p.nombre}</div>
              <div className="mt-0.5">
                <OficioBadge oficio={p.oficio} />
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                <Stars value={p.rating} />
                <span className="font-medium text-ink">{p.rating}</span>
                <span>· {p.barrio}</span>
              </div>
            </div>
            <span className="text-accent">❤️</span>
          </Link>
        ))}

        <div className="rounded-2xl border border-dashed border-line p-6 text-center">
          <p className="text-sm text-muted">
            Tocá el ❤️ en cualquier profesional para tenerlo a mano acá.
          </p>
        </div>
      </div>
    </div>
  );
}
