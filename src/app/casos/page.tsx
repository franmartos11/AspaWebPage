import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { FILTERS, WORKS } from "@/lib/casos";
import { breadcrumbs, collectionSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";
import "@/styles/seg.css";
import "./casos.css";

const PATH = ROUTES.casos;
const DESCRIPTION =
  "Trabajos de Aspa Software: los sistemas Aspa Rodeo (gestión de hacienda) y Aspa Scout (gestión comercial), webs reales y diseños de ejemplo por rubro.";

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: "Casos: sistemas y webs que construimos",
  description: DESCRIPTION,
});

export default function CasosPage() {
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="casos-title">
        <div className="wrap">
          <CharTitle
            id="casos-title"
            parts={["Lo que ya ", { em: "construimos." }]}
          />
          <p className="lead r-late">
            Primero, los proyectos reales. Después, diseños de ejemplo que
            muestran cómo puede quedar una web de tu rubro.
          </p>
        </div>
      </section>

      <section
        className="section"
        style={{ paddingTop: 0 }}
        aria-labelledby="casos-trabajos"
      >
        <div className="wrap">
          <h2 className="sr-only" id="casos-trabajos">
            Trabajos
          </h2>
          <div
            className="seg glass"
            data-seg="casos"
            role="tablist"
            aria-label="Filtrar trabajos"
          >
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
                {x.label}
              </button>
            ))}
          </div>
          <div id="casesGrid" role="tabpanel" aria-label="Trabajos">
            <ul className="cgrid">
              {WORKS.map((w) => (
                <li key={w.t} data-f={w.f}>
                  <Link className="ccard glass rv" href={w.href}>
                    <div className="cc-img">
                      <Image
                        src={w.img}
                        alt={w.t}
                        sizes="(max-width: 980px) calc(100vw - 48px), 416px"
                      />
                    </div>
                    <div className="cc-meta">
                      <h3>{w.t}</h3>
                      {w.real ? (
                        <span className="ej-tag real">Caso real</span>
                      ) : (
                        <span className="ej-tag">Diseño de ejemplo</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Cta
        question="¿Tenés un proceso que se hace a mano, una planilla que ya no da más o una web que no te representa?"
        message="Hola Aspa, quiero contarles un proyecto"
      />

      <JsonLd
        data={collectionSchema({
          name: "Casos",
          description: DESCRIPTION,
          path: PATH,
          items: WORKS.map((w) => ({ name: w.t, path: w.href })),
        })}
      />
      <JsonLd data={breadcrumbs([{ name: "Casos", path: PATH }])} />
      <PageFx page="casos" />
    </main>
  );
}
