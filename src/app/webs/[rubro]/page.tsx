import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment, Suspense } from "react";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { PainCard } from "@/components/PainArt";
import { Boceto, Bw, Demo, DevDemo, IncIcon, Nogal, PriceBlock, Trama } from "@/components/Rubros";
import { RUBRO_DATA, WEBS, type DemoBlock } from "@/lib/rubros";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES, waLink } from "@/lib/site";
import { RUBROS, type RubroSlug } from "@/lib/webs";
import "@/styles/pains.css";
import "./rubro.css";
import "./scenes-a.css";
import "./scenes-b.css";
import "./devdemo.css";

type Props = { params: Promise<{ rubro: string }> };

export function generateStaticParams() {
  return RUBROS.map((r) => ({ rubro: r.slug }));
}

const get = (slug: string) => (slug in RUBRO_DATA ? RUBRO_DATA[slug as RubroSlug] : null);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = get((await params).rubro);
  if (!r) return {};
  return pageMeta({
    path: ROUTES.rubro(r.slug),
    title: r.seoTitle,
    description: r.description,
    image: { url: `/og/webs-${r.slug}.jpg`, alt: `Aspa Software: ${r.seoTitle.toLowerCase()}.` },
  });
}

/** "texto *resaltado*" → partes para CharTitle / nodos con <em class="grad">. */
const parts = (s: string) => s.split(/\*(.+?)\*/).map((p, i) => (i % 2 ? { em: p } : p)).filter((p) => p !== "");
const rich = (s: string) =>
  s.split(/\*(.+?)\*/).map((p, i) =>
    i % 2 ? (
      <em className="grad" key={i}>
        {p}
      </em>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
const plain = (s: string) => s.replace(/\*/g, "");

function DemoView({ b, i }: { b: DemoBlock; i: number }) {
  if ("web" in b) return i > 0 && b.web === "cej" ? (
    <div style={{ marginTop: "clamp(72px,8vw,120px)" }}>
      <Demo w={WEBS[b.web]} rev />
    </div>
  ) : (
    <Demo w={WEBS[b.web]} rev={i % 2 === 1} />
  );
  if (b.mock === "nogal") return <Nogal />;
  if (b.mock === "boceto") return <Boceto />;
  if (b.mock === "trama") return <Trama />;
  return <DevDemo />;
}

// Los params van dentro de <Suspense> (requisito de cacheComponents para la navegación); como
// generateStaticParams lista los 7 rubros, cada página igual se genera completa en el build.
export default function RubroPage({ params }: Props) {
  return (
    <main id="main" className="view">
      <Suspense>
        <Rubro params={params} />
      </Suspense>
    </main>
  );
}

async function Rubro({ params }: Props) {
  const r = get((await params).rubro);
  if (!r) notFound();
  const path = ROUTES.rubro(r.slug);
  const lower = r.menu.toLowerCase();
  return (
    <>
      <section className="rb-hero" aria-labelledby="rb-title">
        <div className="wrap">
          <div className="grid">
            <div className="txt">
              <CharTitle id="rb-title" parts={parts(r.title)} />
              <p className="lead mut r-late">{r.lead}</p>
            </div>
            <div className="vis rv-img">
              {"capture" in r.hero ? (
                <div className="vis-cap">
                  <Bw url={r.hero.url} img={r.hero.capture} alt={`Captura de ${r.hero.url}`} sizes="(max-width: 980px) calc(100vw - 48px), 640px" priority />
                </div>
              ) : (
                <div className="ph" style={r.hero.photo.width < 900 ? { maxWidth: r.hero.photo.width, marginLeft: "auto" } : undefined}>
                  <Image src={r.hero.photo} alt="" sizes="(max-width: 980px) calc(100vw - 48px), 640px" priority />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {r.scene && (
        <section className="section scene-sec" style={{ paddingTop: 0 }} aria-labelledby="rb-scene">
          <div className="wrap">
            <div className="scene-wrap">
              <div className="hw-txt">
                <h2 className="h2" id="rb-scene" data-lines>
                  {r.scene.title}
                </h2>
                <p className="mut">{r.scene.text}</p>
              </div>
              <div className="m3d house-3d" data-kind={r.scene.kind} aria-hidden="true">
                <Image className="m3d-fb" src={r.scene.fallback} alt="" sizes="(max-width: 980px) 100vw, 60vw" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="rb-hoy">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="rb-hoy" data-lines>
                Lo que le pasa hoy a <em className="grad">{lower}</em>
              </h2>
            </div>
          </div>
          <div className="cards3">
            {r.hoy.map((p, i) => (
              <PainCard key={p} text={p} n={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rb-inc">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2" id="rb-inc" data-lines>
              Qué <em className="grad">incluye</em>
            </h2>
          </div>
          <ul className="inc-grid">
            {r.inc.map((x) => (
              <li className="inc glass rv" key={x}>
                <IncIcon text={x} />
                <h3>{x}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="rb-demo">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2" id="rb-demo" data-lines>
              Cómo se <em className="grad">vería</em>
            </h2>
          </div>
          {r.demo.map((b, i) => (
            <DemoView b={b} i={i} key={i} />
          ))}
        </div>
      </section>

      <section className="section" aria-label="Inversión">
        <div className="wrap">
          <PriceBlock pay={plain(r.pay)} custom={r.custom ? rich(r.custom) : undefined} wa={waLink(r.wa)} />
        </div>
      </section>

      <Cta
        question={plain(r.cta)}
        message={r.wa}
        extra={
          <div className="cta-links">
            <a className="ul" href={`${ROUTES.webs}#rubros`}>
              ¿No es tu rubro? Ver otros rubros →
            </a>
          </div>
        }
      />

      <JsonLd
        data={serviceSchema({
          name: r.seoTitle,
          description: r.description,
          path,
          offers: r.inc,
        })}
      />
      <JsonLd
        data={breadcrumbs([
          { name: "Webs", path: ROUTES.webs },
          { name: r.menu, path },
        ])}
      />
      <PageFx page="rubro" />
    </>
  );
}
