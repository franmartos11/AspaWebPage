import type { Metadata } from "next";
import Image from "next/image";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { LOGO_ISO_T } from "@/components/Logo";
import { Clients, Nums } from "@/components/Proof";
import { routes, type Lang } from "@/i18n";
import { aboutSchema, breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import mapa from "@/assets/nosotros/mapa-cordoba.jpg";
import "@/styles/proof.css";
import "./nosotros.css";

// TODO(equipo): reemplazar las iniciales por fotos reales cuando las haya (como en el diseño).
// `in`: LinkedIn personal (del sitio anterior); sin él, el link va a la página de la empresa.
const TEAM: { name: string; ini: string; in?: string }[] = [
  { name: "Haik Kilic", ini: "HK", in: "https://www.linkedin.com/in/haik-kilic/" },
  { name: "Francisco Martos", ini: "FM", in: "https://www.linkedin.com/in/francisco-martos-7a8850226/" },
  { name: "Agustín Gil", ini: "AG" },
  { name: "Joaquín Otaño", ini: "JO" },
];

/* eslint-disable react/jsx-key -- cada ícono va solo dentro de <Ic>, no como lista */
const IDEA_ICONS = [
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </>,
  <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  <>
    <path d="M3 20h18" />
    <path d="M6 16v-4M11 16V9M16 16V5" />
    <path d="m14 5 2-2 2 2" />
  </>,
];

const WAY_ICONS = [
  <path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.2-4.4A8 8 0 1 1 21 12z" />,
  <>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M8 21h8M7 9h6M7 13h10" />
  </>,
  <>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </>,
  <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />,
];
/* eslint-enable react/jsx-key */

const T = {
  es: {
    title: "Nosotros: el equipo detrás de Aspa",
    description:
      "Aspa Software es un equipo de Córdoba que combina programación, diseño y negocio para hacer sistemas de gestión, apps y webs a medida. Conocé quiénes somos y cómo trabajamos.",
    h1: ["No somos solo una empresa: somos un equipo que respira código y ", { em: "estrategia." }],
    lead: "Programación, diseño y negocio en la misma mesa, para hacer software que se usa todos los días.",
    meet: "Conocé al equipo",
    story: "Nuestra historia",
    storyText:
      "Aspa nació en Córdoba, fundada por dos programadores y un especialista en marketing, diseño y ventas. Combinamos programación, diseño y negocio para hacer software que mejora los resultados de las empresas.",
    venn: { aria: "Programación, diseño y negocio se cruzan en Aspa", a: "Programación", b: "Diseño", c: "Negocio" },
    ideasH: ["Tres ideas que guían ", "cada proyecto"],
    ideas: [
      { t: "Resolver problemas reales", d: "Arrancamos por lo que hoy le cuesta tiempo o plata a tu empresa." },
      { t: "Agilizar procesos", d: "Menos tareas a mano, menos errores y la información en un solo lugar." },
      { t: "Crecer a largo plazo", d: "Software que acompaña a la empresa y se amplía por etapas." },
    ],
    teamH: ["Quiénes lo ", "construyen"],
    team: [
      { role: "CEO", line: "Visión estratégica, análisis de negocio y crecimiento." },
      { role: "CTO", line: "Arquitectura de software, full-stack e infraestructura escalable." },
      { role: "Product Owner", line: "Que lo que construimos resuelva lo que la empresa necesita." },
      { role: "Comercial", line: "El primer contacto con cada empresa y el seguimiento de cada propuesta." },
    ],
    linkedin: (name: string) => `LinkedIn de ${name}`,
    wayH: ["Cómo es trabajar ", "con nosotros"],
    way: [
      { t: "Hablás con quien lo construye", d: "Sin intermediarios: el equipo que programa es el que te escucha." },
      { t: "Ves avances seguido", d: "Trabajamos por etapas cortas y te mostramos cada parte funcionando." },
      { t: "El código y los datos son tuyos", d: "Con documentación, para que nunca dependas de una caja negra." },
      { t: "Seguimos después del lanzamiento", d: "Capacitación, soporte y mejoras cuando el negocio lo pide." },
    ],
    nums: "Aspa en números",
    clients: "Empresas que confían en nosotros",
    where: "Dónde estamos",
    placeH: ["Base en ", "Córdoba."],
    map: "Ver en el mapa",
    question: "¿Tenés un proceso que se hace a mano, una planilla que ya no da más o una web que no te representa?",
    message: "Hola Aspa, quiero contarles un proyecto",
    crumb: "Nosotros",
  },
  en: {
    title: "About: the team behind Aspa",
    description:
      "Aspa Software is a Córdoba-based team that brings engineering, design and business together to build custom management systems, apps and websites. Meet who we are and how we work.",
    h1: ["We're not just a company: we're a team that lives and breathes code and ", { em: "strategy." }],
    lead: "Engineering, design and business at the same table, building software people rely on every day.",
    meet: "Meet the team",
    story: "Our story",
    storyText:
      "Aspa was born in Córdoba, founded by two developers and a marketing, design and sales specialist. We bring engineering, design and business together to build software that improves companies' results.",
    venn: { aria: "Engineering, design and business come together at Aspa", a: "Engineering", b: "Design", c: "Business" },
    ideasH: ["Three ideas behind ", "every project"],
    ideas: [
      { t: "Solve real problems", d: "We start with whatever is costing your company time or money today." },
      { t: "Streamline processes", d: "Fewer manual tasks, fewer errors and all your information in one place." },
      { t: "Grow for the long run", d: "Software that grows alongside your company and expands in stages." },
    ],
    teamH: ["The people who ", "build it"],
    team: [
      { role: "CEO", line: "Strategic vision, business analysis and growth." },
      { role: "CTO", line: "Software architecture, full-stack development and scalable infrastructure." },
      { role: "Product Owner", line: "Making sure what we build solves what the company actually needs." },
      { role: "Sales", line: "The first point of contact with every company and the follow-up on every proposal." },
    ],
    linkedin: (name: string) => `${name} on LinkedIn`,
    wayH: ["What it's like to work ", "with us"],
    way: [
      { t: "You talk to the people who build it", d: "No middlemen: the team writing the code is the team listening to you." },
      { t: "You see progress often", d: "We work in short stages and show you every part up and running." },
      { t: "The code and data are yours", d: "Fully documented, so you never depend on a black box." },
      { t: "We stick around after launch", d: "Training, support and improvements whenever your business calls for them." },
    ],
    nums: "Aspa by the numbers",
    clients: "Companies that trust us",
    where: "Where to find us",
    placeH: ["Based in ", "Córdoba."],
    map: "View on map",
    question: "Got a process still done by hand, a spreadsheet that can't keep up, or a website that doesn't represent you?",
    message: "Hi Aspa, I'd like to tell you about a project",
    crumb: "About",
  },
} as const;

export function nosotrosMeta(lang: Lang): Metadata {
  return pageMeta({ path: routes(lang).nosotros, title: T[lang].title, description: T[lang].description });
}

const Ic = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

/** Programación, diseño y negocio: tres círculos que se juntan y el fénix de Aspa en el cruce. */
function Venn({ v }: { v: (typeof T)[Lang]["venn"] }) {
  return (
    <div className="venn rv">
      <svg viewBox="0 0 400 380" role="img" aria-label={v.aria}>
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
            {v.a}
          </text>
        </g>
        <g className="vc vc2">
          <circle cx="250" cy="140" r="105" fill="url(#vg2)" />
          <circle className="vr" cx="250" cy="140" r="105" pathLength={1} />
          <text x="296" y="104" textAnchor="end">
            {v.b}
          </text>
        </g>
        <g className="vc vc3">
          <circle cx="200" cy="228" r="105" fill="url(#vg3)" />
          <circle className="vr" cx="200" cy="228" r="105" pathLength={1} />
          <text x="200" y="300" textAnchor="middle">
            {v.c}
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

export function NosotrosView({ lang }: { lang: Lang }) {
  const t = T[lang],
    path = routes(lang).nosotros,
    team = TEAM.map((p, i) => ({ ...p, ...t.team[i] }));
  return (
    <main id="main" className="view">
      <section className="nhero" aria-labelledby="nos-title">
        <div className="wrap nh-in">
          <CharTitle id="nos-title" parts={[...t.h1]} />
          <div className="nh-bot r-late">
            <p className="lead">{t.lead}</p>
          </div>
          {/* celular: en vez de media pantalla vacía, el equipo (con link a su sección) */}
          <a className="nh-team r-late" href="#equipo">
            <span className="nh-avs" aria-hidden="true">
              {TEAM.map((p) => (
                <b key={p.ini}>{p.ini}</b>
              ))}
            </span>
            {t.meet} →
          </a>
        </div>
      </section>

      <section className="section nos-story" id="historia" aria-labelledby="nos-historia">
        <div className="wrap grid nsplit">
          <div>
            <h2 className="lbl" id="nos-historia">
              {t.story}
            </h2>
            <p className="read read-sm">{t.storyText}</p>
          </div>
          <Venn v={t.venn} />
        </div>
      </section>

      <section className="section" aria-labelledby="nos-ideas">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nos-ideas" data-lines>
                {t.ideasH[0]}
                <em className="grad">{t.ideasH[1]}</em>
              </h2>
            </div>
          </div>
          <div className="think nos-think">
            {t.ideas.map((x, i) => (
              <article className="glass rv" key={x.t}>
                <span className="nt-n" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="nt-ic">
                  <Ic>{IDEA_ICONS[i]}</Ic>
                </span>
                <h3>{x.t}</h3>
                <p className="mut">{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="equipo" aria-labelledby="nos-equipo">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nos-equipo" data-lines>
                {t.teamH[0]}
                <em className="grad">{t.teamH[1]}</em>
              </h2>
            </div>
          </div>
          <ul className="team nos-team">
            {team.map((p) => (
              <li className="person glass rv" key={p.name}>
                <div className="pic" aria-hidden="true">
                  <b>{p.ini}</b>
                </div>
                <h3>{p.name}</h3>
                <p className="role">{p.role}</p>
                <p className="mut">{p.line}</p>
                <a
                  className="ul"
                  href={p.in ?? SITE.social.linkedin}
                  target="_blank"
                  rel="noopener"
                  aria-label={t.linkedin(p.in ? p.name : SITE.name)}
                >
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
                {t.wayH[0]}
                <em className="grad">{t.wayH[1]}</em>
              </h2>
            </div>
          </div>
          <ol className="nw-list">
            {t.way.map((x, i) => (
              <li className="rv" key={x.t}>
                <span className="nw-ic">
                  <Ic>{WAY_ICONS[i]}</Ic>
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

      <section className="section" aria-label={t.nums}>
        <div className="wrap">
          <Nums lang={lang} className="nums nos-nums" bar />
        </div>
      </section>

      <Clients id="nos-clientes" title={t.clients} dur="42s" className="clients nos-clients" />

      <section className="section nos-place" aria-labelledby="nos-lugar">
        <div className="wrap">
          <div className="np-card glass glass-big rv">
            {/* mapa real (OpenStreetMap, con los colores del sitio) centrado en la oficina: el pin cae en
                la coordenada de SITE.address.geo; se genera una vez y se sirve desde el sitio */}
            <div className="np-map" aria-hidden="true">
              <Image src={mapa} alt="" sizes="(max-width: 980px) calc(100vw - 48px), 640px" />
              <span className="np-pin">
                <b></b>
              </span>
              <small className="np-attr">© OpenStreetMap</small>
            </div>
            <div className="np-tx">
              <p className="lbl">{t.where}</p>
              <h2 className="h2" id="nos-lugar">
                {t.placeH[0]}
                <em className="grad">{t.placeH[1]}</em>
              </h2>
              <p className="mut">
                {SITE.address.street}, {SITE.address.city}, Argentina.
              </p>
              <a className="btn btn-glass" href={SITE.address.maps} target="_blank" rel="noopener">
                <span>{t.map}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Cta lang={lang} question={t.question} message={t.message} />

      <JsonLd data={aboutSchema({ description: t.description, path, team })} />
      <JsonLd data={breadcrumbs([{ name: t.crumb, path }])} />
      <PageFx page="nosotros" />
    </main>
  );
}
