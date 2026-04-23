import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import ExperienceSwitch from "@/components/shared/ExperienceSwitch";
import "./retro.css";

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
  title: "Mamadou Bobo Bah · Retro Console",
  description: "MBB/OS v3.2 — console retro LCD/PCB. Portfolio full-stack.",
  icons: { icon: "/icon.svg" },
};

export default function RetroRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jetbrainsMono.className} ${vt323.className} h-full`}>
      <body className="retro h-full">
        {children}
        <ExperienceSwitch variant="retro" />
      </body>
    </html>
  );
}
