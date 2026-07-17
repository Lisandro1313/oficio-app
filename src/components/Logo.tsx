export function LogoMark({ size = 32 }: { size?: number }) {
  const id = "og" + size;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${id})`} />
      {/* Casco de obra */}
      <path
        d="M12 25a8 8 0 0 1 16 0Z"
        fill="#fff"
      />
      <rect x="8.5" y="24.5" width="23" height="3.4" rx="1.7" fill="#fff" />
      <path d="M20 17v-3.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17.4 25a2.6 2.6 0 0 1 5.2 0" stroke="#ea580c" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  size = 30,
  text = true,
}: {
  size?: number;
  text?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark size={size} />
      {text && (
        <span
          className="font-extrabold tracking-tight"
          style={{ fontSize: size * 0.72 }}
        >
          Oficio<span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}
