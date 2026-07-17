"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { PinIcon, ShieldIcon, SearchIcon, HandshakeIcon } from "@/components/icons";

const KEY = "oficio_onboarded";

const puntos = [
  { icon: SearchIcon, texto: "Mirá trabajos reales cerca tuyo, sin registrarte." },
  { icon: ShieldIcon, texto: "Reseñas verificadas: solo puntúa quien contrató." },
  { icon: HandshakeIcon, texto: "Profesionales matriculados y recomendados entre colegas." },
];

export default function Onboarding() {
  const [show, setShow] = useState(false);
  const [rol, setRol] = useState<"cliente" | "pro" | null>(null);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  const cerrar = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-bg">
      {/* Fondo con collage tenue */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="grid h-full grid-cols-2">
          <img src="/trabajos/t1.jpg" alt="" className="h-full w-full object-cover" />
          <img src="/trabajos/t4.jpg" alt="" className="h-full w-full object-cover" />
          <img src="/trabajos/t2.jpg" alt="" className="h-full w-full object-cover" />
          <img src="/trabajos/t6.jpg" alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/85 to-bg" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[440px] flex-col px-6 py-10">
        <div className="mt-6">
          <Logo size={40} />
        </div>

        <h1 className="mt-8 text-3xl font-extrabold leading-tight">
          La red de los que
          <br />
          <span className="text-accent">laburan bien.</span>
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <PinIcon size={15} className="text-accent" /> Albañiles, electricistas,
          plomeros y más — en La Plata.
        </p>

        <div className="mt-8 space-y-4">
          {puntos.map(({ icon: Icon, texto }) => (
            <div key={texto} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={18} />
              </span>
              <span className="text-sm text-ink/90">{texto}</span>
            </div>
          ))}
        </div>

        {/* Rol */}
        <div className="mt-9">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
            Entrás como
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRol("cliente")}
              className={`rounded-2xl border p-4 text-left transition ${
                rol === "cliente"
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-card"
              }`}
            >
              <div className="text-sm font-bold">Busco a alguien</div>
              <div className="mt-0.5 text-xs text-muted">
                Necesito resolver algo
              </div>
            </button>
            <button
              onClick={() => setRol("pro")}
              className={`rounded-2xl border p-4 text-left transition ${
                rol === "pro"
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-card"
              }`}
            >
              <div className="text-sm font-bold">Ofrezco mi oficio</div>
              <div className="mt-0.5 text-xs text-muted">
                Quiero conseguir trabajo
              </div>
            </button>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={cerrar}
            className="w-full rounded-2xl bg-accent-strong py-4 text-sm font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.4)] active:scale-[0.98]"
          >
            {rol === "pro" ? "Empezar a mostrar mis trabajos" : "Explorar trabajos"}
          </button>
          <button
            onClick={cerrar}
            className="mt-2 w-full py-2 text-center text-xs text-muted"
          >
            Entrar sin elegir
          </button>
        </div>
      </div>
    </div>
  );
}
