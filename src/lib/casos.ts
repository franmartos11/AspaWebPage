// Casos: los sistemas propios (Aspa Rodeo y Aspa Scout) y el listado de /casos, en los dos idiomas.
// Una sola fuente para las páginas, la metadata y el JSON-LD.
import type { StaticImageData } from "next/image";
import { routes, type Lang } from "@/i18n";
import rodeoStock from "@/assets/casos/rodeo-stock.jpg";
import scoutBusquedas from "@/assets/casos/scout-busquedas.jpg";
import scoutCalendario from "@/assets/casos/scout-calendario.jpg";
import scoutClientes from "@/assets/casos/scout-clientes.jpg";
import scoutConversaciones from "@/assets/casos/scout-conversaciones.jpg";
import scoutEquipo from "@/assets/casos/scout-equipo.jpg";
import scoutProspectos from "@/assets/casos/scout-prospectos.jpg";
import scoutResultados from "@/assets/casos/scout-resultados.jpg";
import scoutTareas from "@/assets/casos/scout-tareas.jpg";
import uiSanidad from "@/assets/sistemas/ui-sanidad.jpg";
import alero from "@/assets/work/alero.jpg";
import architecture360 from "@/assets/work/architecture-360.jpg";
import rodeo from "@/assets/work/aspa-rodeo.jpg";
import scoutCard from "@/assets/work/aspa-scout-clientes.jpg";
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
  /** el problema como antes / después, una fila por dolor (solo Scout) */
  pains?: [string, string][];
  mods: [string, string][];
  shots: { img: StaticImageData; cap: string }[];
  /** la app de la manga (solo Rodeo) */
  manga?: boolean;
  /** recorrido módulo por módulo, con texto y captura (solo Scout): reemplaza la grilla de módulos y la de capturas */
  tour?: { h: string; d: string; pts: string[]; img: StaticImageData; cap: string }[];
  /** captura central del hero con escena (solo Scout) */
  showcase?: StaticImageData;
  result: string;
  /** imagen del caso: tarjeta del otro caso y JSON-LD */
  cover: StaticImageData;
};

/** Textos de cada caso (la forma de `en` es la de `es`). */
type CasoText = Pick<Caso, "seoTitle" | "description" | "lead" | "feat" | "problem" | "pains" | "mods" | "result"> & { caps: string[]; pts?: string[][] };

const BASE: Record<
  CasoSlug,
  {
    name: string;
    page: "casoRodeo" | "casoScout";
    imgs: StaticImageData[];
    manga?: boolean;
    tour?: boolean;
    showcase?: StaticImageData;
    cover: StaticImageData;
  }
> = {
  "aspa-rodeo": {
    name: "Rodeo",
    page: "casoRodeo",
    imgs: [rodeo, rodeoStock, uiSanidad],
    manga: true,
    cover: rodeo,
  },
  "aspa-scout": {
    name: "Scout",
    page: "casoScout",
    imgs: [scoutBusquedas, scoutProspectos, scoutConversaciones, scoutCalendario, scoutTareas, scoutClientes, scoutResultados, scoutEquipo],
    tour: true,
    showcase: scoutResultados,
    cover: scoutClientes,
  },
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
        "Caso Aspa Scout: sistema comercial que releva empresas en Google Maps por rubro y zona, programa los WhatsApp respetando el tope de cada línea, junta todos los chats en una bandeja y lleva calendario, tareas, clientes con abonos y resultados del equipo.",
      lead: "Sistema de gestión comercial, de la búsqueda al cobro: encuentra prospectos en Google Maps, programa los primeros mensajes por WhatsApp, junta todas las conversaciones y lleva el seguimiento, los cobros y los resultados del equipo.",
      feat: [
        ["Rubro", "Comercial"],
        ["Búsquedas", "en Google Maps, por rubro y zona"],
        ["Envíos", "WhatsApp programados por línea"],
        ["Clientes", "abonos, cobros y deudas"],
        ["Equipo", "tareas, calendario y resultados"],
      ],
      problem: "Antes de Scout, todo el proceso comercial se hacía a mano y en lugares distintos. Esto es lo que cambió.",
      pains: [
        ["Los prospectos se buscaban a mano, uno por uno", "Scout los releva en Google Maps por rubro y zona"],
        ["Datos repartidos en planillas y chats sueltos", "Una sola base, con el puntaje y el canal de cada uno"],
        ["Varios números de WhatsApp, cada uno por su lado", "Todas las líneas en una bandeja, respetando el tope de cada una"],
        ["Nadie sabía a quién ya se le había escrito", "Cada chat muestra por qué línea salió y quién lo atiende"],
        ["Los seguimientos se olvidaban", "Un calendario con lo vencido siempre a la vista"],
        ["Los cobros de los abonos se controlaban a mano", "Deudas y vencimientos de cada cliente, al día"],
      ],
      mods: [
        [
          "Búsquedas",
          "Elegís rubro, ciudades y demás filtros, y Scout releva en Google Maps las empresas que encajan. Las que no sirven se descartan solas y el resto queda esperando tu revisión antes de pasar a la base.",
        ],
        [
          "Prospectos",
          "Los que aprobaste de cada búsqueda quedan acá, con un puntaje y su canal. Seleccionás a quiénes escribirles y programás el envío: Scout reparte los WhatsApp a lo largo del día y respeta el tope de cada línea.",
        ],
        [
          "Conversaciones",
          "Todos los chats de todas tus líneas de WhatsApp en una sola bandeja. Contestás desde ahí y ves por qué línea entró cada uno y qué mensajes salieron con el envío automático.",
        ],
        ["Calendario", "Seguimientos, cobros, pagos y eventos del equipo en un mismo lugar, con lo vencido siempre a la vista para que nada se pase."],
        ["Tareas", "Pendientes, en progreso y hechas, por persona y por proyecto. Cada uno ve lo suyo y el equipo ve cómo viene todo."],
        ["Clientes", "Abonos, cobros y deudas de quienes ya te compraron. Sabés cuánto te deben, cuánto entra por mes y cuándo vence cada uno."],
        [
          "Resultados",
          "La parte analítica: tasa de respuesta, qué contestan los prospectos y qué ciudades y perfiles responden mejor, para saber dónde poner el esfuerzo.",
        ],
        ["Equipo", "Cuánto trabajó cada uno en el período: contactos, respuestas y tasa de respuesta por persona."],
      ],
      pts: [
        [
          "Búsqueda nueva en 4 pasos, con lo que va a tardar antes de encolarla",
          "Los candidatos por revisar de cada búsqueda, siempre a la vista",
          "Repetís una búsqueda para traer empresas nuevas",
        ],
        [
          "Un puntaje para saber por dónde empezar",
          "Filtros por estado, rubro, ciudad, canal y dueño",
          "Cada mensaje sale a una hora al azar dentro de la franja, como si lo mandaras vos",
        ],
        [
          "Filtros por línea, por estado y sin leer",
          "Todas las líneas del equipo, cada una con su número",
          "Los envíos automáticos y las estadísticas en la misma pantalla",
        ],
        ["Lo vencido se pasa a hoy con un clic", "Lo cobrado y lo por cobrar del mes, arriba del calendario", "Todo el equipo o una sola persona"],
        [
          "Tablero con pendientes, en progreso y hechas",
          "Las vencidas y las que vencen esta semana, contadas",
          "Avisa si hay tareas repetidas con el mismo título",
        ],
        [
          "Por cobrar, ingreso fijo mensual y cobrado del mes",
          "Filtros por activos, con deuda, vencidos, pausados y terminados",
          "Registrás un pago desde la misma fila",
        ],
        [
          "Dónde se acumula el trabajo: candidatos sin revisar y prospectos sin contactar",
          "Qué dicen los que responden, agrupado por respuesta",
          "Los «ahora no» se programan como seguimiento a 30 días",
        ],
        ["Hoy, 7 días o 30 días", "Tocás un número y ves los prospectos y sus chats", "Los contactos por día de todo el equipo"],
      ],
      caps: [
        "Búsquedas en Google Maps con candidatos por revisar",
        "Prospectos y envío programado por WhatsApp",
        "Bandeja con los chats de todas las líneas",
        "Calendario de seguimientos y cobros",
        "Tareas del equipo",
        "Clientes, abonos y cobros",
        "Resultados: qué contestan y qué ciudades responden",
        "Equipo: contactos y respuestas por persona",
      ],
      result:
        "Todo el proceso comercial en un solo sistema: de la búsqueda de prospectos al cobro, con los primeros mensajes automatizados y el equipo coordinado.",
    },
    en: {
      seoTitle: "Aspa Scout: sales management system",
      description:
        "Aspa Scout case study: a sales system that finds companies on Google Maps by industry and area, schedules WhatsApp messages within each line's daily limit, brings every chat into one inbox and tracks the calendar, tasks, customers with subscriptions and team results.",
      lead: "A sales management system, from search to payment: it finds prospects on Google Maps, schedules first messages over WhatsApp, brings every conversation together and tracks follow-ups, billing and team results.",
      feat: [
        ["Industry", "Sales"],
        ["Searches", "on Google Maps, by industry and area"],
        ["Outreach", "scheduled WhatsApp per line"],
        ["Customers", "subscriptions, billing and debt"],
        ["Team", "tasks, calendar and results"],
      ],
      problem: "Before Scout, the whole sales process was done by hand and in different places. Here's what changed.",
      pains: [
        ["Prospects were found by hand, one by one", "Scout finds them on Google Maps by industry and area"],
        ["Data scattered across spreadsheets and loose chats", "One database, with each prospect's score and channel"],
        ["Several WhatsApp numbers, each on its own", "Every line in one inbox, within each line's limit"],
        ["Nobody knew who had already been contacted", "Each chat shows which line it went out on and who owns it"],
        ["Follow-ups were forgotten", "A calendar with anything overdue always in sight"],
        ["Subscription payments were tracked by hand", "Each customer's debt and due dates, up to date"],
      ],
      mods: [
        [
          "Searches",
          "Pick an industry, cities and any other filters, and Scout finds the matching companies on Google Maps. The ones that don't fit are discarded automatically and the rest wait for your review before joining the database.",
        ],
        [
          "Prospects",
          "The companies you approved from each search land here, with a score and a channel. Choose who to message and schedule the outreach: Scout spreads WhatsApp messages across the day and stays within each line's limit.",
        ],
        [
          "Conversations",
          "Every chat from every WhatsApp line in a single inbox. Reply from there and see which line each one came in on and which messages went out with automated outreach.",
        ],
        ["Calendar", "Team follow-ups, payments in and out, and events in one place, with anything overdue always in sight so nothing slips through."],
        ["Tasks", "To do, in progress and done, by person and by project. Everyone sees their own work and the team sees how it's all going."],
        [
          "Customers",
          "Subscriptions, payments and debt for everyone who already bought from you. Know how much you're owed, how much comes in each month and when each one is due.",
        ],
        ["Results", "The analytics side: response rate, what prospects reply and which cities and profiles respond best, so you know where to put the effort."],
        ["Team", "How much each person worked over the period: contacts, replies and response rate per person."],
      ],
      pts: [
        [
          "A new search in 4 steps, with how long it will take before it's queued",
          "The candidates to review from each search, always in sight",
          "Rerun a search to bring in new companies",
        ],
        [
          "A score so you know where to start",
          "Filters by status, industry, city, channel and owner",
          "Each message goes out at a random time within the window, as if you'd sent it yourself",
        ],
        ["Filters by line, by status and unread", "All of the team's lines, each with its own number", "Automated outreach and stats on the same screen"],
        [
          "Move anything overdue to today in one click",
          "What's been collected and what's still owed this month, above the calendar",
          "The whole team or just one person",
        ],
        ["A board with to do, in progress and done", "Overdue tasks and the ones due this week, counted", "Flags duplicate tasks with the same title"],
        [
          "Outstanding, monthly recurring revenue and collected this month",
          "Filters for active, owing, overdue, paused and ended",
          "Record a payment right from the row",
        ],
        [
          "Where the work piles up: candidates to review and prospects not yet contacted",
          "What people who reply say, grouped by answer",
          "“Not now” replies get scheduled as a 30-day follow-up",
        ],
        ["Today, 7 days or 30 days", "Tap a number to see the prospects and their chats", "Contacts per day for the whole team"],
      ],
      caps: [
        "Google Maps searches with candidates to review",
        "Prospects and scheduled WhatsApp outreach",
        "One inbox for chats from every line",
        "Follow-up and payment calendar",
        "Team tasks",
        "Customers, subscriptions and billing",
        "Results: what prospects reply and which cities respond",
        "Team: contacts and replies per person",
      ],
      result: "The entire sales process in one system: from finding prospects to getting paid, with first messages automated and the whole team in sync.",
    },
  },
};

/** Un caso en un idioma. */
export function caso(slug: CasoSlug, lang: Lang): Caso {
  const b = BASE[slug],
    { caps, pts, ...t } = TEXT[slug][lang],
    shots = b.imgs.map((img, i) => ({ img, cap: caps[i] }));
  return {
    slug,
    name: b.name,
    path: routes(lang)[b.page],
    ...t,
    shots,
    ...(b.manga && { manga: true }),
    ...(b.showcase && { showcase: b.showcase }),
    ...(b.tour && { tour: t.mods.map(([h, d], i) => ({ h, d, pts: pts?.[i] ?? [], ...shots[i] })) }),
    cover: b.cover,
  };
}

/** El "otro caso" al pie de cada caso. */
export const NEXT: Record<CasoSlug, CasoSlug> = {
  "aspa-rodeo": "aspa-scout",
  "aspa-scout": "aspa-rodeo",
};

export const FILTERS = [
  { f: "all", label: { es: "Todos", en: "All" } },
  { f: "sys", label: { es: "Sistemas", en: "Systems" } },
  { f: "app", label: { es: "Apps", en: "Apps" } },
  { f: "web", label: { es: "Webs", en: "Websites" } },
] as const;

/** Listado de /casos: primero los proyectos reales, después los diseños de ejemplo por rubro. */
export function works(lang: Lang): {
  t: string;
  img: StaticImageData;
  href: string;
  f: string;
  real?: boolean;
}[] {
  const r = routes(lang);
  return [
    {
      t: "Aspa Rodeo",
      img: rodeo,
      href: r.casoRodeo,
      f: "sys app",
      real: true,
    },
    {
      t: "Aspa Scout",
      img: scoutCard,
      href: r.casoScout,
      f: "sys",
      real: true,
    },
    {
      t: "DH Engineering",
      img: dh,
      href: r.rubro("constructoras"),
      f: "web",
      real: true,
    },
    {
      t: "Obliqua",
      img: obliqua,
      href: r.rubro("estudios-de-arquitectura"),
      f: "web",
    },
    { t: "Paula Gil", img: paulaGil, href: r.rubro("arquitectos"), f: "web" },
    {
      t: "Alero",
      img: alero,
      href: r.rubro("constructoras-de-vivienda"),
      f: "web",
    },
    {
      t: "Cordillera",
      img: cordillera,
      href: r.rubro("constructoras"),
      f: "web",
    },
    {
      t: "Architecture 360",
      img: architecture360,
      href: r.rubro("desarrollistas"),
      f: "web",
    },
  ];
}
