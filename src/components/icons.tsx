import type { Oficio } from "@/lib/data";

type P = { size?: number; className?: string };

const svg = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

export function AlbanilIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M3 8h18M3 16h18" />
      <path d="M8 4v4M15 4v4M5 12v4M12 12v4M19 12v4M12 20v-4" />
      <rect x="3" y="4" width="18" height="16" rx="1" />
    </svg>
  );
}

export function ElectricistaIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

export function PlomeroIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.5 1.5 0 0 0 2 2l6-6a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
    </svg>
  );
}

export function GasistaIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-1 .5-2 1 2 2.5 3 2.5 5.5a5 5 0 1 1-10 0C7 9 12 8 12 3Z" />
    </svg>
  );
}

export function PintorIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <rect x="3" y="4" width="14" height="6" rx="1.5" />
      <path d="M17 7h2.5A1.5 1.5 0 0 1 21 8.5V11a1 1 0 0 1-1 1h-8a1 1 0 0 0-1 1v1" />
      <rect x="9.5" y="14" width="3" height="6" rx="1" />
    </svg>
  );
}

export function OficioIcon({
  oficio,
  size = 16,
  className,
}: P & { oficio: Oficio }) {
  const map = {
    Albañil: AlbanilIcon,
    Electricista: ElectricistaIcon,
    Plomero: PlomeroIcon,
    Gasista: GasistaIcon,
    Pintor: PintorIcon,
  } as const;
  const Cmp = map[oficio];
  return <Cmp size={size} className={className} />;
}

export function PinIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ChatIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-4.5a8.4 8.4 0 0 1-.9-4A8.4 8.4 0 0 1 12 4a8.4 8.4 0 0 1 9 7.5Z" />
    </svg>
  );
}

export function ShieldIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

export function ToolsIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M14.5 5.5a3.5 3.5 0 0 0 4.5 4.5L21 12l-7 7-2-2 4-4" />
      <path d="M6 8 3 5l2-2 3 3M9 11l-6 6 2 2 6-6" />
    </svg>
  );
}

export function HandshakeIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="m11 17 2 2a1 1 0 0 0 3-1 1 1 0 0 0 3-1 1 1 0 0 0 2-1.5L18 11" />
      <path d="M2 12h3l3-3 4 3 2-1" />
      <path d="M22 12h-2l-3-3" />
    </svg>
  );
}

export function SearchIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function HomeIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

export function MapIcon({ size = 16, className }: P) {
  return (
    <svg {...svg(size, className)}>
      <path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6 9 3Z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

export function HeartIcon({
  size = 16,
  className,
  filled,
}: P & { filled?: boolean }) {
  return (
    <svg {...svg(size, className)} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20s-7-4.35-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5.15-7 9.5-7 9.5Z" />
    </svg>
  );
}

export function WhatsappIcon({ size = 18, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6 0l.9-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" />
    </svg>
  );
}
