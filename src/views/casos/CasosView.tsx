import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { routes, type Lang } from "@/i18n";
import { FILTERS, works } from "@/lib/casos";
import { breadcrumbs, collectionSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import "@/styles/seg.css";
import "./casos.css";

const T = {
  es: {
    title: "Casos: sistemas y webs que construimos",
    description:
      "Trabajos de Aspa Software: los sistemas Aspa Rodeo (gestión de hacienda) y Aspa Scout (gestión comercial), webs reales y diseños de ejemplo por rubro.",
    h1: ["Lo que ya ", { em: "construimos." }],
    lead: "Primero, los proyectos reales. Después, diseños de ejemplo que muestran cómo puede quedar una web de tu rubro.",
    works: "Trabajos",
    filter: "Filtrar trabajos",
    real: "Caso real",
    sample: "Diseño de ejemplo",
    question: "¿Tenés un proceso que se hace a mano, una planilla que ya no da más o una web que no te representa?",
    message: "Hola Aspa, quiero contarles un proyecto",
    crumb: "Casos",
  },
  en: {
    title: "Work: systems and websites we've built",
    description:
      "Aspa Software's work: the Aspa Rodeo (livestock management) and Aspa Scout (sales management) systems, live websites and sample designs by industry.",
    h1: ["What we've ", { em: "built." }],
    lead: "Real projects come first. Then, sample designs that show what a website for your industry could look like.",
    works: "Projects",
    filter: "Filter projects",
    real: "Case study",
    sample: "Sample design",
    question: "Got a process still done by hand, a spreadsheet that can't keep up, or a website that doesn't represent you?",
    message: "Hi Aspa, I'd like to tell you about a project",
    crumb: "Work",
  },
} as const;

export function casosMeta(lang: Lang): Metadata {
  return pageMeta({ path: routes(lang).casos, title: T[lang].title, description: T[lang].description });
}

export function CasosView({ lang }: { lang: Lang }) {
  const t = T[lang],
    path = routes(lang).casos,
    list = works(lang);
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="casos-title">
        <div className="wrap">
          <CharTitle id="casos-title" parts={[...t.h1]} />
          <p className="lead r-late">{t.lead}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="casos-trabajos">
        <div className="wrap">
          <h2 className="sr-only" id="casos-trabajos">
            {t.works}
          </h2>
          <div className="seg glass" data-seg="casos" role="tablist" aria-label={t.filter}>
            <span className="seg-drop" aria-hidden="true"></span>
            {FILTERS.map((x, i) => (
              <button
                key={x.f}
                type="button"
                className={i === 0 ? "on" : undefined}
                role="tab"
                aria-selected={i === 0}
                aria-controls="casesGrid"
                data-f={x.f}
              >
                {x.label[lang]}
              </button>
            ))}
          </div>
          <div id="casesGrid" role="tabpanel" aria-label={t.works}>
            <ul className="cgrid">
              {list.map((w) => (
                <li key={w.t} data-f={w.f}>
                  <Link className="ccard glass rv" href={w.href}>
                    <div className="cc-img">
                      <Image src={w.img} alt={w.t} sizes="(max-width: 980px) calc(100vw - 48px), 416px" />
                    </div>
                    <div className="cc-meta">
                      <h3>{w.t}</h3>
                      {w.real ? <span className="ej-tag real">{t.real}</span> : <span className="ej-tag">{t.sample}</span>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Cta lang={lang} question={t.question} message={t.message} />

      <JsonLd
        data={collectionSchema({
          name: t.crumb,
          description: t.description,
          path,
          items: list.map((w) => ({ name: w.t, path: w.href })),
        })}
      />
      <JsonLd data={breadcrumbs([{ name: t.crumb, path }])} />
      <PageFx page="casos" />
    </main>
  );
}
