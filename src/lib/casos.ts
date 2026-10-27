// Casos: los sistemas propios (Aspa Rodeo y Aspa Scout) y el listado de /casos, en los dos idiomas.
// Una sola fuente para las páginas, la metadata y el JSON-LD.
import type { StaticImageData } from "next/image";
import { routes, type Lang } from "@/i18n";
import rodeoStock from "@/assets/casos/rodeo-stock.jpg";
import scoutBusquedas from "@/assets/casos/scout-busquedas.jpg";
import scoutProspectos from "@/assets/casos/scout-prospectos.jpg";
import uiSanidad from "@/assets/sistemas/ui-sanidad.jpg";
import alero from "@/assets/work/alero.jpg";
import architecture360 from "@/assets/work/architecture-360.jpg";
import rodeo from "@/assets/work/aspa-rodeo.jpg";
import scoutClientes from "@/assets/work/aspa-scout-clientes.jpg";
import scoutTareas from "@/assets/work/aspa-scout-tareas.jpg";
import dh from "@/assets/work/dh-engineering.jpg";
import obliqua from "@/assets/work/obliqua.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import cordillera from "@/assets/webs/cordillera.jpg";

export type CasoSlug = "aspa-rodeo" | "aspa-scout";

export type Caso = {
  slug: CasoSlug;
  name: string;
  path: string;
  seoTitle: string;
  description: string;
  lead: string;
  feat: [string, string][];
  problem: string;
  mods: [string, string][];
  shots: { img: StaticImageData; cap: string }[];
  /** la app de la manga (solo Rodeo) */
  manga?: boolean;
  result: string;
  /** imagen del caso: tarjeta del otro caso y JSON-LD */
  cover: StaticImageData;
};

/** Textos de cada caso (la forma de `en` es la de `es`). */
type CasoText = Pick<Caso, "seoTitle" | "description" | "lead" | "feat" | "problem" | "mods" | "result"> & { caps: string[] };

const BASE: Record<CasoSlug, { name: string; page: "casoRodeo" | "casoScout"; imgs: StaticImageData[]; manga?: boolean; cover: StaticImageData }> = {
  "aspa-rodeo": { name: "Rodeo", page: "casoRodeo", imgs: [rodeo, rodeoStock, uiSanidad], manga: true, cover: rodeo },
  "aspa-scout": { name: "Scout", page: "casoScout", imgs: [scoutClientes, scoutTareas, scoutProspectos, scoutBusquedas], cover: scoutClientes },
};

const TEXT: Record<CasoSlug, Record<Lang, CasoText>> = {
  "aspa-rodeo": {
    es: {
      seoTitle: "Aspa Rodeo: sistema de gestión de hacienda",
      description:
        "Caso Aspa Rodeo: sistema de gestión ganadera con stock por lote y categoría, pesadas desde la manga con el celular, calendario de sanidad con avisos y movimientos entre potreros.",
      lead: "Sistema de gestión de hacienda para establecimientos ganaderos. Stock de animales, pesadas, sanidad y movimientos, en un solo lugar y al día.",
      feat: [
        ["Rubro", "Campo"],
        ["Stock", "por lote y categoría"],
        ["Pesadas", "desde la manga"],
        ["Sanidad", "calendario y avisos"],
        ["Movimientos", "entre potreros y ventas"],
      ],
      problem:
        "La hacienda se llevaba en planillas que solo entendía una persona, con varias versiones del mismo archivo. Las pesadas se anotaban en papel en la manga y se pasaban después, y las vacunas se controlaban de memoria.",
      mods: [
        ["Stock", "Cabezas por lote, categoría y potrero, siempre actualizadas."],
        ["Pesadas", "Se cargan desde el celular en la manga y calculan la ganancia diaria."],
        ["Sanidad", "Calendario de vacunas con avisos antes de que venzan."],
        ["Movimientos", "Traslados entre potreros, compras y ventas, con historial."],
      ],
      caps: ["Panel de inicio con alertas e indicadores", "Stock por lote", "Sanidad y vacunas"],
      result: "Toda la hacienda en un solo lugar, pesadas desde la manga sin papel y avisos de sanidad antes de que algo venza.",
    },
    en: {
      seoTitle: "Aspa Rodeo: livestock management system",
      description:
        "Aspa Rodeo case study: a cattle management system with inventory by lot and category, chute-side weigh-ins from a phone, a health calendar with alerts, and moves between paddocks.",
      lead: "A livestock management system for cattle operations. Herd inventory, weigh-ins, health and movements, all in one place and always up to date.",
      feat: [
        ["Industry", "Ranching"],
        ["Inventory", "by lot and category"],
        ["Weigh-ins", "right at the chute"],
        ["Health", "calendar and alerts"],
        ["Movements", "between paddocks and sales"],
      ],
      problem:
        "The herd was tracked in spreadsheets only one person understood, with several versions of the same file. Weights were jotted down on paper at the chute and typed in later, and vaccinations were tracked from memory.",
      mods: [
        ["Inventory", "Head count by lot, category and paddock, always up to date."],
        ["Weigh-ins", "Entered from a phone at the chute, with average daily gain calculated automatically."],
        ["Health", "Vaccination calendar with alerts before anything comes due."],
        ["Movements", "Transfers between paddocks, purchases and sales, with full history."],
      ],
      caps: ["Home dashboard with alerts and key metrics", "Inventory by lot", "Health and vaccinations"],
      result: "The whole herd in one place, paperless weigh-ins at the chute and health alerts before anything comes due.",
    },
  },
  "aspa-scout": {
    es: {
      seoTitle: "Aspa Scout: sistema de gestión comercial",
      description:
        "Caso Aspa Scout: sistema comercial para buscar prospectos por rubro, zona y tamaño, ordenar conversaciones por mail y WhatsApp, propuestas, abonos y cobros, y las tareas del equipo.",
      lead: "Sistema de gestión comercial para conseguir y ordenar clientes: búsquedas de prospectos, conversaciones, propuestas, clientes con abonos y cobros, tareas del equipo y resultados.",
      feat: [
        ["Rubro", "Comercial"],
        ["Búsquedas", "por rubro, zona y tamaño"],
        ["Conversaciones", "mail y WhatsApp"],
        ["Clientes", "abonos y cobros"],
        ["Equipo", "tareas, calendario y resultados"],
      ],
      problem:
        "Los prospectos estaban en planillas y chats sueltos, nadie sabía a quién se le había escrito ni cuándo hacer el seguimiento, y los cobros de los abonos se controlaban a mano.",
      mods: [
        ["Búsquedas y prospectos", "Encuentra empresas que encajan con el cliente ideal, con sus datos de contacto."],
        ["Conversaciones", "Todos los mensajes con cada prospecto en un solo lugar."],
        ["Propuestas y clientes", "Del primer contacto a la propuesta, y después los abonos y cobros."],
        ["Tareas y resultados", "Calendario del equipo, automatizaciones y cómo rinde cada uno."],
      ],
      caps: ["Clientes, abonos y cobros", "Tareas del equipo comercial", "Prospectos", "Búsquedas activas"],
      result: "Todo el proceso comercial en un mismo lugar: de la búsqueda de prospectos al cobro, con el equipo coordinado.",
    },
    en: {
      seoTitle: "Aspa Scout: sales management system",
      description:
        "Aspa Scout case study: a sales system to find prospects by industry, area and size, organize email and WhatsApp conversations, proposals, subscriptions and billing, and team tasks.",
      lead: "A sales management system to win and organize customers: prospect searches, conversations, proposals, customers with subscriptions and billing, team tasks and results.",
      feat: [
        ["Industry", "Sales"],
        ["Searches", "by industry, area and size"],
        ["Conversations", "email and WhatsApp"],
        ["Customers", "subscriptions and billing"],
        ["Team", "tasks, calendar and results"],
      ],
      problem:
        "Prospects lived in spreadsheets and scattered chats, nobody knew who had already been contacted or when to follow up, and subscription payments were tracked by hand.",
      mods: [
        ["Searches and prospects", "Finds companies that match the ideal customer profile, along with their contact details."],
        ["Conversations", "Every message with each prospect, all in one place."],
        ["Proposals and customers", "From first contact to proposal, then subscriptions and billing."],
        ["Tasks and results", "Team calendar, automations and how each person is performing."],
      ],
      caps: ["Customers, subscriptions and billing", "Sales team tasks", "Prospects", "Active searches"],
      result: "The entire sales process in one place: from finding prospects to getting paid, with the whole team in sync.",
    },
  },
};

/** Un caso en un idioma. */
export function caso(slug: CasoSlug, lang: Lang): Caso {
  const b = BASE[slug],
    { caps, ...t } = TEXT[slug][lang];
  return {
    slug,
    name: b.name,
    path: routes(lang)[b.page],
    ...t,
    shots: b.imgs.map((img, i) => ({ img, cap: caps[i] })),
    ...(b.manga && { manga: true }),
    cover: b.cover,
  };
}

/** El "otro caso" al pie de cada caso. */
export const NEXT: Record<CasoSlug, CasoSlug> = { "aspa-rodeo": "aspa-scout", "aspa-scout": "aspa-rodeo" };

export const FILTERS = [
  { f: "all", label: { es: "Todos", en: "All" } },
  { f: "sys", label: { es: "Sistemas", en: "Systems" } },
  { f: "app", label: { es: "Apps", en: "Apps" } },
  { f: "web", label: { es: "Webs", en: "Websites" } },
] as const;

/** Listado de /casos: primero los proyectos reales, después los diseños de ejemplo por rubro. */
export function works(lang: Lang): { t: string; img: StaticImageData; href: string; f: string; real?: boolean }[] {
  const r = routes(lang);
  return [
    { t: "Aspa Rodeo", img: rodeo, href: r.casoRodeo, f: "sys app", real: true },
    { t: "Aspa Scout", img: scoutClientes, href: r.casoScout, f: "sys", real: true },
    { t: "DH Engineering", img: dh, href: r.rubro("constructoras"), f: "web", real: true },
    { t: "Obliqua", img: obliqua, href: r.rubro("estudios-de-arquitectura"), f: "web" },
    { t: "Paula Gil", img: paulaGil, href: r.rubro("arquitectos"), f: "web" },
    { t: "Alero", img: alero, href: r.rubro("constructoras-de-vivienda"), f: "web" },
    { t: "Cordillera", img: cordillera, href: r.rubro("constructoras"), f: "web" },
    { t: "Architecture 360", img: architecture360, href: r.rubro("desarrollistas"), f: "web" },
  ];
}
