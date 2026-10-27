import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { PainCard } from "@/components/PainArt";
import { Boceto, Bw, Demo, DevDemo, IncIcon, Nogal, PriceBlock, Trama } from "@/components/Rubros";
import { RUBRO_SLUGS, routes, type Lang } from "@/i18n";
import { rubro, web, type DemoBlock } from "@/lib/rubros";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/site";
import type { RubroSlug } from "@/lib/webs";
import "@/styles/pains.css";
import "./rubro.css";
import "./scenes-a.css";
import "./scenes-b.css";
import "./devdemo.css";

// Página de un rubro de Webs (/webs/<slug> y /en/websites/<slug en inglés>). `slug` es siempre la
// clave en español (la de los datos); las rutas leen el parámetro y lo traducen.

const T = {
  es: {
    hoy: "Lo que le pasa hoy a ",
    inc: ["Qué ", "incluye"],
    demo: ["Cómo se ", "vería"],
    price: "Inversión",
    capture: (url: string) => `Captura de ${url}`,
    other: "¿No es tu rubro? Ver otros rubros →",
    webs: "Webs",
  },
  en: {
    hoy: "What ",
    hoyEnd: " are up against today",
    inc: ["What's ", "included"],
    demo: ["How it would ", "look"],
    price: "Investment",
    capture: (url: string) => `Screenshot of ${url}`,
    other: "Not your industry? See other industries →",
    webs: "Websites",
  },
} as const;

/** Slug en inglés → clave en español (o null si no es un rubro). */
export function rubroFromEn(slug: string): RubroSlug | null {
  const hit = Object.entries(RUBRO_SLUGS).find(([, en]) => en === slug);
  return hit ? (hit[0] as RubroSlug) : null;
}

export function rubroMeta(lang: Lang, slug: RubroSlug): Metadata {
  const r = rubro(slug, lang);
  return pageMeta({
    path: routes(lang).rubro(slug),
    title: r.seoTitle,
    description: r.description,
    // imagen para redes de cada idioma (las genera scripts/og-images.mjs)
    image: {
      url: lang === "es" ? `/og/webs-${slug}.jpg` : `/og/en-websites-${RUBRO_SLUGS[slug]}.jpg`,
      alt: `Aspa Software: ${r.seoTitle.toLowerCase()}.`,
    },
  });
}

/** "texto *resaltado*" → partes para CharTitle / nodos con <em class="grad">. */
const parts = (s: string) =>
  s
    .split(/\*(.+?)\*/)
    .map((p, i) => (i % 2 ? { em: p } : p))
    .filter((p) => p !== "");
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

function DemoView({ lang, b, i }: { lang: Lang; b: DemoBlock; i: number }) {
  if ("web" in b)
    return i > 0 && b.web === "cej" ? (
      <div style={{ marginTop: "clamp(72px,8vw,120px)" }}>
        <Demo lang={lang} w={web(b.web, lang)} rev />
      </div>
    ) : (
      <Demo lang={lang} w={web(b.web, lang)} rev={i % 2 === 1} />
    );
  if (b.mock === "nogal") return <Nogal lang={lang} />;
  if (b.mock === "boceto") return <Boceto lang={lang} />;
  if (b.mock === "trama") return <Trama lang={lang} />;
  return <DevDemo lang={lang} />;
}

export function RubroView({ lang, slug }: { lang: Lang; slug: RubroSlug }) {
  const r = rubro(slug, lang);
  const t = T[lang];
  const path = routes(lang).rubro(slug);
  const who = r.who ?? r.menu.toLowerCase();
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
                  <Bw
                    lang={lang}
                    url={r.hero.url}
                    img={r.hero.capture}
                    alt={t.capture(r.hero.url)}
                    sizes="(max-width: 980px) calc(100vw - 48px), 640px"
                    priority
                  />
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
                {t.hoy}
                <em className="grad">{who}</em>
                {"hoyEnd" in t && t.hoyEnd}
              </h2>
            </div>
          </div>
          <div className="cards3">
            {r.hoy.map((p, i) => (
              <PainCard key={p} text={p} n={i + 1} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rb-inc">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2" id="rb-inc" data-lines>
              {t.inc[0]}
              <em className="grad">{t.inc[1]}</em>
            </h2>
          </div>
          <ul className="inc-grid">
            {r.inc.map((x) => (
              <li className="inc glass rv" key={x}>
                <IncIcon text={x} lang={lang} />
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
              {t.demo[0]}
              <em className="grad">{t.demo[1]}</em>
            </h2>
          </div>
          {r.demo.map((b, i) => (
            <DemoView lang={lang} b={b} i={i} key={i} />
          ))}
        </div>
      </section>

      <section className="section" aria-label={t.price}>
        <div className="wrap">
          <PriceBlock lang={lang} pay={plain(r.pay)} custom={r.custom ? rich(r.custom) : undefined} wa={waLink(r.wa)} />
        </div>
      </section>

      <Cta
        lang={lang}
        question={plain(r.cta)}
        message={r.wa}
        extra={
          <div className="cta-links">
            <a className="ul" href={`${routes(lang).webs}#rubros`}>
              {t.other}
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
          { name: t.webs, path: routes(lang).webs },
          { name: r.menu, path },
        ])}
      />
      <PageFx page="rubro" />
    </>
  );
}
