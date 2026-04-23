import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, VT323, Fraunces, Inter } from "next/font/google";
import "./chooser.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono-chooser",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-pixel-chooser",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "600", "900"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mamadou Bobo Bah — Portfolio",
  description: "Deux portes d'entrée : une console retro ou une expérience éditoriale. Choisissez.",
  icons: { icon: "/icon.svg" },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const redirectScript = `(function(){try{
  if (location.search.indexOf('reset=1')>=0) return;
  var c = localStorage.getItem('mbb.experience');
  if (c === 'retro' || c === 'pro') location.replace('${basePath}/' + c + '/');
} catch(e) {}})();`;

export default function ChooserRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${jetbrainsMono.variable} ${vt323.variable} ${fraunces.variable} ${inter.variable}`}
    >
      <body className="chooser">
        <Script id="mbb-experience-redirect" strategy="beforeInteractive">
          {redirectScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
