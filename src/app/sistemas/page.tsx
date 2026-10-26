import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { PainCard } from "@/components/PainArt";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { TECH_ICONS } from "@/lib/tech-icons";
import { ROUTES, waLink } from "@/lib/site";
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

const PATH = ROUTES.sistemas;
const DESCRIPTION =
  "Sistemas de gestión a medida, apps para celular, automatizaciones e integraciones para empresas. Dejá las planillas: un sistema hecho alrededor de cómo trabaja tu equipo. Córdoba, Argentina.";

export const metadata: Metadata = pageMeta({ path: PATH, title: "Sistemas de gestión a medida en Córdoba", description: DESCRIPTION });

const PAINS = [
  "Todo vive en planillas que solo entiende una persona.",
  "Los pedidos y avisos se pierden en WhatsApp.",
  "Las mismas tareas se hacen a mano todos los días.",
  "Para saber cómo va el negocio hay que armar un reporte.",
];

// trazos de los íconos de "Seis cosas que hacemos" (se dibujan al entrar: pathLength=1)
const BUILD: { id: string; title: string; text: string; icon: React.ReactNode }[] = [
  {
    id: "b-gestion",
    title: "Sistemas de gestión",
    text: "Todo lo que hoy está en planillas, en un sistema que tu equipo entiende.",
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
    title: "Apps para celular",
    text: "Para tu equipo en la calle o para tus clientes, en iOS y Android.",
    icon: (
      <>
        <rect x="14" y="4" width="20" height="40" rx="5" pathLength={1} />
        <path d="M21 9h6M22 38h4" pathLength={1} />
      </>
    ),
  },
  {
    id: "automatizaciones",
    title: "Automatizaciones e IA",
    text: "Las tareas repetitivas se hacen solas y te avisan cuando algo necesita tu atención.",
    icon: (
      <>
        <circle cx="24" cy="24" r="8" pathLength={1} />
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4" pathLength={1} />
      </>
    ),
  },
  {
    id: "b-integraciones",
    title: "Integraciones",
    text: "Conectamos el sistema con lo que ya usás, para no cargar dos veces lo mismo.",
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
    title: "Tableros y reportes",
    text: "Los números del negocio en tiempo real, sin armar un reporte a mano.",
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
    title: "Gestión comercial y CRM",
    text: "Del primer contacto al cobro, con todo el equipo comercial en el mismo lugar.",
    icon: (
      <>
        <circle cx="17" cy="17" r="6" pathLength={1} />
        <circle cx="33" cy="20" r="5" pathLength={1} />
        <path d="M6 40c1-7 6-11 11-11s10 4 11 11M27 40c1-5 3-8 6-8s6 3 7 8" pathLength={1} />
      </>
    ),
  },
];

const FLOWS = ["Llega un pedido", "Piden un turno", "Vence una cuota"];

const RUBROS = [
  { name: "Campo", img: rodeo, items: ["Stock de hacienda por lote y categoría", "Pesadas desde la manga con el celular", "Calendario de sanidad con avisos"] },
  {
    name: "Servicios",
    img: uiServicios,
    items: ["Turnos con confirmación automática por WhatsApp", "Órdenes de trabajo y técnicos en la calle", "Abonos y cobranzas al día"],
  },
  {
    name: "Construcción",
    img: uiConstruccion,
    items: ["Avance de obra con fotos y certificados", "Compras y stock de materiales por obra", "Partes diarios del personal"],
  },
  {
    name: "Comercio",
    img: uiComercio,
    items: ["Stock de varias sucursales en un solo lugar", "Listas de precios que se actualizan solas", "Facturación electrónica integrada"],
  },
  {
    name: "Industria",
    img: uiIndustria,
    items: ["Órdenes de producción y trazabilidad", "Mantenimiento preventivo de máquinas", "Control de calidad por lote"],
  },
];

const SYSTEMS = [
  {
    name: "Rodeo",
    line: "Gestión de hacienda: stock de animales, pesadas, sanidad y movimientos, en un solo lugar.",
    img: rodeo,
    href: ROUTES.casoRodeo,
  },
  {
    name: "Scout",
    line: "Para buscar clientes: encuentra empresas que encajan con tu cliente ideal y ordena prospectos, conversaciones y seguimiento.",
    img: scoutClientes,
    href: ROUTES.casoScout,
  },
];

const STEPS = ["Descubrimiento", "Análisis", "Diseño UI/UX", "Desarrollo ágil", "Testing", "Lanzamiento y soporte"];

const TECHS: [string, string][] = [
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
];

const OWN: [string, string][] = [
  ["El código y los datos son tuyos", "Todo queda a nombre de tu empresa. Si mañana querés seguir con otro equipo, podés."],
  ["Documentación", "Cómo funciona el sistema y cómo se mantiene, por escrito."],
  ["Capacitación", "Le enseñamos a tu equipo a usarlo, en persona o por videollamada."],
  ["Soporte después del lanzamiento", "Seguimos al lado: ajustes, dudas y mejoras."],
  ["Crecer por etapas", "Arrancamos por lo que más duele y sumamos módulos cuando los necesites."],
];

const FAQ: [string, string][] = [
  [
    "¿Cuánto cuesta un sistema a medida?",
    "Depende del alcance. Arrancamos con un análisis sin costo y después te pasamos una propuesta cerrada, con alcance, plazo y precio.",
  ],
  ["¿Cuánto tarda?", "Depende de qué se construye. Trabajamos por etapas cortas: en las primeras semanas ya estás probando partes del sistema."],
  ["¿El sistema es mío?", "Sí. El código y los datos quedan a nombre de tu empresa."],
  ["¿Funciona en el celular?", "Sí. Los sistemas se usan desde la compu y el celular, y si hace falta hacemos una app."],
  ["¿Qué pasa si después necesito cambios?", "Los hacemos. El sistema crece con tu empresa: sumamos módulos o ajustamos lo que haga falta."],
  ["¿Pueden trabajar con lo que ya uso?", "Sí. Nos integramos con facturación electrónica, WhatsApp, Mercado Pago y las planillas que ya tenés."],
];

// planilla "de antes" del comparador (contenido de ejemplo del diseño)
const XLS: (string | [string, string])[][] = [
  [["LOTE", "b"], ["CATEG", "b"], ["CAB", "b"], ["KG TOTAL", "b"], ["POTRERO", "b"], ["PROM", "b"], ["OBS", "b"]],
  ["L1", "novillos", "186", "76632", "la loma", "412", ["ver con Juan", "g"]],
  ["L-4", "Vaq.", ["132??", "y"], "51612", "EL BAJO", "391", ""],
  ["lote 7", "terneros", "248", ["46128", "y"], "aguada", ["#¡DIV/0!", "r"], ["pesar de nuevo", "g"]],
  ["L9", "vacas", "310", "145080", "monte", "468", ""],
  ["L11", "TOROS", "18", "13356", "casco", ["#¡REF!", "r"], ["vacunar??", "g"]],
  ["", "", ["=SUMA?", "y"], "", "", ["#¡VALOR!", "r"], ""],
  ["", "", "", "", "", "", ""],
  [["vacunas: aftosa lote 7 fines oct (?)", "g"], "", "", "", "", "", ""],
];

const STAGE_SIZES = "(max-width: 980px) calc(100vw - 48px), 560px";

export default function SistemasPage() {
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
          <CharTitle id="sis-title" parts={["Sistemas a medida para ", { em: "tu" }, " forma de trabajar"]} />
          <p className="lead r-late">No adaptamos tu empresa a un software genérico: construimos el software alrededor de tu empresa.</p>
          <div className="btns r-late">
            <a className="btn btn-glass btn-blue" href={waLink("Hola Aspa, quiero contarles un proceso")} target="_blank" rel="noopener">
              <span>Contanos tu proceso</span>
            </a>
            <a className="btn btn-glass" href="#nuestros">
              <span>Ver sistemas que hicimos</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sis-hoy">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-hoy" data-lines>
                Lo que pasa hoy en <em className="grad">muchas empresas</em>
              </h2>
            </div>
          </div>
          <div className="pains4">
            {PAINS.map((p, i) => (
              <PainCard key={p} text={p} n={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="parts" id="parts" aria-label="De la planilla al sistema">
        <div className="parts-stage">
          <div className="m3d parts-3d" aria-hidden="true">
            <Image className="m3d-fb" src={particlesFb} alt="" sizes="100vw" />
          </div>
          <div className="wrap parts-txt">
            <div className="pt-stack">
              <div className="pt-a">
                <h2 className="h2">
                  Tu información, <em className="grad">hoy.</em>
                </h2>
                <p className="mut">Celdas sueltas, fórmulas rotas y tres versiones del mismo archivo.</p>
              </div>
              <div className="pt-b">
                <h2 className="h2">
                  Tu información, <em className="grad">ordenada.</em>
                </h2>
                <p className="mut">Indicadores, tablas y gráficos que se actualizan solos, en un solo lugar.</p>
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
                Arrastrá para comparar
              </h2>
            </div>
          </div>
          <div className="cmp" data-cmp>
            <div className="pane" aria-hidden="true">
              <div className="xls">
                <div className="xls-bar">
                  <b>Hacienda_2026_FINAL_v3 (2).xlsx</b>
                  <span style={{ opacity: 0.7 }}>Guardado hace 3 días</span>
                </div>
                <div className="xls-fx">
                  <span>F7</span>
                  <span>=SUMA(D2:D6)/CONTAR(C2:C6)</span>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      {"ABCDEFG".split("").map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                    {XLS.map((row, r) => (
                      <tr key={r}>
                        <td>{r + 1}</td>
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
                  <span className="on">Hoja1</span>
                  <span>Hoja1 (2)</span>
                  <span>pesadas viejo</span>
                  <span>NO TOCAR</span>
                </div>
              </div>
            </div>
            <div className="pane p2" aria-hidden="true">
              <Image className="pane-img" src={rodeo} alt="" sizes="(max-width: 1148px) calc(100vw - 48px), 1100px" />
            </div>
            <div className="handle">
              <button className="knob" type="button" role="slider" aria-label="Comparar planilla y sistema" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="que-construimos" aria-labelledby="sis-seis">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-seis" data-lines>
                Seis cosas que hacemos <em className="grad">todos los días</em>
              </h2>
            </div>
          </div>
          <div className="bgrid">
            {BUILD.map((b) => (
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
                Lo que pasa cuando tu sistema trabaja <em className="grad">solo</em>
              </h3>
              <p className="mut">Elegí qué pasa en tu empresa y mirá todo lo que el sistema resuelve, sin que nadie toque nada.</p>
            </div>
            <div className="seg glass" data-seg="flow" role="tablist" aria-label="Qué pasa en tu empresa">
              <span className="seg-drop" aria-hidden="true"></span>
              {FLOWS.map((f, i) => (
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
                  5 tareas · 3,2 s · 0 personas
                </div>
              </div>
              <div className="flow-ph">
                <div className="iph" aria-label="Notificaciones del celular" role="img">
                  <i className="iph-isl"></i>
                  <div className="iph-scr">
                    <div className="iph-wall"></div>
                    <div className="iph-time">
                      <small>jueves 23 de octubre</small>
                      <b>9:41</b>
                    </div>
                    <div className="iph-stack" id="iphStack"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flow-foot">
              <a className="ul" href="#contacto">
                Contanos qué tarea querés automatizar →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="rubros" aria-labelledby="sis-rubros">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-rubros" data-lines>
                Sistemas para <em className="grad">tu rubro</em>
              </h2>
            </div>
          </div>
          <div className="grid rub-grid">
            <ul className="rub-list" id="rubList">
              {RUBROS.map((r, i) => (
                <li className={i === 0 ? "rub on" : "rub"} key={r.name}>
                  <a href="#contacto">
                    <span className="w">{r.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="rub-img glass" aria-hidden="true">
              {RUBROS.map((r, i) => (
                <div className={i === 0 ? "rimg on" : "rimg"} key={r.name}>
                  <Image src={r.img} alt="" sizes={STAGE_SIZES} />
                  <ul className="rex glass">
                    {r.items.map((x) => (
                      <li key={x}>{x}</li>
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
                Nuestros <em className="grad">sistemas</em>
              </h2>
            </div>
          </div>
          <div className="sys-grid">
            {SYSTEMS.map((s) => (
              <Link className="sys glass rv" href={s.href} key={s.name}>
                <div className="appwin">
                  <Image src={s.img} alt={`Pantalla de Aspa ${s.name}`} sizes="(max-width: 980px) calc(100vw - 48px), 580px" />
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
                  <span className="hc-pill glass">Ver caso →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story" id="story" aria-labelledby="sis-story">
        <div className="story-stage">
          <div className="wrap story-head">
            <h2 className="h2" id="sis-story">
              De la primera charla a la <em className="grad">versión 1.0</em>
            </h2>
          </div>
          <div className="story-draw" id="storyDraw"></div>
          <div className="wrap">
            <div className="story-bar">
              <div className="sb-line">
                <i></i>
              </div>
              <ol className="sb-steps">
                {STEPS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <p className="story-cap mut" id="storyCap">
              Entendemos el negocio, los objetivos y a quienes lo van a usar.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sis-tools">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="sis-tools" data-lines>
                Herramientas <em className="grad">probadas</em>
              </h2>
            </div>
          </div>
          <ul className="techs">
            {TECHS.map(([t, tip], i) => (
              <li className="tech glass" tabIndex={0} key={t} aria-describedby={`tip-${i}`}>
                <svg className="tech-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={TECH_ICONS[t].color}>
                  <path d={TECH_ICONS[t].path} />
                </svg>
                <span>{t}</span>
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
                Un sistema que es <em className="grad">tuyo</em>
              </h2>
            </div>
          </div>
          <div className="llgrid">
            {OWN.map(([t, d], i) => (
              <article className="ll glass rv" key={t}>
                <span className="ll-n">0{i + 1}</span>
                <h3>{t}</h3>
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
            Lo que todos <em className="grad">preguntan</em>
          </>
        }
        items={FAQ}
      />

      <Cta question="¿Qué proceso de tu empresa te gustaría que se haga solo?" message="Hola Aspa, quiero automatizar un proceso" />

      <JsonLd
        data={serviceSchema({
          name: "Sistemas de gestión a medida",
          description: DESCRIPTION,
          path: PATH,
          offers: BUILD.map((b) => b.title),
        })}
      />
      <JsonLd data={breadcrumbs([{ name: "Sistemas a medida", path: PATH }])} />
      <PageFx page="sistemas" />
    </main>
  );
}
