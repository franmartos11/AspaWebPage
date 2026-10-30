// Datos de Webs: rubros, webs hechas y planes. Una sola fuente para /webs, /webs/planes y
// las páginas por rubro (y para la metadata y el JSON-LD).
import type { StaticImageData } from "next/image";
import type { Lang } from "@/i18n";
import alero from "@/assets/work/alero.jpg";
import architecture360 from "@/assets/work/architecture-360.jpg";
import dh from "@/assets/work/dh-engineering.jpg";
import obliqua from "@/assets/work/obliqua.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import constructoraEjemplo from "@/assets/webs/constructora-ejemplo.jpg";
import cordillera from "@/assets/webs/cordillera.jpg";

/** Familias de rubros (el índice es `fam` de cada rubro). */
export const FAMS = {
  es: ["Arquitectura y diseño", "Construcción", "Inmobiliario"],
  en: ["Architecture & design", "Construction", "Real estate"],
} as const;

export const RUBROS = [
  // slug: el de la URL en español (en inglés se traduce con RUBRO_SLUGS de "@/i18n"); menuEn: nombre en inglés;
  // desc/descEn: la línea corta del menú de Webs
  { slug: "arquitectos", menu: "Arquitectos", menuEn: "Architects", fam: 0, desc: "Tus obras en un solo link", descEn: "Your work in one link" },
  {
    slug: "estudios-de-arquitectura",
    menu: "Estudios de arquitectura",
    menuEn: "Architecture studios",
    fam: 0,
    desc: "Portfolio, equipo y servicios",
    descEn: "Portfolio, team and services",
  },
  {
    slug: "interiorismo",
    menu: "Interiorismo",
    menuEn: "Interior design",
    fam: 0,
    desc: "Antes y después que convencen",
    descEn: "Before-and-afters that sell",
  },
  {
    slug: "constructoras",
    menu: "Constructoras",
    menuEn: "Construction companies",
    fam: 1,
    desc: "Para cada comitente y licitación",
    descEn: "For every client and bid",
  },
  {
    slug: "constructoras-de-vivienda",
    menu: "Constructoras de viviendas",
    menuEn: "Home builders",
    fam: 1,
    desc: "Las casas que ya hiciste",
    descEn: "The homes you've already built",
  },
  {
    slug: "steel-framing",
    menu: "Steel framing",
    menuEn: "Steel framing",
    fam: 1,
    desc: "El sistema explicado por dentro",
    descEn: "The system, explained inside out",
  },
  {
    slug: "desarrollistas",
    menu: "Desarrollistas",
    menuEn: "Real estate developers",
    fam: 2,
    desc: "Sala de ventas abierta 24 h",
    descEn: "A sales room open 24/7",
  },
] as const;
export type RubroSlug = (typeof RUBROS)[number]["slug"];

/** Webs hechas (capturas reales). `url`: se puede ver en vivo. `name`/`tipo` por idioma. */
export const GALLERY: { name: Record<Lang, string>; tipo: Record<Lang, string>; img: StaticImageData; url?: string }[] = [
  {
    name: { es: "DH Engineering", en: "DH Engineering" },
    tipo: { es: "Ingeniería · Sitio completo", en: "Engineering · Full website" },
    img: dh,
    url: "dhengconsulting.com",
  },
  {
    name: { es: "Obliqua", en: "Obliqua" },
    tipo: { es: "Estudio de arquitectura", en: "Architecture studio" },
    img: obliqua,
    url: "obliqua-arq.vercel.app",
  },
  { name: { es: "Paula Gil", en: "Paula Gil" }, tipo: { es: "Arquitecta", en: "Architect" }, img: paulaGil, url: "paula-gil-arquitecta.vercel.app" },
  { name: { es: "Alero", en: "Alero" }, tipo: { es: "Estudio que construye", en: "Design-build studio" }, img: alero, url: "alero-rust.vercel.app" },
  {
    name: { es: "Cordillera", en: "Cordillera" },
    tipo: { es: "Constructora", en: "Construction company" },
    img: cordillera,
    url: "cordillera-web-bice.vercel.app",
  },
  {
    name: { es: "Architecture 360", en: "Architecture 360" },
    tipo: { es: "Desarrollista", en: "Real estate developer" },
    img: architecture360,
    url: "architecture360.vercel.app/proyecto/demo",
  },
  {
    name: { es: "Constructora (ejemplo)", en: "Builder (sample)" },
    tipo: { es: "Constructora", en: "Construction company" },
    img: constructoraEjemplo,
  },
];

// TODO(precios): confirmar con Aspa que son los vigentes y si incluyen IVA (ver README).
export const PLANS = {
  landing: { name: "Landing", usd: 200, days: 10, pages: "1 página", works: "Hasta 6" },
  sitio: { name: "Sitio completo", usd: 600, days: 21, pages: "5 o más", works: "Hasta 15" },
  maintenanceUsd: 20,
} as const;

/** Textos de los planes en inglés (PLANS queda en español porque lo usan otras partes tal cual). */
const PLANS_EN = {
  landing: { name: "Landing page", pages: "1 page", works: "Up to 6" },
  sitio: { name: "Full website", pages: "5 or more", works: "Up to 15" },
} as const;

/** Los planes en un idioma (mismos precios y plazos; nombre, páginas y trabajos traducidos). */
export function plansIn(lang: Lang) {
  if (lang === "es") return PLANS;
  return {
    landing: { ...PLANS.landing, ...PLANS_EN.landing },
    sitio: { ...PLANS.sitio, ...PLANS_EN.sitio },
    maintenanceUsd: PLANS.maintenanceUsd,
  };
}
