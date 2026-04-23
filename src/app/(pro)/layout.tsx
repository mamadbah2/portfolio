import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import ExperienceSwitch from "@/components/shared/ExperienceSwitch";
import "./pro.css";

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
  title: "Mamadou Bobo Bah — Senior Full Stack Engineer · Dakar",
  description: "Portfolio éditorial. Java, Spring, React, Go. 30+ projets livrés. Basé à Dakar.",
  icons: { icon: "/icon.svg" },
};

export default function ProRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="pro">
        {children}
        <ExperienceSwitch variant="pro" />
      </body>
    </html>
  );
}
