// Las 7 páginas por rubro de Webs (/webs/<slug> y /en/websites/<slug en inglés>): textos de las
// presentaciones del diseño (en español y en inglés), foto o captura del hero, escena 3D, qué incluye
// y los ejemplos de "Cómo se vería".
import type { StaticImageData } from "next/image";
import type { Lang } from "@/i18n";
import type { RubroSlug } from "./webs";
import alero from "@/assets/work/alero.jpg";
import architecture360 from "@/assets/work/architecture-360.jpg";
import dh from "@/assets/work/dh-engineering.jpg";
import obliqua from "@/assets/work/obliqua.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import constructoraEjemplo from "@/assets/webs/constructora-ejemplo.jpg";
import cordillera from "@/assets/webs/cordillera.jpg";
import casaModerna from "@/assets/webs/casa-moderna-atardecer.jpg";
import aleroM from "@/assets/rubros/alero-mobile.jpg";
import casaHormigon from "@/assets/rubros/casa-hormigon-madera.jpg";
import constructoraEjemploM from "@/assets/rubros/constructora-ejemplo-mobile.jpg";
import cordilleraM from "@/assets/rubros/cordillera-mobile-obras.jpg";
import dhM from "@/assets/rubros/dh-engineering-mobile.jpg";
import fbArquitectos from "@/assets/rubros/fb-scene-arquitectos.jpg";
import fbConstructoras from "@/assets/rubros/fb-scene-constructoras.jpg";
import fbVivienda from "@/assets/rubros/fb-scene-constructoras-de-vivienda.jpg";
import fbEstudios from "@/assets/rubros/fb-scene-estudios-de-arquitectura.jpg";
import fbInteriorismo from "@/assets/rubros/fb-scene-interiorismo.jpg";
import interiorDepto from "@/assets/rubros/interior-depto-vista-ciudad.jpg";
import interiorLiving from "@/assets/rubros/interior-living-noche.jpg";
import obliquaM from "@/assets/rubros/obliqua-mobile.jpg";
import paulaGilM from "@/assets/rubros/paula-gil-mobile.jpg";
import steelHero from "@/assets/rubros/steel-hero.jpg";

/** Una web hecha, para "Cómo se vería": captura de escritorio (y de celular si hay). */
export type Web = { name: string; tipo: string; txt: string; d: StaticImageData; m?: StaticImageData; url?: string; real?: boolean };
type WebData = Omit<Web, "name" | "tipo" | "txt"> & Record<Lang, { name: string; tipo: string; txt: string }>;

const WEB_DATA = {
  dh: {
    url: "dhengconsulting.com",
    d: dh,
    m: dhM,
    real: true,
    es: {
      name: "DH Engineering",
      tipo: "Ingeniería · Sitio completo",
      txt: "La carta de presentación de la empresa para cada comitente y cada licitación.",
    },
    en: { name: "DH Engineering", tipo: "Engineering · Full website", txt: "The company's calling card for every client and every bid." },
  },
  obl: {
    url: "obliqua-arq.vercel.app",
    d: obliqua,
    m: obliquaM,
    es: {
      name: "Obliqua",
      tipo: "Estudio de arquitectura",
      txt: "Portada con la obra a pantalla completa y una página por proyecto, ordenadas por tipo.",
    },
    en: { name: "Obliqua", tipo: "Architecture studio", txt: "A full-screen homepage for the work and a page for every project, sorted by type." },
  },
  pau: {
    url: "paula-gil-arquitecta.vercel.app",
    d: paulaGil,
    m: paulaGilM,
    es: { name: "Paula Gil", tipo: "Arquitecta", txt: "Un portfolio personal, cálido y simple, para una arquitecta que trabaja sola." },
    en: { name: "Paula Gil", tipo: "Architect", txt: "A warm, simple personal portfolio for an architect who works on her own." },
  },
  ale: {
    url: "alero-rust.vercel.app",
    d: alero,
    m: aleroM,
    es: { name: "Alero", tipo: "Estudio que construye", txt: "Proyecto y obra en un mismo sitio, para quien quiere construir su casa." },
    en: { name: "Alero", tipo: "Design-build studio", txt: "Design and construction on one site, for people ready to build their home." },
  },
  cor: {
    url: "cordillera-web-bice.vercel.app",
    d: cordillera,
    m: cordilleraM,
    es: {
      name: "Cordillera",
      tipo: "Constructora",
      txt: "Obras terminadas y en curso, cada una con su propia página, para comitentes y licitaciones.",
    },
    en: { name: "Cordillera", tipo: "Construction company", txt: "Finished and ongoing projects, each with its own page, for clients and bids." },
  },
  a360: {
    url: "architecture360.vercel.app/proyecto/demo",
    d: architecture360,
    es: { name: "Architecture 360", tipo: "Desarrollista", txt: "Proyecto inmobiliario con masterplan, unidades, tour 360° y cotizador." },
    en: {
      name: "Architecture 360",
      tipo: "Real estate developer",
      txt: "A real estate project with masterplan, units, 360° tour and payment calculator.",
    },
  },
  cej: {
    d: constructoraEjemplo,
    m: constructoraEjemploM,
    es: { name: "Constructora (ejemplo)", tipo: "Constructora", txt: "Portada con obra en curso, servicios y números de trayectoria." },
    en: { name: "Builder (sample)", tipo: "Construction company", txt: "A homepage with a project underway, services and track-record numbers." },
  },
} satisfies Record<string, WebData>;
export type WebKey = keyof typeof WEB_DATA;

/** Una web hecha en un idioma. */
export function web(key: WebKey, lang: Lang): Web {
  const { es, en, ...w } = WEB_DATA[key] as WebData;
  return { ...(lang === "es" ? es : en), ...w };
}

export type SceneKind = "house" | "studio" | "room" | "site" | "homes";
/** Bloques de "Cómo se vería": webs hechas, maquetas de ejemplo o la demo de desarrollistas. */
export type DemoBlock = { web: WebKey } | { mock: "nogal" | "trama" | "boceto" | "devdemo" };

/** Los textos de un rubro (la misma forma en los dos idiomas). */
export type RubroText = {
  menu: string;
  /** a quiénes les pasa ("Lo que le pasa hoy a …"); por defecto, el menú en minúsculas */
  who?: string;
  /** título del hero; *palabra* va resaltada */
  title: string;
  lead: string;
  hoy: [string, string, string];
  inc: string[];
  scene?: { title: string; text: string };
  pay: string;
  /** en lugar de precios: cotización a medida (desarrollistas) */
  custom?: string;
  cta: string;
  wa: string;
  /** SEO */
  seoTitle: string;
  description: string;
};

type RubroBase = {
  slug: RubroSlug;
  /** foto del hero, o captura de una web real (en un navegador) */
  hero: { photo: StaticImageData } | { capture: StaticImageData; url: string };
  scene?: { kind: SceneKind; fallback: StaticImageData };
  demo: DemoBlock[];
};

/** Un rubro en un idioma (lo que usa la página). */
export type Rubro = RubroBase &
  Omit<RubroText, "scene"> & {
    scene?: { kind: SceneKind; title: string; text: string; fallback: StaticImageData };
  };

const RUBRO_DATA: Record<RubroSlug, RubroBase & Record<Lang, RubroText>> = {
  arquitectos: {
    slug: "arquitectos",
    hero: { photo: casaHormigon },
    scene: { kind: "house", fallback: fbArquitectos },
    demo: [{ web: "pau" }, { web: "ale" }],
    es: {
      menu: "Arquitectos",
      title: "Tus obras merecen una vidriera a su *altura.*",
      lead: "Un solo link para mandar cada vez que te piden trabajos por WhatsApp o Instagram.",
      hoy: [
        "Antes de llamarte, el cliente te busca en internet.",
        "Instagram muestra fotos sueltas, no cómo trabajás.",
        "Una web descuidada hace dudar del cuidado en la obra.",
      ],
      inc: [
        "Portada con tu mejor render",
        "Servicios y herramientas",
        "Galería de obras con descripción",
        "“Cómo trabajo” en 4 pasos",
        "WhatsApp y “Agendar reunión”",
        "Diseño para celular",
        "Dominio y aparición en Google",
      ],
      scene: { title: "Del plano a la casa", text: "Así se cuenta una obra en tu web: del primer trazo a la casa terminada." },
      pay: "Un solo cliente nuevo y ya la *pagaste.*",
      cta: "Elegí el plan y escribinos: con 3 obras tuyas *arrancamos.*",
      wa: "Hola Aspa, soy arquitecto/a y quiero mi web",
      seoTitle: "Páginas web para arquitectos",
      description:
        "Diseño de páginas web para arquitectos: portfolio de obras, servicios y contacto por WhatsApp, en un solo link. Lista en 10 días. Córdoba, Argentina.",
    },
    en: {
      menu: "Architects",
      title: "Your work deserves a showcase that *measures up.*",
      lead: "One link to send every time someone asks to see your work on WhatsApp or Instagram.",
      hoy: [
        "Before they call you, clients look you up online.",
        "Instagram shows scattered photos, not how you work.",
        "A sloppy website makes people doubt how careful you are on site.",
      ],
      inc: [
        "Homepage with your best render",
        "Services and tools",
        "Project gallery with descriptions",
        "“How I work” in 4 steps",
        "WhatsApp and “Book a meeting”",
        "Mobile-friendly design",
        "Domain and Google listing",
      ],
      scene: { title: "From plan to house", text: "This is how your website tells a project's story: from the first line to the finished house." },
      pay: "One new client and it's already *paid for.*",
      cta: "Pick a plan and message us: 3 of your projects is all we need to *get started.*",
      wa: "Hi Aspa, I'm an architect and I want a website",
      seoTitle: "Websites for architects",
      description:
        "Website design for architects: project portfolio, services and WhatsApp contact, all in one link. Ready in 10 days. Córdoba, Argentina.",
    },
  },
  "estudios-de-arquitectura": {
    slug: "estudios-de-arquitectura",
    hero: { capture: obliqua, url: "obliqua-arq.vercel.app" },
    scene: { kind: "studio", fallback: fbEstudios },
    demo: [{ web: "obl" }, { web: "ale" }, { mock: "boceto" }],
    es: {
      menu: "Estudios de arquitectura",
      title: "Un estudio se juzga por su portfolio. Que esté a la *altura.*",
      lead: "Todas las obras, el equipo y los servicios del estudio en un solo sitio, para cada cliente, desarrollista o concurso.",
      hoy: [
        "Desarrollistas y clientes grandes revisan el portfolio antes de la primera reunión.",
        "Las obras están repartidas entre Instagram, PDFs y una web vieja.",
        "Sin el equipo a la vista, el estudio parece una sola persona.",
      ],
      inc: [
        "Página propia por obra con galería",
        "Obras por tipo",
        "Equipo con retratos",
        "Servicios",
        "Premios y publicaciones",
        "Panel para cargar obras",
        "Dos idiomas",
      ],
      scene: { title: "De la grilla a la maqueta", text: "Tu portfolio muestra cómo pensás un proyecto, no solo la foto final." },
      pay: "Un cliente que te encuentre por la web y ya la *pagaste.*",
      cta: "Pasanos 3 obras del estudio y te mandamos cómo quedaría la *portada.*",
      wa: "Hola Aspa, les paso 3 obras del estudio",
      seoTitle: "Páginas web para estudios de arquitectura",
      description:
        "Webs para estudios de arquitectura: página propia por obra, equipo, servicios, premios y panel para cargar proyectos, en dos idiomas. Córdoba, Argentina.",
    },
    en: {
      menu: "Architecture studios",
      title: "A studio is judged by its portfolio. Make sure it *measures up.*",
      lead: "Every project, the team and the studio's services on one site, ready for every client, developer or competition.",
      hoy: [
        "Developers and major clients review the portfolio before the first meeting.",
        "Your projects are scattered across Instagram, PDFs and an outdated website.",
        "With no team in sight, the studio looks like a one-person shop.",
      ],
      inc: [
        "A dedicated page per project, with gallery",
        "Projects by type",
        "Team with portraits",
        "Services",
        "Awards and press",
        "Admin panel to add projects",
        "Two languages",
      ],
      scene: { title: "From grid to model", text: "Your portfolio shows how you think through a project, not just the final photo." },
      pay: "One client who finds you online and it's already *paid for.*",
      cta: "Send us 3 of the studio's projects and we'll show you how your *homepage would look.*",
      wa: "Hi Aspa, here are 3 projects from our studio",
      seoTitle: "Websites for architecture studios",
      description:
        "Websites for architecture studios: a page per project, team, services, awards and an admin panel to add work, in two languages. Córdoba, Argentina.",
    },
  },
  interiorismo: {
    slug: "interiorismo",
    hero: { photo: interiorDepto },
    scene: { kind: "room", fallback: fbInteriorismo },
    demo: [{ mock: "nogal" }],
    es: {
      menu: "Interiorismo",
      title: "Que vean la *transformación* antes de llamarte.",
      lead: "Tus mejores antes y después, en un link que no se pierde en el feed.",
      hoy: [
        "El cliente compara 3 o 4 estudios y elige al que mejor muestra.",
        "En Instagram los mejores trabajos quedan enterrados en dos semanas.",
        "Sin un proceso claro, llegan consultas que no sirven.",
      ],
      inc: [
        "Galería antes/después por proyecto",
        "Proceso de la visita a la entrega",
        "Tipos de trabajo: cocinas, baños, integrales, locales",
        "Formulario de presupuesto con fotos del espacio",
        "WhatsApp",
        "Diseño para celular",
      ],
      scene: { title: "El ambiente, pieza por pieza", text: "Mostrá cómo un espacio vacío se convierte en un lugar para vivir." },
      pay: "Con la primera cocina, ya la *pagaste.*",
      cta: "Mandanos 3 trabajos por WhatsApp y te mostramos cómo *quedarían.*",
      wa: "Hola Aspa, tengo un estudio de interiorismo",
      seoTitle: "Páginas web para interioristas",
      description:
        "Webs para estudios de interiorismo: galería de antes y después, proceso de trabajo y formulario de presupuesto con fotos del espacio. Córdoba.",
    },
    en: {
      menu: "Interior design",
      who: "interior designers",
      title: "Let them see the *transformation* before they call.",
      lead: "Your best before-and-afters, in one link that never gets lost in the feed.",
      hoy: [
        "Clients compare 3 or 4 studios and pick the one that shows its work best.",
        "On Instagram, your best projects get buried within two weeks.",
        "Without a clear process, you get inquiries that go nowhere.",
      ],
      inc: [
        "Before/after gallery for each project",
        "Process, from first visit to handover",
        "Project types: kitchens, bathrooms, full renovations, retail",
        "Quote request form with photos of the space",
        "WhatsApp",
        "Mobile-friendly design",
      ],
      scene: { title: "The room, piece by piece", text: "Show how an empty space turns into a place to live." },
      pay: "One kitchen and it's already *paid for.*",
      cta: "Send us 3 projects on WhatsApp and we'll show you how they'd *look.*",
      wa: "Hi Aspa, I run an interior design studio",
      seoTitle: "Websites for interior designers",
      description:
        "Websites for interior design studios: before-and-after gallery, your design process and a quote form with photos of the space. Córdoba.",
    },
  },
  constructoras: {
    slug: "constructoras",
    hero: { capture: dh, url: "dhengconsulting.com" },
    scene: { kind: "site", fallback: fbConstructoras },
    demo: [{ web: "dh" }, { web: "cor" }],
    es: {
      menu: "Constructoras",
      title: "Antes de pedirte presupuesto, te *googlean.*",
      lead: "La carta de presentación de tu empresa para cada comitente y cada licitación.",
      hoy: [
        "Obras de millones se deciden mirando una web sin una obra terminada.",
        "Sin servicios claros, el comitente no sabe si hacen lo que necesita.",
        "Sin trayectoria visible, se compite solo por precio.",
      ],
      inc: [
        "Inicio, nosotros, servicios, obras y contacto",
        "Números de trayectoria y logos de clientes",
        "Portfolio con ficha por obra",
        "Proceso por etapas",
        "Testimonios",
        "Panel para cargar obras",
        "Dos idiomas",
      ],
      scene: { title: "La obra, en marcha", text: "Cada etapa a la vista: tu web muestra cómo avanza una obra de verdad." },
      pay: "Una sola obra nueva y ya la *pagaste.*",
      cta: "Pasanos 3 obras por WhatsApp y te mandamos cómo quedaría tu *portada.*",
      wa: "Hola Aspa, somos una constructora",
      seoTitle: "Páginas web para constructoras",
      description:
        "Webs para constructoras: obras con ficha, servicios, trayectoria, clientes y testimonios, para cada comitente y licitación. Córdoba, Argentina.",
    },
    en: {
      menu: "Construction companies",
      title: "Before asking you for a quote, they *google you.*",
      lead: "Your company's calling card for every client and every bid.",
      hoy: [
        "Million-dollar projects get decided on a website without a single finished build.",
        "Without clear services, clients can't tell whether you do what they need.",
        "With no visible track record, you end up competing on price alone.",
      ],
      inc: [
        "Home, about, services, projects and contact",
        "Track-record numbers and client logos",
        "Portfolio with a fact sheet for each project",
        "Stage-by-stage process",
        "Testimonials",
        "Admin panel to add projects",
        "Two languages",
      ],
      scene: { title: "The build, underway", text: "Every stage in view: your website shows how a real project moves forward." },
      pay: "One new project and it's already *paid for.*",
      cta: "Send us 3 projects on WhatsApp and we'll show you how your *homepage would look.*",
      wa: "Hi Aspa, we're a construction company",
      seoTitle: "Websites for construction companies",
      description:
        "Websites for construction companies: project fact sheets, services, track record, clients and testimonials, for every client and bid. Córdoba, Argentina.",
    },
  },
  "constructoras-de-vivienda": {
    slug: "constructoras-de-vivienda",
    hero: { photo: casaModerna },
    scene: { kind: "homes", fallback: fbVivienda },
    demo: [{ web: "dh" }, { web: "cej" }],
    es: {
      menu: "Constructoras de viviendas",
      title: "Antes de confiarte su casa, quieren ver las que ya *hiciste.*",
      lead: "Un link con tus casas terminadas, tus modelos y cómo trabajás, para mandar a cada familia que te consulta.",
      hoy: [
        "Una familia elige constructora una sola vez en la vida, y busca hasta estar segura.",
        "El miedo es que la obra se estire o el presupuesto se dispare.",
        "En Instagram se ven fotos lindas, pero no el plazo, el proceso ni lo que incluye.",
      ],
      inc: [
        "Casas terminadas con fotos",
        "Modelos con metros y plazo de obra",
        "Proceso de obra, de la firma a la entrega",
        "Testimonios de familias",
        "Formulario “Contanos tu terreno”",
        "WhatsApp",
        "Diseño para celular",
      ],
      scene: { title: "Tus modelos, uno al lado del otro", text: "Cada familia ve las casas que hacés y elige la suya." },
      pay: "Una sola familia que te elija y ya la *pagaste.*",
      cta: "Pasanos fotos de 3 casas terminadas y te mandamos cómo quedaría tu *portada.*",
      wa: "Hola Aspa, somos una constructora de viviendas",
      seoTitle: "Páginas web para constructoras de viviendas",
      description:
        "Webs para constructoras de viviendas: casas terminadas, modelos con metros y plazo, proceso de obra y formulario de terreno. Córdoba.",
    },
    en: {
      menu: "Home builders",
      title: "Before trusting you with their home, they want to see your *work.*",
      lead: "One link with your finished homes, your models and how you work, to send to every family that reaches out.",
      hoy: [
        "A family picks a builder once in a lifetime, and keeps looking until they're sure.",
        "Their biggest fear is that the build drags on or the budget blows up.",
        "Instagram shows pretty photos, but not the timeline, the process or what's included.",
      ],
      inc: [
        "Finished homes with photos",
        "Models with size and build time",
        "Build process, from signing to handover",
        "Testimonials from families",
        "“Tell us about your lot” form",
        "WhatsApp",
        "Mobile-friendly design",
      ],
      scene: { title: "Your models, side by side", text: "Every family sees the homes you build and picks theirs." },
      pay: "One family that chooses you and it's already *paid for.*",
      cta: "Send us photos of 3 finished homes and we'll show you how your *homepage would look.*",
      wa: "Hi Aspa, we're a home builder",
      seoTitle: "Websites for home builders",
      description: "Websites for home builders: finished homes, models with size and build time, your build process and a lot inquiry form. Córdoba.",
    },
  },
  "steel-framing": {
    slug: "steel-framing",
    hero: { photo: steelHero },
    demo: [{ mock: "trama" }],
    es: {
      menu: "Steel framing",
      title: "Tu cliente no duda de vos: duda del *steel framing.*",
      lead: "Una web que explica el sistema, muestra la estructura por dentro y convence antes de la primera visita.",
      hoy: [
        "Cada consulta arranca con las mismas preguntas: si aguanta, si dura, si sale caro.",
        "En Instagram se ve la casa terminada, no la estructura que da confianza.",
        "Sin un precio de referencia por m², la consulta se enfría.",
      ],
      inc: [
        "Deslizador estructura/terminada por obra",
        "Preguntas frecuentes",
        "El sistema explicado simple",
        "Modelos con m² y precio de referencia",
        "Cotizador por m²",
        "Obras por etapas",
        "WhatsApp",
      ],
      pay: "Una familia que se anime al steel framing y ya la *pagaste.*",
      cta: "Pasanos fotos de una obra, de la estructura a la entrega, y te mostramos cómo se *vería.*",
      wa: "Hola Aspa, construimos en steel framing",
      seoTitle: "Páginas web para empresas de steel framing",
      description:
        "Webs para empresas de steel framing: el sistema explicado, la estructura por dentro, modelos con precio por m² y cotizador. Córdoba.",
    },
    en: {
      menu: "Steel framing",
      who: "steel framing builders",
      title: "Clients don't doubt you: they doubt *steel framing.*",
      lead: "A website that explains the system, shows the structure inside and wins people over before the first visit.",
      hoy: [
        "Every inquiry starts with the same questions: is it sturdy, will it last, is it expensive.",
        "Instagram shows the finished house, not the structure that earns their trust.",
        "Without a reference price per m², the lead goes cold.",
      ],
      inc: [
        "Frame/finished slider for each project",
        "Frequently asked questions",
        "The system, explained simply",
        "Models with m² and reference price",
        "Price-per-m² calculator",
        "Projects by stage",
        "WhatsApp",
      ],
      pay: "One family that goes for steel framing and it's already *paid for.*",
      cta: "Send us photos of one project, from frame to handover, and we'll show you how it would *look.*",
      wa: "Hi Aspa, we build with steel framing",
      seoTitle: "Websites for steel framing companies",
      description:
        "Websites for steel framing companies: the system explained, the structure inside, models priced per m² and a cost calculator. Córdoba.",
    },
  },
  desarrollistas: {
    slug: "desarrollistas",
    hero: { capture: architecture360, url: "architecture360.vercel.app/proyecto/demo" },
    demo: [{ mock: "devdemo" }],
    es: {
      menu: "Desarrollistas",
      title: "Vendé unidades antes de que exista el *edificio.*",
      lead: "La sala de ventas digital de tu emprendimiento, abierta las 24 horas.",
      hoy: [
        "El interesado pide disponibilidad, planos y precio por WhatsApp, y espera.",
        "Los renders que pagaste viven en un PDF que nadie vuelve a abrir.",
        "La conversación sobre la cuota llega tarde o nunca.",
      ],
      inc: [
        "Masterplan interactivo",
        "Unidades con ficha, metros y fotos",
        "Ubicación con puntos cercanos",
        "Cotizador de cuota",
        "Tour 360° y modelo BIM",
        "Amenities",
        "Consultas que llegan con la unidad y la cuota elegidas",
        "Panel propio para cargar proyectos, renders y disponibilidad",
      ],
      custom: "Cotización a medida, según la cantidad de *emprendimientos.*",
      pay: "Vendés una unidad y la pagaste *muchas veces.*",
      cta: "Pasanos los renders de un emprendimiento y te mandamos un video de 30 segundos con tu proyecto *cargado.*",
      wa: "Hola Aspa, somos desarrollistas",
      seoTitle: "Páginas web para desarrollistas inmobiliarios",
      description:
        "Webs para desarrollistas: masterplan interactivo, unidades con ficha, tour 360°, modelo BIM y cotizador de cuotas. La sala de ventas digital de tu emprendimiento.",
    },
    en: {
      menu: "Real estate developers",
      who: "developers",
      title: "Sell units before the *building* even exists.",
      lead: "Your project's digital sales room, open around the clock.",
      hoy: [
        "Prospects ask for availability, floor plans and prices on WhatsApp, and wait.",
        "The renders you paid for live in a PDF nobody ever opens again.",
        "The payment-plan conversation comes late, or never.",
      ],
      inc: [
        "Interactive masterplan",
        "Units with fact sheet, size and photos",
        "Location with nearby points of interest",
        "Payment plan calculator",
        "360° tour and BIM model",
        "Amenities",
        "Inquiries that arrive with the unit and payment plan already chosen",
        "Your own admin panel for projects, renders and availability",
      ],
      custom: "Custom quote, based on the number of *projects.*",
      pay: "Sell one unit and it's paid for *many times over.*",
      cta: "Send us the renders for one project and we'll send you a 30-second video with your project *loaded.*",
      wa: "Hi Aspa, we're real estate developers",
      seoTitle: "Websites for real estate developers",
      description:
        "Websites for real estate developers: interactive masterplan, unit fact sheets, 360° tour, BIM model and payment plan calculator. Your project's digital sales room.",
    },
  },
};

export const isRubro = (slug: string): slug is RubroSlug => Object.hasOwn(RUBRO_DATA, slug);

/** Un rubro en un idioma: los datos compartidos más los textos de ese idioma. */
export function rubro(slug: RubroSlug, lang: Lang): Rubro {
  const { es, en, scene, ...base } = RUBRO_DATA[slug];
  const t = lang === "es" ? es : en;
  return { ...base, ...t, scene: scene && t.scene && { ...scene, ...t.scene } };
}

// fotos usadas en los mockups (Nogal y la demo de desarrollistas)
export { interiorLiving, interiorDepto };
