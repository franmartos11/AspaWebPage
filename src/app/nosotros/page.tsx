import type { Metadata } from "next";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { LOGO_ISO_T } from "@/components/Logo";
import { Clients, Nums } from "@/components/Proof";
import { aboutSchema, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES, SITE } from "@/lib/site";
import "@/styles/proof.css";
import "./nosotros.css";

const PATH = ROUTES.nosotros;
const DESCRIPTION =
  "Aspa Software es un equipo de Córdoba que combina programación, diseño y negocio para hacer sistemas de gestión, apps y webs a medida. Conocé quiénes somos y cómo trabajamos.";

export const metadata: Metadata = pageMeta({ path: PATH, title: "Nosotros: el equipo detrás de Aspa", description: DESCRIPTION });

// TODO(equipo): reemplazar las iniciales por fotos reales cuando las haya (como en el diseño).
// `in`: LinkedIn personal (del sitio anterior); sin él, el link va a la página de la empresa.
const TEAM: { name: string; role: string; ini: string; line: string; in?: string }[] = [
  { name: "Haik Kilic", role: "CEO", ini: "HK", line: "Visión estratégica, análisis de negocio y crecimiento.", in: "https://www.linkedin.com/in/haik-kilic/" },
  { name: "Francisco Martos", role: "CTO", ini: "FM", line: "Arquitectura de software, full-stack e infraestructura escalable.", in: "https://www.linkedin.com/in/francisco-martos-7a8850226/" },
  { name: "Agustín Gil", role: "Product Owner", ini: "AG", line: "Que lo que construimos resuelva lo que la empresa necesita." },
  { name: "Joaquín Otaño", role: "Comercial", ini: "JO", line: "El primer contacto con cada empresa y el seguimiento de cada propuesta." },
];

const IDEAS = [
  {
    t: "Resolver problemas reales",
    d: "Arrancamos por lo que hoy le cuesta tiempo o plata a tu empresa.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
  },
  { t: "Agilizar procesos", d: "Menos tareas a mano, menos errores y la información en un solo lugar.", icon: <path d="M13 2 4 14h7l-1 8 9-12h-7z" /> },
  {
    t: "Crecer a largo plazo",
    d: "Software que acompaña a la empresa y se amplía por etapas.",
    icon: (
      <>
        <path d="M3 20h18" />
        <path d="M6 16v-4M11 16V9M16 16V5" />
        <path d="m14 5 2-2 2 2" />
      </>
    ),
  },
];

const WAY = [
  { t: "Hablás con quien lo construye", d: "Sin intermediarios: el equipo que programa es el que te escucha.", icon: <path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.2-4.4A8 8 0 1 1 21 12z" /> },
  {
    t: "Ves avances seguido",
    d: "Trabajamos por etapas cortas y te mostramos cada parte funcionando.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M7 9h6M7 13h10" />
      </>
    ),
  },
  {
    t: "El código y los datos son tuyos",
    d: "Con documentación, para que nunca dependas de una caja negra.",
    icon: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  { t: "Seguimos después del lanzamiento", d: "Capacitación, soporte y mejoras cuando el negocio lo pide.", icon: <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" /> },
];

const Ic = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/** Programación, diseño y negocio: tres círculos que se juntan y el fénix de Aspa en el cruce. */
function Venn() {
  return (
    <div className="venn rv">
      <svg viewBox="0 0 400 380" role="img" aria-label="Programación, diseño y negocio se cruzan en Aspa">
        <defs>
          <radialGradient id="vg1" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#6E6CFF" stopOpacity=".55" />
            <stop offset="1" stopColor="#6E6CFF" stopOpacity=".08" />
          </radialGradient>
          <radialGradient id="vg2" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#35ADF2" stopOpacity=".5" />
            <stop offset="1" stopColor="#35ADF2" stopOpacity=".06" />
          </radialGradient>
          <radialGradient id="vg3" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#B07CFF" stopOpacity=".5" />
            <stop offset="1" stopColor="#B07CFF" stopOpacity=".06" />
          </radialGradient>
        </defs>
        <g className="vc vc1">
          <circle cx="150" cy="140" r="105" fill="url(#vg1)" />
          <circle className="vr" cx="150" cy="140" r="105" pathLength={1} />
          <text x="104" y="104">
            Programación
          </text>
        </g>
        <g className="vc vc2">
          <circle cx="250" cy="140" r="105" fill="url(#vg2)" />
          <circle className="vr" cx="250" cy="140" r="105" pathLength={1} />
          <text x="296" y="104" textAnchor="end">
            Diseño
          </text>
        </g>
        <g className="vc vc3">
          <circle cx="200" cy="228" r="105" fill="url(#vg3)" />
          <circle className="vr" cx="200" cy="228" r="105" pathLength={1} />
          <text x="200" y="300" textAnchor="middle">
            Negocio
          </text>
        </g>
        <g className="vcore">
          <circle cx="200" cy="172" r="34" />
          <g className="vlogo" transform="translate(184 160) scale(0.02980) translate(26 74)">
            <use href="#lgd-iso" fill="#fff" transform={LOGO_ISO_T} />
            <use href="#lgd-phx" fill="#35ADF2" transform={LOGO_ISO_T} />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function NosotrosPage() {
  return (
    <main id="main" className="view">
      <section className="nhero" aria-labelledby="nos-title">
        <div className="wrap nh-in">
          <CharTitle id="nos-title" parts={["No somos solo una empresa: somos un equipo que respira código y ", { em: "estrategia." }]} />
          <div className="nh-bot r-late">
            <p className="lead">Programación, diseño y negocio en la misma mesa, para hacer software que se usa todos los días.</p>
            <a className="nos-scroll" href="#historia" aria-label="Seguir bajando">
              <span></span>
            </a>
          </div>
        </div>
      </section>

      <section className="section nos-story" id="historia" aria-labelledby="nos-historia">
        <div className="wrap grid nsplit">
          <div>
            <h2 className="lbl" id="nos-historia">
              Nuestra historia
            </h2>
            <p className="read read-sm">
              Aspa nació en Córdoba, fundada por dos programadores y un especialista en marketing, diseño y ventas. Combinamos programación, diseño y negocio para hacer
              software que mejora los resultados de las empresas.
            </p>
          </div>
          <Venn />
        </div>
      </section>

      <section className="section" aria-labelledby="nos-ideas">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nos-ideas" data-lines>
                Tres ideas que guían <em className="grad">cada proyecto</em>
              </h2>
            </div>
          </div>
          <div className="think nos-think">
            {IDEAS.map((x, i) => (
              <article className="glass rv" key={x.t}>
                <span className="nt-n" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="nt-ic">
                  <Ic>{x.icon}</Ic>
                </span>
                <h3>{x.t}</h3>
                <p className="mut">{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="nos-equipo">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nos-equipo" data-lines>
                Quiénes lo <em className="grad">construyen</em>
              </h2>
            </div>
          </div>
          <ul className="team nos-team">
            {TEAM.map((p) => (
              <li className="person glass rv" key={p.name}>
                <div className="pic" aria-hidden="true">
                  <b>{p.ini}</b>
                </div>
                <h3>{p.name}</h3>
                <p className="role">{p.role}</p>
                <p className="mut">{p.line}</p>
                <a className="ul" href={p.in ?? SITE.social.linkedin} target="_blank" rel="noopener" aria-label={p.in ? `LinkedIn de ${p.name}` : "LinkedIn de Aspa Software"}>
                  LinkedIn →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section nos-way" aria-labelledby="nos-forma">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nos-forma" data-lines>
                Cómo es trabajar <em className="grad">con nosotros</em>
              </h2>
            </div>
          </div>
          <ol className="nw-list">
            {WAY.map((x) => (
              <li className="rv" key={x.t}>
                <span className="nw-ic">
                  <Ic>{x.icon}</Ic>
                </span>
                <div>
                  <h3>{x.t}</h3>
                  <p className="mut">{x.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Aspa en números">
        <div className="wrap">
          <Nums className="nums nos-nums" bar />
        </div>
      </section>

      <Clients id="nos-clientes" title="Empresas que confían en nosotros" dur="42s" className="clients nos-clients" />

      <section className="section nos-place" aria-labelledby="nos-lugar">
        <div className="wrap">
          <div className="np-card glass glass-big rv">
            <div className="np-map" aria-hidden="true">
              <i className="np-grid"></i>
              <span className="np-pin">
                <b></b>
              </span>
            </div>
            <div className="np-tx">
              <p className="lbl">Dónde estamos</p>
              <h2 className="h2" id="nos-lugar">
                Base en <em className="grad">Córdoba.</em>
              </h2>
              <p className="mut">
                {SITE.address.street}, {SITE.address.city}, Argentina.
              </p>
              <a className="btn btn-glass" href={SITE.address.maps} target="_blank" rel="noopener">
                <span>Ver en el mapa</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Cta question="¿Tenés un proceso que se hace a mano, una planilla que ya no da más o una web que no te representa?" message="Hola Aspa, quiero contarles un proyecto" />

      <JsonLd data={aboutSchema({ description: DESCRIPTION, path: PATH, team: TEAM })} />
      <JsonLd data={breadcrumbs([{ name: "Nosotros", path: PATH }])} />
      <PageFx page="nosotros" />
    </main>
  );
}
