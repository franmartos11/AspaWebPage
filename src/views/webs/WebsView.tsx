import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { PainCard } from "@/components/PainArt";
import { Plans } from "@/components/Plans";
import { routes, type Lang } from "@/i18n";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { FAMS, GALLERY, RUBROS } from "@/lib/webs";
import hero from "@/assets/webs/casa-moderna-atardecer.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import "@/styles/pains.css";
import "@/styles/hgal.css";
import "@/styles/plans.css";
import "./webs.css";

const T = {
  es: {
    title: "Páginas web para empresas y profesionales en Córdoba",
    description:
      "Diseño de páginas web para arquitectos, estudios, constructoras, desarrollistas e interiorismo: tu trabajo bien mostrado, rápido y listo para Google. Landing en 10 días, sitio completo en 21. Córdoba, Argentina.",
    h1: ["Webs que muestran tu ", { em: "trabajo." }],
    lead: "Para empresas y profesionales que venden por lo que ya hicieron.",
    heroBtn: "¿Cuál es tu rubro?",
    why: ["Por qué tu web ", "importa"],
    pains: [
      "Antes de llamarte, el cliente te busca en internet.",
      "Instagram muestra fotos sueltas, no cómo trabajás.",
      "Una web descuidada hace dudar de tu trabajo.",
    ],
    rubro: ["¿Cuál es tu ", "rubro?"],
    navLabel: "Webs por rubro",
    other: "¿Otro rubro? Hablemos",
    shots: ["Capturas ", "reales"],
    shotAlt: (name: string) => `Web de ${name}`,
    live: "Ver en vivo ↗",
    newTab: "(se abre en otra pestaña)",
    prices: ["Precios ", "claros"],
    compare: "Ver comparación completa →",
    steps: ["De tus fotos a tu web ", "online"],
    stepsLead: "Cuatro pasos. La Landing en 10 días, el Sitio completo en 21.",
    stepList: [
      ["Material", "Nos pasás fotos y textos de tus trabajos."],
      ["Propuesta", "Diseñamos y te mostramos cómo quedaría."],
      ["Ajustes", "Ajustamos con tus comentarios."],
      ["Publicación", "Publicamos en tu dominio y queda online."],
    ],
    question: "¿Querés ver cómo quedaría tu web? Pasanos 3 trabajos y te mandamos una portada de ejemplo.",
    message: "Hola Aspa, quiero mi web",
    service: "Diseño de páginas web para empresas y profesionales",
    offer: (rubro: string) => `Web para ${rubro.toLowerCase()}`,
    crumb: "Webs",
  },
  en: {
    title: "Websites for companies and professionals in Córdoba",
    description:
      "Website design for architects, studios, builders, developers and interior designers: your work shown at its best, fast and ready for Google. Landing page in 10 days, full website in 21. Córdoba, Argentina.",
    h1: ["Websites that show your ", { em: "work." }],
    lead: "For companies and professionals who win clients with the work they've already done.",
    heroBtn: "What's your industry?",
    why: ["Why your website ", "matters"],
    pains: [
      "Before calling you, clients look you up online.",
      "Instagram shows scattered photos, not how you work.",
      "A sloppy website makes people doubt your work.",
    ],
    rubro: ["What's your ", "industry?"],
    navLabel: "Websites by industry",
    other: "Another industry? Let's talk",
    shots: ["Real ", "screenshots"],
    shotAlt: (name: string) => `${name} website`,
    live: "View live ↗",
    newTab: "(opens in a new tab)",
    prices: ["Clear ", "pricing"],
    compare: "See the full comparison →",
    steps: ["From your photos to a ", "live website"],
    stepsLead: "Four steps. The Landing page in 10 days, the Full website in 21.",
    stepList: [
      ["Content", "You send us photos and text about your projects."],
      ["Proposal", "We design it and show you how it would look."],
      ["Revisions", "We fine-tune it with your feedback."],
      ["Launch", "We publish it on your domain and it goes live."],
    ],
    question: "Want to see how your website could look? Send us 3 projects and we'll send you a sample homepage.",
    message: "Hi Aspa, I want my website",
    service: "Website design for companies and professionals",
    offer: (rubro: string) => `Website for ${rubro.toLowerCase()}`,
    crumb: "Websites",
  },
} as const;

export function websMeta(lang: Lang): Metadata {
  return pageMeta({ path: routes(lang).webs, title: T[lang].title, description: T[lang].description });
}

export function WebsView({ lang }: { lang: Lang }) {
  const t = T[lang],
    r$ = routes(lang),
    path = r$.webs;
  return (
    <main id="main" className="view">
      <section className="whero" id="whero" aria-labelledby="webs-title">
        <div className="whero-img" aria-hidden="true">
          <Image src={hero} alt="" sizes="100vw" priority />
        </div>
        <div className="wrap whero-txt">
          <CharTitle id="webs-title" parts={[...t.h1]} />
          <div className="whero-bot r-late">
            <p className="lead">{t.lead}</p>
            <a className="btn btn-glass btn-blue" href="#rubros">
              <span>{t.heroBtn}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="webs-por-que">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="webs-por-que" data-lines>
                {t.why[0]}
                <em className="grad">{t.why[1]}</em>
              </h2>
            </div>
          </div>
          <div className="cards3 pains-sw">
            {t.pains.map((p, i) => (
              <PainCard key={p} text={p} n={i + 1} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="rubros" aria-labelledby="webs-rubro">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="webs-rubro" data-lines>
                {t.rubro[0]}
                <em className="grad">{t.rubro[1]}</em>
              </h2>
            </div>
          </div>
          <div className="rb-sel">
            <nav className="rb-list" aria-label={t.navLabel}>
              {FAMS[lang].map((f, i) => (
                <div className="fam2" key={f}>
                  <p className="fam-t">{f}</p>
                  {RUBROS.filter((r) => r.fam === i).map((r) => (
                    <Link className={r.slug === "arquitectos" ? "rb-row on" : "rb-row"} data-rubro={r.slug} href={r$.rubro(r.slug)} key={r.slug}>
                      <b>{lang === "es" ? r.menu : r.menuEn}</b>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
              <a className="rb-row other2" href="#contacto">
                <b>{t.other}</b>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </nav>
            <div className="rb-viewer">
              <div className="m3d dev-3d" aria-hidden="true">
                <div className="dev-2d m3d-fb">
                  <Image src={paulaGil} alt="" sizes="(max-width: 980px) calc(100vw - 48px), 760px" />
                </div>
              </div>
              <p className="cap dev-cap" id="devCap" aria-live="polite">
                <b>Paula Gil</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hgal native" data-hgal aria-labelledby="webs-capturas">
        <div className="hgal-stage">
          <div className="wrap hgal-head">
            <div>
              <h2 className="h2" id="webs-capturas" data-lines>
                {t.shots[0]}
                <em className="grad">{t.shots[1]}</em>
              </h2>
            </div>
          </div>
          <ul className="hgal-track" id="gallery">
            {GALLERY.map((w) => {
              const body = (
                <>
                  <div className="hc-img">
                    <Image src={w.img} alt={t.shotAlt(w.name[lang])} sizes="(max-width: 980px) 84vw, (max-width: 1530px) 34vw, 520px" />
                  </div>
                  <div className="hc-meta">
                    <h3>{w.name[lang]}</h3>
                    <span className="sr-only">{w.tipo[lang]}</span>
                  </div>
                </>
              );
              return (
                <li key={w.name.es}>
                  {w.url ? (
                    <a className="hcard glass" href={`https://${w.url}`} target="_blank" rel="noopener">
                      {body}
                      <span className="hc-pill glass" aria-hidden="true">
                        {t.live}
                      </span>
                      <span className="sr-only">{t.newTab}</span>
                    </a>
                  ) : (
                    <div className="hcard glass">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="wrap">
            <div className="hgal-bar" aria-hidden="true">
              <i></i>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="webs-precios">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="webs-precios" data-lines>
                {t.prices[0]}
                <em className="grad">{t.prices[1]}</em>
              </h2>
            </div>
            <Link className="ul" href={r$.planes}>
              {t.compare}
            </Link>
          </div>
          <Plans lang={lang} />
        </div>
      </section>

      <section className="section" aria-labelledby="webs-pasos">
        <div className="wrap grid tl-grid">
          <div className="tl-head">
            <h2 className="h2" id="webs-pasos" data-lines>
              {t.steps[0]}
              <em className="grad">{t.steps[1]}</em>
            </h2>
            <p className="mut">{t.stepsLead}</p>
          </div>
          <div className="tl" data-tl>
            <i className="tl-line" aria-hidden="true">
              <b></b>
            </i>
            <ol>
              {t.stepList.map(([s, d]) => (
                <li className="glass" key={s}>
                  <span className="tl-dot" aria-hidden="true"></span>
                  <h3>{s}</h3>
                  <p className="mut">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Cta lang={lang} question={t.question} message={t.message} />

      <JsonLd
        data={serviceSchema({
          name: t.service,
          description: t.description,
          path,
          offers: RUBROS.map((r) => t.offer(lang === "es" ? r.menu : r.menuEn)),
        })}
      />
      <JsonLd data={breadcrumbs([{ name: t.crumb, path }])} />
      <PageFx page="webs" />
    </main>
  );
}
