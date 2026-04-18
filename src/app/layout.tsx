import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mamadou Bobo Bah — Senior Full Stack Engineer",
  description: "Portfolio de Mamadou Bobo Bah, Senior Full Stack Engineer basé à Dakar. React/Next.js, Node.js, automatisation, IA appliquée.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jetbrainsMono.className} ${vt323.className} h-full`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
