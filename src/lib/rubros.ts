// Las 7 páginas por rubro de Webs (/webs/<slug>): textos de las presentaciones del diseño,
// foto o captura del hero, escena 3D, qué incluye y los ejemplos de "Cómo se vería".
import type { StaticImageData } from "next/image";
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

export const WEBS = {
  dh: {
    name: "DH Engineering",
    tipo: "Ingeniería · Sitio completo",
    url: "dhengconsulting.com",
    d: dh,
    m: dhM,
    real: true,
    txt: "La carta de presentación de la empresa para cada comitente y cada licitación.",
  },
  obl: {
    name: "Obliqua",
    tipo: "Estudio de arquitectura",
    url: "obliqua-arq.vercel.app",
    d: obliqua,
    m: obliquaM,
    txt: "Portada con la obra a pantalla completa y una página por proyecto, ordenadas por tipo.",
  },
  pau: {
    name: "Paula Gil",
    tipo: "Arquitecta",
    url: "paula-gil-arquitecta.vercel.app",
    d: paulaGil,
    m: paulaGilM,
    txt: "Un portfolio personal, cálido y simple, para una arquitecta que trabaja sola.",
  },
  ale: { name: "Alero", tipo: "Estudio que construye", url: "alero-rust.vercel.app", d: alero, m: aleroM, txt: "Proyecto y obra en un mismo sitio, para quien quiere construir su casa." },
  cor: {
    name: "Cordillera",
    tipo: "Constructora",
    url: "cordillera-web-bice.vercel.app",
    d: cordillera,
    m: cordilleraM,
    txt: "Obras terminadas y en curso, cada una con su propia página, para comitentes y licitaciones.",
  },
  a360: {
    name: "Architecture 360",
    tipo: "Desarrollista",
    url: "architecture360.vercel.app/proyecto/demo",
    d: architecture360,
    txt: "Proyecto inmobiliario con masterplan, unidades, tour 360° y cotizador.",
  },
  cej: {
    name: "Constructora (ejemplo)",
    tipo: "Constructora",
    d: constructoraEjemplo,
    m: constructoraEjemploM,
    txt: "Portada con obra en curso, servicios y números de trayectoria.",
  },
} satisfies Record<string, Web>;

export type SceneKind = "house" | "studio" | "room" | "site" | "homes";
/** Bloques de "Cómo se vería": webs hechas, maquetas de ejemplo o la demo de desarrollistas. */
export type DemoBlock = { web: keyof typeof WEBS } | { mock: "nogal" | "trama" | "boceto" | "devdemo" };

export type Rubro = {
  slug: RubroSlug;
  menu: string;
  /** título del hero; *palabra* va resaltada */
  title: string;
  lead: string;
  /** foto del hero, o captura de una web real (en un navegador) */
  hero: { photo: StaticImageData } | { capture: StaticImageData; url: string };
  hoy: [string, string, string];
  inc: string[];
  scene?: { kind: SceneKind; title: string; text: string; fallback: StaticImageData };
  demo: DemoBlock[];
  pay: string;
  /** en lugar de precios: cotización a medida (desarrollistas) */
  custom?: string;
  cta: string;
  wa: string;
  /** SEO */
  seoTitle: string;
  description: string;
};

export const RUBRO_DATA: Record<RubroSlug, Rubro> = {
  arquitectos: {
    slug: "arquitectos",
    menu: "Arquitectos",
    title: "Tus obras merecen una vidriera a su *altura.*",
    lead: "Un solo link para mandar cada vez que te piden trabajos por WhatsApp o Instagram.",
    hero: { photo: casaHormigon },
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
    scene: { kind: "house", title: "Del plano a la casa", text: "Así se cuenta una obra en tu web: del primer trazo a la casa terminada.", fallback: fbArquitectos },
    demo: [{ web: "pau" }, { web: "ale" }],
    pay: "Con un solo encargo que cierres mandando este link, ya se *pagó.*",
    cta: "Elegí el plan y escribinos: con 3 obras tuyas *arrancamos.*",
    wa: "Hola Aspa, soy arquitecto/a y quiero mi web",
    seoTitle: "Páginas web para arquitectos",
    description:
      "Diseño de páginas web para arquitectos: portfolio de obras, servicios y contacto por WhatsApp, en un solo link. Lista en 10 días. Córdoba, Argentina.",
  },
  "estudios-de-arquitectura": {
    slug: "estudios-de-arquitectura",
    menu: "Estudios de arquitectura",
    title: "Un estudio se juzga por su portfolio. Que esté a la *altura.*",
    lead: "Todas las obras, el equipo y los servicios del estudio en un solo sitio, para cada cliente, desarrollista o concurso.",
    hero: { capture: obliqua, url: "obliqua-arq.vercel.app" },
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
    scene: { kind: "studio", title: "De la grilla a la maqueta", text: "Tu portfolio muestra cómo pensás un proyecto, no solo la foto final.", fallback: fbEstudios },
    demo: [{ web: "obl" }, { web: "ale" }, { mock: "boceto" }],
    pay: "Con un solo cliente que llegue por el portfolio, ya se *pagó.*",
    cta: "Pasanos 3 obras del estudio y te mandamos cómo quedaría la *portada.*",
    wa: "Hola Aspa, les paso 3 obras del estudio",
    seoTitle: "Páginas web para estudios de arquitectura",
    description:
      "Webs para estudios de arquitectura: página propia por obra, equipo, servicios, premios y panel para cargar proyectos, en dos idiomas. Córdoba, Argentina.",
  },
  interiorismo: {
    slug: "interiorismo",
    menu: "Interiorismo",
    title: "Que vean la *transformación* antes de llamarte.",
    lead: "Tus mejores antes y después, en un link que no se pierde en el feed.",
    hero: { photo: interiorDepto },
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
    scene: { kind: "room", title: "El ambiente, pieza por pieza", text: "Mostrá cómo un espacio vacío se convierte en un lugar para vivir.", fallback: fbInteriorismo },
    demo: [{ mock: "nogal" }],
    pay: "Se paga con la primera *cocina.*",
    cta: "Mandanos 3 trabajos por WhatsApp y te mostramos cómo *quedarían.*",
    wa: "Hola Aspa, tengo un estudio de interiorismo",
    seoTitle: "Páginas web para interioristas",
    description: "Webs para estudios de interiorismo: galería de antes y después, proceso de trabajo y formulario de presupuesto con fotos del espacio. Córdoba.",
  },
  constructoras: {
    slug: "constructoras",
    menu: "Constructoras",
    title: "Antes de pedirte presupuesto, te *googlean.*",
    lead: "La carta de presentación de tu empresa para cada comitente y cada licitación.",
    hero: { capture: dh, url: "dhengconsulting.com" },
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
    scene: { kind: "site", title: "La obra, en marcha", text: "Cada etapa a la vista: tu web muestra cómo avanza una obra de verdad.", fallback: fbConstructoras },
    demo: [{ web: "dh" }, { web: "cor" }],
    pay: "Tu carta de presentación para cada comitente y cada *licitación.*",
    cta: "Pasanos 3 obras por WhatsApp y te mandamos cómo quedaría tu *portada.*",
    wa: "Hola Aspa, somos una constructora",
    seoTitle: "Páginas web para constructoras",
    description:
      "Webs para constructoras: obras con ficha, servicios, trayectoria, clientes y testimonios, para cada comitente y licitación. Córdoba, Argentina.",
  },
  "constructoras-de-vivienda": {
    slug: "constructoras-de-vivienda",
    menu: "Constructoras de viviendas",
    title: "Antes de confiarte su casa, quieren ver las que ya *hiciste.*",
    lead: "Un link con tus casas terminadas, tus modelos y cómo trabajás, para mandar a cada familia que te consulta.",
    hero: { photo: casaModerna },
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
    scene: { kind: "homes", title: "Tus modelos, uno al lado del otro", text: "Cada familia ve las casas que hacés y elige la suya.", fallback: fbVivienda },
    demo: [{ web: "dh" }, { web: "cej" }],
    pay: "Con una sola familia que te elija, ya se *pagó.*",
    cta: "Pasanos fotos de 3 casas terminadas y te mandamos cómo quedaría tu *portada.*",
    wa: "Hola Aspa, somos una constructora de viviendas",
    seoTitle: "Páginas web para constructoras de viviendas",
    description: "Webs para constructoras de viviendas: casas terminadas, modelos con metros y plazo, proceso de obra y formulario de terreno. Córdoba.",
  },
  "steel-framing": {
    slug: "steel-framing",
    menu: "Steel framing",
    title: "Tu cliente no duda de vos: duda del *steel framing.*",
    lead: "Una web que explica el sistema, muestra la estructura por dentro y convence antes de la primera visita.",
    hero: { photo: steelHero },
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
    demo: [{ mock: "trama" }],
    pay: "Si convence a una sola familia de construir en seco, ya se *pagó.*",
    cta: "Pasanos fotos de una obra, de la estructura a la entrega, y te mostramos cómo se *vería.*",
    wa: "Hola Aspa, construimos en steel framing",
    seoTitle: "Páginas web para empresas de steel framing",
    description: "Webs para empresas de steel framing: el sistema explicado, la estructura por dentro, modelos con precio por m² y cotizador. Córdoba.",
  },
  desarrollistas: {
    slug: "desarrollistas",
    menu: "Desarrollistas",
    title: "Vendé unidades antes de que exista el *edificio.*",
    lead: "La sala de ventas digital de tu emprendimiento, abierta las 24 horas.",
    hero: { capture: architecture360, url: "architecture360.vercel.app/proyecto/demo" },
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
    demo: [{ mock: "devdemo" }],
    custom: "Cotización a medida, según la cantidad de *emprendimientos.*",
    pay: "Si ayuda a vender una sola unidad, se pagó muchas *veces.*",
    cta: "Pasanos los renders de un emprendimiento y te mandamos un video de 30 segundos con tu proyecto *cargado.*",
    wa: "Hola Aspa, somos desarrollistas",
    seoTitle: "Páginas web para desarrollistas inmobiliarios",
    description:
      "Webs para desarrollistas: masterplan interactivo, unidades con ficha, tour 360°, modelo BIM y cotizador de cuotas. La sala de ventas digital de tu emprendimiento.",
  },
};

// fotos usadas en los mockups (Nogal y la demo de desarrollistas)
export { interiorLiving, interiorDepto };
