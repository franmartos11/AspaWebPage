import type { Metadata } from "next";
import NosotrosClient from "./NosotrosClient";

export const metadata: Metadata = {
  title: "Quiénes Somos | El Equipo Detrás de Aspa Software",
  description:
    "Conocé al equipo de Aspa Software: programadores apasionados y especialistas en marketing y diseño dedicados a crear soluciones tecnológicas innovadoras en Argentina.",
  keywords: [
    "equipo Aspa Software",
    "quiénes somos empresa software Argentina",
    "desarrolladores software Buenos Aires",
    "empresa tecnológica Argentina",
    "startup software Argentina",
  ],
  alternates: { canonical: "https://www.aspasoftware.com/nosotros" },
  openGraph: {
    title: "Quiénes Somos | Aspa Software",
    description: "Conocé al equipo detrás de Aspa: programadores y especialistas dedicados a la innovación tecnológica.",
    url: "https://www.aspasoftware.com/nosotros",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Equipo Aspa Software" }],
  },
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}
