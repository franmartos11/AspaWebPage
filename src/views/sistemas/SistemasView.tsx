import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { PainCard } from "@/components/PainArt";
import { routes, type Lang } from "@/i18n";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { TECH_ICONS } from "@/lib/tech-icons";
import { waLink } from "@/lib/site";
import rodeo from "@/assets/work/aspa-rodeo.jpg";
import scoutClientes from "@/assets/work/aspa-scout-clientes.jpg";
import particlesFb from "@/assets/sistemas/particles-fallback.jpg";
import uiComercio from "@/assets/sistemas/ui-comercio.jpg";
import uiConstruccion from "@/assets/sistemas/ui-construccion.jpg";
import uiIndustria from "@/assets/sistemas/ui-industria.jpg";
import uiSanidad from "@/assets/sistemas/ui-sanidad.jpg";
import uiServicios from "@/assets/sistemas/ui-servicios.jpg";
import "@/styles/faq.css";
import "@/styles/pains.css";
import "@/styles/prodname.css";
import "@/styles/seg.css";
import "./sistemas.css";

type Cell = string | [string, string];

// ---------- textos (la forma de `en` es la misma que la de `es`) ----------
const ES = {
  title: "Sistemas de gestión a medida en Córdoba",
  description:
    "Sistemas de gestión a medida, apps para celular, automatizaciones e integraciones para empresas. Dejá las planillas: un sistema hecho alrededor de cómo trabaja tu equipo. Córdoba, Argentina.",
  heroTitle: ["Sistemas a medida para ", { em: "tu" }, " forma de trabajar"] as (string | { em: string })[],
  heroLead: "No adaptamos tu empresa a un software genérico: construimos el software alrededor de tu empresa.",
  heroWa: "Hola Aspa, quiero contarles un proceso",
  heroBtn: "Contanos tu proceso",
  heroBtn2: "Ver sistemas que hicimos",
  painsT: ["Lo que pasa hoy en ", "muchas empresas"],
  pains: [
    "Todo vive en planillas que solo entiende una persona.",
    "Los pedidos y avisos se pierden en WhatsApp.",
    "Las mismas tareas se hacen a mano todos los días.",
    "Para saber cómo va el negocio hay que armar un reporte.",
  ],
  partsLabel: "De la planilla al sistema",
  partsA: ["Tu información, ", "hoy."],
  partsAText: "Celdas sueltas, fórmulas rotas y tres versiones del mismo archivo.",
  partsB: ["Tu información, ", "ordenada."],
  partsBText: "Indicadores, tablas y gráficos que se actualizan solos, en un solo lugar.",
  cmpT: "Arrastrá para comparar",
  xlsFile: "Hacienda_2026_FINAL_v3 (2).xlsx",
  xlsSaved: "Guardado hace 3 días",
  xlsFormula: "=SUMA(D2:D6)/CONTAR(C2:C6)",
  // planilla "de antes" del comparador (contenido de ejemplo del diseño)
  xls: [
    [
      ["LOTE", "b"],
      ["CATEG", "b"],
      ["CAB", "b"],
      ["KG TOTAL", "b"],
      ["POTRERO", "b"],
      ["PROM", "b"],
      ["OBS", "b"],
    ],
    ["L1", "novillos", "186", "76632", "la loma", "412", ["ver con Juan", "g"]],
    ["L-4", "Vaq.", ["132??", "y"], "51612", "EL BAJO", "391", ""],
    ["lote 7", "terneros", "248", ["46128", "y"], "aguada", ["#¡DIV/0!", "r"], ["pesar de nuevo", "g"]],
    ["L9", "vacas", "310", "145080", "monte", "468", ""],
    ["L11", "TOROS", "18", "13356", "casco", ["#¡REF!", "r"], ["vacunar??", "g"]],
    ["", "", ["=SUMA?", "y"], "", "", ["#¡VALOR!", "r"], ""],
    ["", "", "", "", "", "", ""],
    [["vacunas: aftosa lote 7 fines oct (?)", "g"], "", "", "", "", "", ""],
  ] as Cell[][],
  xlsTabs: ["Hoja1", "Hoja1 (2)", "pesadas viejo", "NO TOCAR"],
  cmpKnob: "Comparar planilla y sistema",
  buildT: ["Seis cosas que hacemos ", "todos los días"],
  build: {
    "b-gestion": ["Sistemas de gestión", "Todo lo que hoy está en planillas, en un sistema que tu equipo entiende."],
    apps: ["Apps para celular", "Para tu equipo en la calle o para tus clientes, en iOS y Android."],
    automatizaciones: ["Automatizaciones e IA", "Las tareas repetitivas se hacen solas y te avisan cuando algo necesita tu atención."],
    "b-integraciones": ["Integraciones", "Conectamos el sistema con lo que ya usás, para no cargar dos veces lo mismo."],
    "b-tableros": ["Tableros y reportes", "Los números del negocio en tiempo real, sin armar un reporte a mano."],
    "b-crm": ["Gestión comercial y CRM", "Del primer contacto al cobro, con todo el equipo comercial en el mismo lugar."],
  } as Record<string, [string, string]>,
  flowT: ["Lo que pasa cuando tu sistema trabaja ", "solo"],
  flowText: "Elegí qué pasa en tu empresa y mirá todo lo que el sistema resuelve, sin que nadie toque nada.",
  flowSeg: "Qué pasa en tu empresa",
  flows: ["Llega un pedido", "Piden un turno", "Vence una cuota"],
  flowSum: "5 tareas · 3,2 s · 0 personas",
  phone: "Notificaciones del celular",
  phoneDate: "jueves 23 de octubre",
  flowLink: "Contanos qué tarea querés automatizar →",
  rubrosT: ["Sistemas para ", "tu rubro"],
  rubros: [
    { name: "Campo", items: ["Stock de hacienda por lote y categoría", "Pesadas desde la manga con el celular", "Calendario de sanidad con avisos"] },
    {
      name: "Servicios",
      items: ["Turnos con confirmación automática por WhatsApp", "Órdenes de trabajo y técnicos en la calle", "Abonos y cobranzas al día"],
    },
    {
      name: "Construcción",
      items: ["Avance de obra con fotos y certificados", "Compras y stock de materiales por obra", "Partes diarios del personal"],
    },
    {
      name: "Comercio",
      items: ["Stock de varias sucursales en un solo lugar", "Listas de precios que se actualizan solas", "Facturación electrónica integrada"],
    },
    { name: "Industria", items: ["Órdenes de producción y trazabilidad", "Mantenimiento preventivo de máquinas", "Control de calidad por lote"] },
  ],
  sysT: ["Nuestros ", "sistemas"],
  systems: [
    "Gestión de hacienda: stock de animales, pesadas, sanidad y movimientos, en un solo lugar.",
    "Para buscar clientes: encuentra empresas que encajan con tu cliente ideal y ordena prospectos, conversaciones y seguimiento.",
  ],
  sysAlt: (name: string) => `Pantalla de Aspa ${name}`,
  sysPill: "Ver caso →",
  storyT: ["De la primera charla a la ", "versión 1.0"],
  steps: ["Descubrimiento", "Análisis", "Diseño UI/UX", "Desarrollo ágil", "Testing", "Lanzamiento y soporte"],
  storyCap: "Entendemos el negocio, los objetivos y a quienes lo van a usar.",
  toolsT: ["Herramientas ", "probadas"],
  techs: [
    ["React", "Interfaces web rápidas y fáciles de mantener."],
    ["Next.js", "Webs y sistemas que cargan rápido y aparecen en Google."],
    ["TypeScript", "Código más seguro: menos errores antes de que lleguen a vos."],
    ["Node.js", "El servidor y las integraciones con otros sistemas."],
    ["React Native", "Una sola app para iOS y Android."],
    ["Flutter", "Apps con interfaces muy fluidas en los dos sistemas."],
    ["Swift", "Apps nativas para iPhone cuando hace falta lo máximo."],
    ["Kotlin", "Apps nativas para Android."],
    ["Firebase", "Datos en tiempo real, avisos y acceso de usuarios."],
    ["Tailwind", "Diseño consistente en todas las pantallas."],
  ] as [string, string][],
  ownT: ["Un sistema que es ", "tuyo"],
  own: [
    ["El código y los datos son tuyos", "Todo queda a nombre de tu empresa. Si mañana querés seguir con otro equipo, podés."],
    ["Documentación", "Cómo funciona el sistema y cómo se mantiene, por escrito."],
    ["Capacitación", "Le enseñamos a tu equipo a usarlo, en persona o por videollamada."],
    ["Soporte después del lanzamiento", "Seguimos al lado: ajustes, dudas y mejoras."],
    ["Crecer por etapas", "Arrancamos por lo que más duele y sumamos módulos cuando los necesites."],
  ] as [string, string][],
  faqT: ["Lo que todos ", "preguntan"],
  faq: [
    [
      "¿Cuánto cuesta un sistema a medida?",
      "Depende del alcance. Arrancamos con un análisis sin costo y después te pasamos una propuesta cerrada, con alcance, plazo y precio.",
    ],
    ["¿Cuánto tarda?", "Depende de qué se construye. Trabajamos por etapas cortas: en las primeras semanas ya estás probando partes del sistema."],
    ["¿El sistema es mío?", "Sí. El código y los datos quedan a nombre de tu empresa."],
    ["¿Funciona en el celular?", "Sí. Los sistemas se usan desde la compu y el celular, y si hace falta hacemos una app."],
    ["¿Qué pasa si después necesito cambios?", "Los hacemos. El sistema crece con tu empresa: sumamos módulos o ajustamos lo que haga falta."],
    ["¿Pueden trabajar con lo que ya uso?", "Sí. Nos integramos con facturación electrónica, WhatsApp, Mercado Pago y las planillas que ya tenés."],
  ] as [string, string][],
  ctaQ: "¿Qué proceso de tu empresa te gustaría que se haga solo?",
  ctaWa: "Hola Aspa, quiero automatizar un proceso",
  schemaName: "Sistemas de gestión a medida",
  crumb: "Sistemas a medida",
};

type Copy = typeof ES;

const EN: Copy = {
  title: "Custom management systems in Córdoba",
  description:
    "Custom management systems, mobile apps, automations and integrations for businesses. Ditch the spreadsheets: software built around the way your team actually works. Córdoba, Argentina.",
  heroTitle: ["Custom software built for ", { em: "your" }, " way of working"],
  heroLead: "We don't bend your business to fit generic software: we build the software around your business.",
  heroWa: "Hi Aspa, I'd like to tell you about a process",
  heroBtn: "Tell us your process",
  heroBtn2: "See systems we've built",
  painsT: ["What's happening today at ", "many companies"],
  pains: [
    "Everything lives in spreadsheets only one person understands.",
    "Orders and updates get lost in WhatsApp.",
    "The same tasks get done by hand every single day.",
    "Knowing how the business is doing means building a report.",
  ],
  partsLabel: "From spreadsheet to system",
  partsA: ["Your data, ", "today."],
  partsAText: "Scattered cells, broken formulas and three versions of the same file.",
  partsB: ["Your data, ", "organized."],
  partsBText: "Metrics, tables and charts that update themselves, all in one place.",
  cmpT: "Drag to compare",
  xlsFile: "Cattle_2026_FINAL_v3 (2).xlsx",
  xlsSaved: "Saved 3 days ago",
  xlsFormula: "=SUM(D2:D6)/COUNT(C2:C6)",
  xls: [
    [
      ["LOT", "b"],
      ["CLASS", "b"],
      ["HEAD", "b"],
      ["TOTAL KG", "b"],
      ["PASTURE", "b"],
      ["AVG", "b"],
      ["NOTES", "b"],
    ],
    ["L1", "steers", "186", "76632", "the hill", "412", ["check w/ Juan", "g"]],
    ["L-4", "Heif.", ["132??", "y"], "51612", "LOW FIELD", "391", ""],
    ["lot 7", "calves", "248", ["46128", "y"], "creek", ["#DIV/0!", "r"], ["weigh again", "g"]],
    ["L9", "cows", "310", "145080", "woods", "468", ""],
    ["L11", "BULLS", "18", "13356", "home lot", ["#REF!", "r"], ["vaccinate??", "g"]],
    ["", "", ["=SUM?", "y"], "", "", ["#VALUE!", "r"], ""],
    ["", "", "", "", "", "", ""],
    [["vaccines: FMD lot 7 late Oct (?)", "g"], "", "", "", "", "", ""],
  ],
  xlsTabs: ["Sheet1", "Sheet1 (2)", "old weighings", "DO NOT TOUCH"],
  cmpKnob: "Compare spreadsheet and system",
  buildT: ["Six things we do ", "every day"],
  build: {
    "b-gestion": ["Management systems", "Everything that lives in spreadsheets today, in a system your team gets."],
    apps: ["Mobile apps", "For your field team or for your customers, on iOS and Android."],
    automatizaciones: ["Automations and AI", "Repetitive tasks run on their own and alert you when something needs your attention."],
    "b-integraciones": ["Integrations", "We connect the system to the tools you already use, so nothing gets entered twice."],
    "b-tableros": ["Dashboards and reports", "Your business numbers in real time, without building reports by hand."],
    "b-crm": ["Sales management and CRM", "From first contact to payment, with your whole sales team in one place."],
  },
  flowT: ["What happens when your system works ", "on its own"],
  flowText: "Pick what happens at your company and watch everything the system handles, without anyone lifting a finger.",
  flowSeg: "What happens at your company",
  flows: ["An order comes in", "A booking request", "A payment is due"],
  flowSum: "5 tasks · 3.2 s · 0 people",
  phone: "Phone notifications",
  phoneDate: "Thursday, October 23",
  flowLink: "Tell us which task you want to automate →",
  rubrosT: ["Systems for ", "your industry"],
  rubros: [
    { name: "Farming", items: ["Cattle inventory by lot and class", "Weigh-ins from the chute on your phone", "Animal health calendar with alerts"] },
    {
      name: "Services",
      items: ["Bookings auto-confirmed over WhatsApp", "Work orders and technicians in the field", "Subscriptions and collections up to date"],
    },
    { name: "Construction", items: ["Job progress with photos and pay applications", "Purchasing and material stock per job", "Daily crew reports"] },
    {
      name: "Retail",
      items: ["Inventory across all your stores in one place", "Price lists that update themselves", "Built-in electronic invoicing"],
    },
    { name: "Manufacturing", items: ["Production orders and traceability", "Preventive machine maintenance", "Quality control by batch"] },
  ],
  sysT: ["Our ", "systems"],
  systems: [
    "Cattle management: herd inventory, weigh-ins, animal health and movements, all in one place.",
    "For finding customers: it spots companies that match your ideal customer and organizes prospects, conversations and follow-ups.",
  ],
  sysAlt: (name: string) => `Aspa ${name} screen`,
  sysPill: "View case →",
  storyT: ["From the first call to ", "version 1.0"],
  steps: ["Discovery", "Analysis", "UI/UX design", "Agile development", "Testing", "Launch and support"],
  storyCap: "We learn the business, the goals and the people who will use it.",
  toolsT: ["Proven ", "tools"],
  techs: [
    ["React", "Fast web interfaces that are easy to maintain."],
    ["Next.js", "Websites and systems that load fast and show up on Google."],
    ["TypeScript", "Safer code: fewer bugs before they ever reach you."],
    ["Node.js", "The server and the integrations with other systems."],
    ["React Native", "One app for both iOS and Android."],
    ["Flutter", "Apps with silky-smooth interfaces on both platforms."],
    ["Swift", "Native iPhone apps when you need the very best."],
    ["Kotlin", "Native Android apps."],
    ["Firebase", "Real-time data, notifications and user sign-in."],
    ["Tailwind", "Consistent design across every screen."],
  ],
  ownT: ["A system that's ", "yours"],
  own: [
    ["The code and the data are yours", "Everything is in your company's name. If you ever want to move to another team, you can."],
    ["Documentation", "How the system works and how to maintain it, in writing."],
    ["Training", "We teach your team how to use it, in person or over video call."],
    ["Support after launch", "We stay by your side: tweaks, questions and improvements."],
    ["Grow in stages", "We start with what hurts most and add modules as you need them."],
  ],
  faqT: ["What everyone ", "asks"],
  faq: [
    [
      "How much does custom software cost?",
      "It depends on the scope. We start with a free analysis and then send you a fixed proposal with scope, timeline and price.",
    ],
    [
      "How long does it take?",
      "It depends on what we're building. We work in short stages: within the first few weeks you're already testing parts of the system.",
    ],
    ["Do I own the system?", "Yes. The code and the data are in your company's name."],
    ["Does it work on my phone?", "Yes. Our systems work on both computer and phone, and if you need it, we build an app."],
    ["What if I need changes later?", "We make them. The system grows with your company: we add modules or adjust whatever is needed."],
    [
      "Can you work with the tools I already use?",
      "Yes. We integrate with electronic invoicing, WhatsApp, Mercado Pago and the spreadsheets you already have.",
    ],
  ],
  ctaQ: "Which process at your company would you love to see run on its own?",
  ctaWa: "Hi Aspa, I'd like to automate a process",
  schemaName: "Custom management systems",
  crumb: "Custom software",
};

const T: Record<Lang, Copy> = { es: ES, en: EN };

// «Seis cosas que hacemos todos los días»: no se muestra por ahora (pedido de Aspa). En true vuelve a aparecer.
const SHOW_SEIS = false;

// trazos de los íconos de "Seis cosas que hacemos" (se dibujan al entrar: pathLength=1)
const BUILD: { id: string; icon: React.ReactNode }[] = [
  {
    id: "b-gestion",
    icon: (
      <>
        <rect x="6" y="8" width="36" height="28" rx="4" pathLength={1} />
        <path d="M6 16h36M16 16v20" pathLength={1} />
        <path d="M14 42h20" pathLength={1} />
      </>
    ),
  },
  {
    id: "apps",
    icon: (
      <>
        <rect x="14" y="4" width="20" height="40" rx="5" pathLength={1} />
        <path d="M21 9h6M22 38h4" pathLength={1} />
      </>
    ),
  },
  {
    id: "automatizaciones",
    icon: (
      <>
        <circle cx="24" cy="24" r="8" pathLength={1} />
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" pathLength={1} />
      </>
    ),
  },
  {
    id: "b-integraciones",
    icon: (
      <>
        <rect x="4" y="16" width="14" height="16" rx="3" pathLength={1} />
        <rect x="30" y="16" width="14" height="16" rx="3" pathLength={1} />
        <path d="M18 24h12M25 20l4 4-4 4" pathLength={1} />
      </>
    ),
  },
  {
    id: "b-tableros",
    icon: (
      <>
        <path d="M6 42h36" pathLength={1} />
        <rect x="10" y="24" width="6" height="14" rx="1" pathLength={1} />
        <rect x="21" y="16" width="6" height="22" rx="1" pathLength={1} />
        <rect x="32" y="8" width="6" height="30" rx="1" pathLength={1} />
      </>
    ),
  },
  {
    id: "b-crm",
    icon: (
      <>
        <circle cx="17" cy="17" r="6" pathLength={1} />
        <circle cx="33" cy="20" r="5" pathLength={1} />
        <path d="M6 40c1-7 6-11 11-11s10 4 11 11M27 40c1-5 3-8 6-8s6 3 7 8" pathLength={1} />
      </>
    ),
  },
];

const RUBRO_IMGS = [rodeo, uiServicios, uiConstruccion, uiComercio, uiIndustria];

const STAGE_SIZES = "(max-width: 980px) calc(100vw - 48px), 560px";

export function sistemasMeta(lang: Lang): Metadata {
  const t = T[lang];
  return pageMeta({ path: routes(lang).sistemas, title: t.title, description: t.description });
}

export function SistemasView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const r = routes(lang);
  const PATH = r.sistemas;
  const build = BUILD.map((b) => ({ ...b, title: t.build[b.id][0], text: t.build[b.id][1] }));
  const rubros = t.rubros.map((x, i) => ({ ...x, img: RUBRO_IMGS[i] }));
  const systems = [
    { name: "Rodeo", line: t.systems[0], img: rodeo, href: r.casoRodeo },
    { name: "Scout", line: t.systems[1], img: scoutClientes, href: r.casoScout },
  ];
  return (
    <main id="main" className="view">
      <section className="shero" aria-labelledby="sis-title">
        <div className="shero-bg" aria-hidden="true">
          {[uiSanidad, scoutClientes, uiComercio].map((img, i) => (
            <div className={`pc pc${i + 1}`} key={i}>
              <Image src={img} alt="" sizes="(max-width: 980px) 80vw, 46vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="wrap shero-txt">
          <CharTitle id="sis-title" parts={t.heroTitle} />
          <p className="lead r-late">{t.heroLead}</p>
          <div className="btns r-late">
            <a className="btn btn-glass btn-blue" href={waLink(t.heroWa)} target="_blank" rel="noopener">
              <span>{t.heroBtn}</span>
            </a>
            <a className="btn btn-glass" href="#nuestros">
              <span>{t.heroBtn2}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="sis-story">
        <div className="story-stage">
          <div className="wrap story-head">
            <h2 className="h2" id="sis-story">
              {t.storyT[0]}
              <em className="grad">{t.storyT[1]}</em>
            </h2>
          </div>
          <div className="story-draw" id="storyDraw"></div>
          <div className="wrap">
            <div className="story-bar">
              <div className="sb-line">
                <i></i>
              </div>
              <ol className="sb-steps">
                {t.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <p className="story-cap mut" id="storyCap">
              {t.storyCap}
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sis-hoy">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-hoy" data-lines>
                {t.painsT[0]}
                <em className="grad">{t.painsT[1]}</em>
              </h2>
            </div>
          </div>
          <div className="pains4">
            {t.pains.map((p, i) => (
              <PainCard key={p} text={p} n={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="parts" id="parts" aria-label={t.partsLabel}>
        <div className="parts-stage">
          <div className="m3d parts-3d" aria-hidden="true">
            <Image className="m3d-fb" src={particlesFb} alt="" sizes="100vw" />
          </div>
          <div className="wrap parts-txt">
            <div className="pt-stack">
              <div className="pt-a">
                <h2 className="h2">
                  {t.partsA[0]}
                  <em className="grad">{t.partsA[1]}</em>
                </h2>
                <p className="mut">{t.partsAText}</p>
              </div>
              <div className="pt-b">
                <h2 className="h2">
                  {t.partsB[0]}
                  <em className="grad">{t.partsB[1]}</em>
                </h2>
                <p className="mut">{t.partsBText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="sis-cmp">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h3" id="sis-cmp">
                {t.cmpT}
              </h2>
            </div>
          </div>
          <div className="cmp" data-cmp>
            <div className="pane" aria-hidden="true">
              <div className="xls">
                <div className="xls-bar">
                  <b>{t.xlsFile}</b>
                  <span style={{ opacity: 0.7 }}>{t.xlsSaved}</span>
                </div>
                <div className="xls-fx">
                  <span>F7</span>
                  <span>{t.xlsFormula}</span>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      {"ABCDEFG".split("").map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                    {t.xls.map((row, ri) => (
                      <tr key={ri}>
                        <td>{ri + 1}</td>
                        {row.map((cell, c) =>
                          typeof cell === "string" ? (
                            <td key={c}>{cell}</td>
                          ) : cell[1] === "b" ? (
                            <td key={c}>
                              <b>{cell[0]}</b>
                            </td>
                          ) : (
                            <td key={c} className={cell[1]}>
                              {cell[0]}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="xls-tabs">
                  {t.xlsTabs.map((x, i) => (
                    <span key={x} className={i === 0 ? "on" : undefined}>
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="pane p2" aria-hidden="true">
              <Image className="pane-img" src={rodeo} alt="" sizes="(max-width: 1148px) calc(100vw - 48px), 1100px" />
            </div>
            <div className="handle">
              <button className="knob" type="button" role="slider" aria-label={t.cmpKnob} aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* «Seis cosas que hacemos…»: oculta por ahora (SHOW_SEIS); el código queda por si se vuelve a usar */}
      {SHOW_SEIS && (
        <section className="section" id="que-construimos" aria-labelledby="sis-seis">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <h2 className="h2" id="sis-seis" data-lines>
                  {t.buildT[0]}
                  <em className="grad">{t.buildT[1]}</em>
                </h2>
              </div>
            </div>
            <div className="bgrid">
              {build.map((b) => (
                <article className="bcard glass rv" id={b.id} key={b.id}>
                  <svg
                    className="ic"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {b.icon}
                  </svg>
                  <h3>{b.title}</h3>
                  <p className="mut">{b.text}</p>
                </article>
              ))}
            </div>
            <div className="flow-blk">
              <div className="sec-head">
                <h3 className="h3 flow-t" data-lines>
                  {t.flowT[0]}
                  <em className="grad">{t.flowT[1]}</em>
                </h3>
                <p className="mut">{t.flowText}</p>
              </div>
              <div className="seg glass" data-seg="flow" role="tablist" aria-label={t.flowSeg}>
                <span className="seg-drop" aria-hidden="true"></span>
                {t.flows.map((f, i) => (
                  <button key={f} type="button" className={i === 0 ? "on" : undefined} role="tab" aria-selected={i === 0}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="flow-grid">
                <div className="flow-dia" id="flowDia">
                  <svg className="flow-svg" id="flowSvg" aria-hidden="true"></svg>
                  <i className="flow-pulse" id="flowPulse" aria-hidden="true"></i>
                  <div className="flow-sum glass" id="flowSum" aria-live="polite">
                    {t.flowSum}
                  </div>
                </div>
                <div className="flow-ph">
                  <div className="iph" aria-label={t.phone} role="img">
                    <i className="iph-isl"></i>
                    <div className="iph-scr">
                      <div className="iph-wall"></div>
                      <div className="iph-time">
                        <small>{t.phoneDate}</small>
                        <b>9:41</b>
                      </div>
                      <div className="iph-stack" id="iphStack"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flow-foot">
                <a className="ul" href="#contacto">
                  {t.flowLink}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" id="rubros" aria-labelledby="sis-rubros">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-rubros" data-lines>
                {t.rubrosT[0]}
                <em className="grad">{t.rubrosT[1]}</em>
              </h2>
            </div>
          </div>
          <div className="grid rub-grid">
            <ul className="rub-list" id="rubList">
              {rubros.map((x, i) => (
                <li className={i === 0 ? "rub on" : "rub"} key={x.name}>
                  <a href="#contacto">
                    <span className="w">{x.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="rub-img glass" aria-hidden="true">
              {rubros.map((x, i) => (
                <div className={i === 0 ? "rimg on" : "rimg"} key={x.name}>
                  <Image src={x.img} alt="" sizes={STAGE_SIZES} />
                  <ul className="rex glass">
                    {x.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="nuestros" aria-labelledby="sis-nuestros">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-nuestros" data-lines>
                {t.sysT[0]}
                <em className="grad">{t.sysT[1]}</em>
              </h2>
            </div>
          </div>
          <div className="sys-grid">
            {systems.map((s) => (
              <Link className="sys glass rv" href={s.href} key={s.name}>
                <div className="appwin">
                  <Image src={s.img} alt={t.sysAlt(s.name)} sizes="(max-width: 980px) calc(100vw - 48px), 580px" />
                </div>
                <div className="sys-meta">
                  <div>
                    <h3 className="prodname" aria-label={`Aspa ${s.name}`}>
                      <span className="pn-logo" aria-hidden="true">
                        <Logo />
                      </span>
                      <span className="pn-name" aria-hidden="true">
                        {s.name}
                      </span>
                    </h3>
                    <p className="mut" style={{ margin: "10px 0 0", maxWidth: "44ch" }}>
                      {s.line}
                    </p>
                  </div>
                  <span className="hc-pill glass">{t.sysPill}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sis-tools">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-tools" data-lines>
                {t.toolsT[0]}
                <em className="grad">{t.toolsT[1]}</em>
              </h2>
            </div>
          </div>
          <ul className="techs">
            {t.techs.map(([name, tip], i) => (
              <li
                className="tech glass rv"
                tabIndex={0}
                key={name}
                aria-describedby={`tip-${i}`}
                data-spin={name.startsWith("React") || undefined}
                style={{ "--c": TECH_ICONS[name].color, "--rv-i": i } as CSSProperties}
              >
                <svg className="tech-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={TECH_ICONS[name].color}>
                  <path d={TECH_ICONS[name].path} />
                </svg>
                <span>{name}</span>
                <span className="tip glass" role="tooltip" id={`tip-${i}`}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="sis-own">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-own" data-lines>
                {t.ownT[0]}
                <em className="grad">{t.ownT[1]}</em>
              </h2>
            </div>
          </div>
          <div className="llgrid">
            {t.own.map(([title, d], i) => (
              <article className="ll glass rv" key={title}>
                <span className="ll-n">0{i + 1}</span>
                <h3>{title}</h3>
                <p className="mut">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Faq
        id="sis-faq"
        title={
          <>
            {t.faqT[0]}
            <em className="grad">{t.faqT[1]}</em>
          </>
        }
        items={t.faq}
      />

      <Cta lang={lang} question={t.ctaQ} message={t.ctaWa} />

      <JsonLd
        data={serviceSchema({
          name: t.schemaName,
          description: t.description,
          path: PATH,
          offers: build.map((b) => b.title),
        })}
      />
      <JsonLd data={breadcrumbs([{ name: t.crumb, path: PATH }])} />
      <PageFx page="sistemas" />
    </main>
  );
}
