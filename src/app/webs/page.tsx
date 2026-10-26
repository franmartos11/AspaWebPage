import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { PainCard } from "@/components/PainArt";
import { Plans } from "@/components/Plans";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/site";
import { FAMS, GALLERY, RUBROS } from "@/lib/webs";
import hero from "@/assets/webs/casa-moderna-atardecer.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import "@/styles/pains.css";
import "@/styles/hgal.css";
import "@/styles/plans.css";
import "./webs.css";

const PATH = ROUTES.webs;
const DESCRIPTION =
  "Diseño de páginas web para arquitectos, estudios, constructoras, desarrollistas e interiorismo: tu trabajo bien mostrado, rápido y listo para Google. Landing en 10 días, sitio completo en 21. Córdoba, Argentina.";

export const metadata: Metadata = pageMeta({ path: PATH, title: "Páginas web para empresas y profesionales en Córdoba", description: DESCRIPTION });

const PAINS = [
  "Antes de llamarte, el cliente te busca en internet.",
  "Instagram muestra fotos sueltas, no cómo trabajás.",
  "Una web descuidada hace dudar de tu trabajo.",
];

const STEPS: [string, string][] = [
  ["Material", "Nos pasás fotos y textos de tus trabajos."],
  ["Propuesta", "Diseñamos y te mostramos cómo quedaría."],
  ["Ajustes", "Ajustamos con tus comentarios."],
  ["Publicación", "Publicamos en tu dominio y queda online."],
];

export default function WebsPage() {
  return (
    <main id="main" className="view">
      <section className="whero" id="whero" aria-labelledby="webs-title">
        <div className="whero-img" aria-hidden="true">
          <Image src={hero} alt="" sizes="100vw" priority />
        </div>
        <div className="wrap whero-txt">
          <CharTitle id="webs-title" parts={["Webs que muestran tu ", { em: "trabajo." }]} />
          <div className="whero-bot r-late">
            <p className="lead">Para empresas y profesionales que venden por lo que ya hicieron.</p>
            <a className="btn btn-glass btn-blue" href="#rubros">
              <span>¿Cuál es tu rubro?</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="webs-por-que">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="webs-por-que" data-lines>
                Por qué tu web <em className="grad">importa</em>
              </h2>
            </div>
          </div>
          <div className="cards3 pains-sw">
            {PAINS.map((p, i) => (
              <PainCard key={p} text={p} n={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="rubros" aria-labelledby="webs-rubro">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="webs-rubro" data-lines>
                ¿Cuál es tu <em className="grad">rubro?</em>
              </h2>
            </div>
          </div>
          <div className="rb-sel">
            <nav className="rb-list" aria-label="Webs por rubro">
              {FAMS.map((f, i) => (
                <div className="fam2" key={f}>
                  <p className="fam-t">{f}</p>
                  {RUBROS.filter((r) => r.fam === i).map((r) => (
                    <Link className={r.slug === "arquitectos" ? "rb-row on" : "rb-row"} data-rubro={r.slug} href={ROUTES.rubro(r.slug)} key={r.slug}>
                      <b>{r.menu}</b>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
              <a className="rb-row other2" href="#contacto">
                <b>¿Otro rubro? Hablemos</b>
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
                Capturas <em className="grad">reales</em>
              </h2>
            </div>
          </div>
          <ul className="hgal-track" id="gallery">
            {GALLERY.map((w) => {
              const body = (
                <>
                  <div className="hc-img">
                    <Image src={w.img} alt={`Web de ${w.name}`} sizes="(max-width: 980px) 78vw, (max-width: 1530px) 34vw, 520px" />
                  </div>
                  <div className="hc-meta">
                    <h3>{w.name}</h3>
                    <span className="sr-only">{w.tipo}</span>
                  </div>
                </>
              );
              return (
                <li key={w.name}>
                  {w.url ? (
                    <a className="hcard glass" href={`https://${w.url}`} target="_blank" rel="noopener">
                      {body}
                      <span className="hc-pill glass" aria-hidden="true">
                        Ver en vivo ↗
                      </span>
                      <span className="sr-only">(se abre en otra pestaña)</span>
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
                Precios <em className="grad">claros</em>
              </h2>
            </div>
            <Link className="ul" href={ROUTES.planes}>
              Ver comparación completa →
            </Link>
          </div>
          <Plans />
        </div>
      </section>

      <section className="section" aria-labelledby="webs-pasos">
        <div className="wrap grid tl-grid">
          <div className="tl-head">
            <h2 className="h2" id="webs-pasos" data-lines>
              De tus fotos a tu web <em className="grad">online</em>
            </h2>
            <p className="mut">Cuatro pasos. La Landing en 10 días, el Sitio completo en 21.</p>
          </div>
          <div className="tl" data-tl>
            <i className="tl-line" aria-hidden="true">
              <b></b>
            </i>
            <ol>
              {STEPS.map(([t, d]) => (
                <li className="glass" key={t}>
                  <span className="tl-dot" aria-hidden="true"></span>
                  <h3>{t}</h3>
                  <p className="mut">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Cta question="¿Querés ver cómo quedaría tu web? Pasanos 3 trabajos y te mandamos una portada de ejemplo." message="Hola Aspa, quiero mi web" />

      <JsonLd
        data={serviceSchema({
          name: "Diseño de páginas web para empresas y profesionales",
          description: DESCRIPTION,
          path: PATH,
          offers: RUBROS.map((r) => `Web para ${r.menu.toLowerCase()}`),
        })}
      />
      <JsonLd data={breadcrumbs([{ name: "Webs", path: PATH }])} />
      <PageFx page="webs" />
    </main>
  );
}
