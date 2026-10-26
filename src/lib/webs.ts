// Datos de Webs: rubros, webs hechas y planes. Una sola fuente para /webs, /webs/planes y
// las páginas por rubro (y para la metadata y el JSON-LD).
import type { StaticImageData } from "next/image";
import alero from "@/assets/work/alero.jpg";
import architecture360 from "@/assets/work/architecture-360.jpg";
import dh from "@/assets/work/dh-engineering.jpg";
import obliqua from "@/assets/work/obliqua.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import constructoraEjemplo from "@/assets/webs/constructora-ejemplo.jpg";
import cordillera from "@/assets/webs/cordillera.jpg";

export const FAMS = ["Arquitectura y diseño", "Construcción", "Inmobiliario"] as const;

export const RUBROS = [
  { slug: "arquitectos", menu: "Arquitectos", fam: 0 },
  { slug: "estudios-de-arquitectura", menu: "Estudios de arquitectura", fam: 0 },
  { slug: "interiorismo", menu: "Interiorismo", fam: 0 },
  { slug: "constructoras", menu: "Constructoras", fam: 1 },
  { slug: "constructoras-de-vivienda", menu: "Constructoras de viviendas", fam: 1 },
  { slug: "steel-framing", menu: "Steel framing", fam: 1 },
  { slug: "desarrollistas", menu: "Desarrollistas", fam: 2 },
] as const;
export type RubroSlug = (typeof RUBROS)[number]["slug"];

/** Webs hechas (capturas reales). `url`: se puede ver en vivo. */
export const GALLERY: { name: string; tipo: string; img: StaticImageData; url?: string }[] = [
  { name: "DH Engineering", tipo: "Ingeniería · Sitio completo", img: dh, url: "dhengconsulting.com" },
  { name: "Obliqua", tipo: "Estudio de arquitectura", img: obliqua, url: "obliqua-arq.vercel.app" },
  { name: "Paula Gil", tipo: "Arquitecta", img: paulaGil, url: "paula-gil-arquitecta.vercel.app" },
  { name: "Alero", tipo: "Estudio que construye", img: alero, url: "alero-rust.vercel.app" },
  { name: "Cordillera", tipo: "Constructora", img: cordillera, url: "cordillera-web-bice.vercel.app" },
  { name: "Architecture 360", tipo: "Desarrollista", img: architecture360, url: "architecture360.vercel.app/proyecto/demo" },
  { name: "Constructora (ejemplo)", tipo: "Constructora", img: constructoraEjemplo },
];

// TODO(precios): confirmar con Aspa que son los vigentes y si incluyen IVA (ver README).
export const PLANS = {
  landing: { name: "Landing", usd: 200, days: 10, pages: "1 página", works: "Hasta 6" },
  sitio: { name: "Sitio completo", usd: 600, days: 21, pages: "5 o más", works: "Hasta 15" },
  maintenanceUsd: 20,
} as const;
