import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Oficio — La red de los que laburan bien",
  description:
    "Descubrí albañiles, electricistas, plomeros y gasistas de tu zona. Mirá sus trabajos, reseñas y disponibilidad. Sin vueltas.",
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Fondo tipo "escritorio" para que en desktop se vea como una app de celu */}
        <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#fbe9dc,transparent_55%)] flex justify-center">
          <div className="relative w-full max-w-[440px] min-h-screen bg-bg shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col">
            <main className="flex-1 pb-24">{children}</main>
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
