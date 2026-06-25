import type { Metadata } from "next";
import DesarrolloWebClient from "./DesarrolloWebClient";

export const metadata: Metadata = {
  title: "Desarrollo Web Profesional | Páginas Web a Medida",
  description:
    "Creamos páginas web institucionales, e-commerce y landing pages de alto rendimiento para empresas en Argentina. Diseño moderno, SEO optimizado y máxima velocidad.",
  keywords: [
    "desarrollo web Argentina",
    "páginas web profesionales Buenos Aires",
    "diseño web empresas Argentina",
    "e-commerce Argentina",
    "landing page SEO Argentina",
    "agencia web Argentina",
  ],
  alternates: { canonical: "https://www.aspasoftware.com/desarrollo-web" },
  openGraph: {
    title: "Desarrollo Web | Aspa Software",
    description: "Páginas web institucionales, e-commerce y landing pages optimizadas para empresas argentinas.",
    url: "https://www.aspasoftware.com/desarrollo-web",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Desarrollo Web - Aspa Software" }],
  },
};

export default function DesarrolloWebPage() {
  return <DesarrolloWebClient />;
}
