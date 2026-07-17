import { type Oficio } from "@/lib/data";
import { OficioIcon, ShieldIcon } from "@/components/icons";

export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= Math.round(value) ? "#f59e0b" : "#e7e5e4"}
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.6 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </span>
  );
}

export function OficioBadge({ oficio }: { oficio: Oficio }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
      <OficioIcon oficio={oficio} size={13} />
      {oficio}
    </span>
  );
}

export function Verificado({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
      <ShieldIcon size={13} />
      {label}
    </span>
  );
}

export function Avatar({
  gradient,
  inicial,
  size = 44,
}: {
  gradient: string;
  inicial: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        background: gradient,
        fontSize: size * 0.36,
      }}
    >
      {inicial}
    </span>
  );
}
