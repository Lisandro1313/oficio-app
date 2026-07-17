import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Onboarding from "@/components/Onboarding";

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
        <div className="mx-auto flex min-h-screen w-full max-w-[720px]">
          <Sidebar />
          <div className="relative min-h-screen w-full border-line md:border-x md:max-w-[460px]">
            <main className="flex-1 pb-24 md:pb-10">{children}</main>
          </div>
        </div>
        <BottomNav />
        <Onboarding />
      </body>
    </html>
  );
}
