import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { SiteFx } from "@/components/Fx";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LogoDefs } from "@/components/Logo";
import { LOCALE, type Lang } from "@/i18n";
import { HEAD_SCRIPT, INTRO_SCRIPT } from "@/lib/inline-scripts";
import { siteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import "@/app/globals.css";

// Inter e Inter Tight (Google Fonts, OFL) recortadas a los pesos que usa el sitio y a los
// caracteres latinos: 53 KB en lugar de 93 KB. Se regeneran con fontTools (ver src/fonts/README.md).
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
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-cinzel",
  display: "swap",
  preload: false,
});

const META = {
  es: {
    title: "Software a medida, apps y webs en Córdoba | Aspa Software",
    description:
      "Desarrollamos sistemas de gestión a medida, apps para celular, automatizaciones y webs para empresas. Equipo en Córdoba, Argentina. Propuesta sin costo.",
    skip: "Saltar al contenido",
  },
  en: {
    title: "Custom software, apps and websites | Aspa Software",
    description:
      "We build custom business management systems, mobile apps, automations and websites for companies. Team based in Córdoba, Argentina. Free proposal.",
    skip: "Skip to content",
  },
} as const;

/** Metadata común de cada idioma (las páginas suman título, descripción, canónica y hreflang). */
export function siteMetadata(lang: Lang): Metadata {
  const m = META[lang];
  return {
    metadataBase: new URL(SITE.url),
    title: { default: m.title, template: "%s | Aspa Software" },
    description: m.description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: LOCALE[lang].og,
      url: lang === "es" ? "/" : "/en",
    },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export const siteViewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

/** Clases de las fuentes y lang para <html> (el layout raíz escribe <html> y <body> él mismo: si
 *  vinieran de un componente, React no los reconoce como los del documento al hidratar). */
export const htmlProps = (lang: Lang) => ({ lang: LOCALE[lang].html, className: `${inter.variable} ${interTight.variable} ${cinzel.variable}` });

export const SiteHead = () => <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />;

/** Contenido común del <body> de cada idioma: los dos layouts raíz ((es) y (en)) lo usan. */
export function SiteBody({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        {META[lang].skip}
      </a>
      <div className="field" id="field" aria-hidden="true">
        <i className="b1"></i>
        <i className="b2"></i>
        <i className="b3"></i>
        <i className="b4"></i>
      </div>
      <div className="grain" aria-hidden="true"></div>
      <LogoDefs />
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
      <JsonLd data={siteSchema} />
      <SiteFx />
      {/* acá la arma el script de la intro antes de hidratar: React no compara su contenido */}
      <div id="introHost" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
    </>
  );
}
