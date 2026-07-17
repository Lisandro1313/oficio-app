"use client";

import { useState } from "react";

export default function PedirTrabajo({
  trabajo,
  profesional,
}: {
  trabajo: string;
  profesional?: string;
}) {
  const [open, setOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white active:scale-[0.98]"
      >
        Pedir un trabajo parecido
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          onClick={() => {
            setOpen(false);
            setEnviado(false);
          }}
        >
          <div
            className="w-full max-w-[440px] rounded-t-3xl bg-card p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />

            {enviado ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">
                  ✅
                </div>
                <h3 className="text-lg font-bold">¡Pedido enviado!</h3>
                <p className="mt-1 text-sm text-muted">
                  {profesional ?? "El profesional"} te va a responder por acá.
                  Normalmente contesta en menos de 1 hora.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setEnviado(false);
                  }}
                  className="mt-5 w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white"
                >
                  Listo
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold">Pedir un trabajo parecido</h3>
                <p className="mt-1 text-sm text-muted">
                  Basado en: <span className="font-medium text-ink">{trabajo}</span>
                </p>

                <div className="mt-4 space-y-3">
                  <Campo label="¿Qué necesitás?" placeholder="Ej: hacer una parrilla parecida" />
                  <Campo label="¿En qué zona?" placeholder="Ej: Tolosa, La Plata" />
                  <Campo label="¿Para cuándo?" placeholder="Ej: en las próximas 2 semanas" />
                </div>

                <p className="mt-3 text-[11px] text-muted">
                  Para enviar vas a crear una cuenta rápida (solo tu número).
                  Recién ahí pedimos tus datos.
                </p>

                <button
                  onClick={() => setEnviado(true)}
                  className="mt-4 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white active:scale-[0.98]"
                >
                  Enviar pedido
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Campo({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent"
        placeholder={placeholder}
      />
    </label>
  );
}
