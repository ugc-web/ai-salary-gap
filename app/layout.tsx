import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

// Both faces include the ₹ glyph (Archivo Black, the obvious brutalist choice, does not).
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["800"], variable: "--font-display", display: "swap" });
const sans = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-sans", display: "swap" });

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "AI Salary Gap Calculator — What could AI skills mean for your salary?",
  description:
    "Compare published salary benchmarks for your role in India, see where AI-skilled peers sit, and get a practical three-step AI learning roadmap. Free, no sign-up.",
  openGraph: { title: "AI Salary Gap Calculator", description: "Evidence-based salary benchmarks and an AI learning roadmap for your role.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FFFBF0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
