// Casos: los sistemas propios (Aspa Rodeo y Aspa Scout) y el listado de /casos.
// Una sola fuente para las páginas, la metadata y el JSON-LD.
import type { StaticImageData } from "next/image";
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
import { ROUTES } from "./site";

export type Caso = {
  slug: "aspa-rodeo" | "aspa-scout";
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

export const CASOS: Record<Caso["slug"], Caso> = {
  "aspa-rodeo": {
    slug: "aspa-rodeo",
    name: "Rodeo",
    path: ROUTES.casoRodeo,
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
    shots: [
      { img: rodeo, cap: "Panel de inicio con alertas e indicadores" },
      { img: rodeoStock, cap: "Stock por lote" },
      { img: uiSanidad, cap: "Sanidad y vacunas" },
    ],
    manga: true,
    result: "Toda la hacienda en un solo lugar, pesadas desde la manga sin papel y avisos de sanidad antes de que algo venza.",
    cover: rodeo,
  },
  "aspa-scout": {
    slug: "aspa-scout",
    name: "Scout",
    path: ROUTES.casoScout,
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
    shots: [
      { img: scoutClientes, cap: "Clientes, abonos y cobros" },
      { img: scoutTareas, cap: "Tareas del equipo comercial" },
      { img: scoutProspectos, cap: "Prospectos" },
      { img: scoutBusquedas, cap: "Búsquedas activas" },
    ],
    result: "Todo el proceso comercial en un mismo lugar: de la búsqueda de prospectos al cobro, con el equipo coordinado.",
    cover: scoutClientes,
  },
};

/** El "otro caso" al pie de cada caso. */
export const NEXT: Record<Caso["slug"], Caso["slug"]> = { "aspa-rodeo": "aspa-scout", "aspa-scout": "aspa-rodeo" };

export const FILTERS = [
  { f: "all", label: "Todos" },
  { f: "sys", label: "Sistemas" },
  { f: "app", label: "Apps" },
  { f: "web", label: "Webs" },
] as const;

/** Listado de /casos: primero los proyectos reales, después los diseños de ejemplo por rubro. */
export const WORKS: { t: string; img: StaticImageData; href: string; f: string; real?: boolean }[] = [
  { t: "Aspa Rodeo", img: rodeo, href: ROUTES.casoRodeo, f: "sys app", real: true },
  { t: "Aspa Scout", img: scoutClientes, href: ROUTES.casoScout, f: "sys", real: true },
  { t: "DH Engineering", img: dh, href: ROUTES.rubro("constructoras"), f: "web", real: true },
  { t: "Obliqua", img: obliqua, href: ROUTES.rubro("estudios-de-arquitectura"), f: "web" },
  { t: "Paula Gil", img: paulaGil, href: ROUTES.rubro("arquitectos"), f: "web" },
  { t: "Alero", img: alero, href: ROUTES.rubro("constructoras-de-vivienda"), f: "web" },
  { t: "Cordillera", img: cordillera, href: ROUTES.rubro("constructoras"), f: "web" },
  { t: "Architecture 360", img: architecture360, href: ROUTES.rubro("desarrollistas"), f: "web" },
];
