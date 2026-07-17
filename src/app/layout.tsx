import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oficio — La red de los que laburan bien",
  description:
    "Descubrí albañiles, electricistas, plomeros y gasistas de tu zona. Mirá sus trabajos, reseñas y disponibilidad. Sin vueltas.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0d",
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
    <html lang="es" className={jakarta.variable}>
      <body className="font-sans">
        {/* Fondo tipo "escritorio" para que en desktop se vea como una app de celu */}
        <div className="flex min-h-screen w-full justify-center bg-[#050506]">
          <div className="relative flex min-h-screen w-full max-w-[440px] flex-col bg-bg shadow-[0_0_80px_rgba(0,0,0,0.6)]">
            <main className="flex-1 pb-24">{children}</main>
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
