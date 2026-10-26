import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { SiteFx } from "@/components/Fx";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LogoDefs } from "@/components/Logo";
import { HEAD_SCRIPT, INTRO_SCRIPT } from "@/lib/inline-scripts";
import { siteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import "./globals.css";

// Inter e Inter Tight (Google Fonts, OFL) recortadas a los pesos que usa el sitio y a los
// caracteres del español: 53 KB en lugar de 93 KB. Se regeneran con fontTools (ver src/fonts/README.md).
const inter = localFont({
  src: "../fonts/inter-400-700.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});
const interTight = localFont({
  src: "../fonts/inter-tight-600-700.woff2",
  weight: "600 700",
  variable: "--font-inter-tight",
  display: "swap",
});
// Solo para el logo "ASPA RODEO" dentro de una pantalla de ejemplo: no se precarga.
const cinzel = Cinzel({ subsets: ["latin"], weight: "500", variable: "--font-cinzel", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Software a medida, apps y webs en Córdoba | Aspa Software",
    template: "%s | Aspa Software",
  },
  description:
    "Desarrollamos sistemas de gestión a medida, apps para celular, automatizaciones y webs para empresas. Equipo en Córdoba, Argentina. Propuesta sin costo.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang} className={`${inter.variable} ${interTight.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <div className="field" id="field" aria-hidden="true">
          <i className="b1"></i>
          <i className="b2"></i>
          <i className="b3"></i>
          <i className="b4"></i>
        </div>
        <div className="grain" aria-hidden="true"></div>
        <LogoDefs />
        <Header />
        {children}
        <Footer />
        <JsonLd data={siteSchema} />
        <SiteFx />
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </body>
    </html>
  );
}
