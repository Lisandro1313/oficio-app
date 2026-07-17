import { OFICIO_EMOJI, type Oficio } from "@/lib/data";

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
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
      <span>{OFICIO_EMOJI[oficio]}</span>
      {oficio}
    </span>
  );
}

export function Verificado({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#34d399">
        <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.5l.9-2.9-.9-2.9 2.4-1.8 1-2.8 3-.1L12 2Z" />
        <path d="m8.5 12 2.3 2.3 4.7-4.7" stroke="#0a0a0d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
