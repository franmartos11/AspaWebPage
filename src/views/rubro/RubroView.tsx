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
import { rubro, web, type DemoBlock, type SceneKind } from "@/lib/rubros";
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

// Dónde arranca cada etapa de la escena, como fracción del tramo de scroll: sale de la línea de tiempo
// de cada escena (scenes/*.ts), así la etapa marcada coincide con lo que se está armando.
const STEP_AT: Record<SceneKind, number[]> = {
  house: [0, 0.25, 0.4, 0.56, 0.81],
  studio: [0, 0.19, 0.29, 0.53, 0.82],
  room: [0, 0.17, 0.38, 0.72],
  site: [0, 0.14, 0.4, 0.8],
  homes: [0, 0.26, 0.45, 0.7],
};

const T = {
  es: {
    hoy: "Lo que le pasa hoy a ",
    inc: ["Qué ", "incluye"],
    demo: ["Cómo se ", "vería"],
    price: "Inversión",
    capture: (url: string) => `Captura de ${url}`,
    // etapas de cada escena 3D: nombre y qué se arma (se marcan con el scroll; dónde arranca cada una: STEP_AT)
    stage: "Etapa",
    steps: {
      house: [
        ["El plano", "Muros, aberturas y cotas, trazados sobre el terreno."],
        ["Los volúmenes", "Crecen la planta baja, el ala y el volumen que vuela."],
        ["Losas y vidrios", "Bajan los techos y se cierran los paños vidriados."],
        ["Paisaje", "Pileta, deck, cercos, árboles y el auto en el acceso."],
        ["Materiales", "Hormigón visto, madera y la luz encendida adentro."],
      ],
      studio: [
        ["La grilla", "Los ejes del proyecto, con sus letras de referencia."],
        ["Estructura", "Columnas y núcleo en cada cruce de ejes."],
        ["Losas", "Tres losas escalonadas, una sobre otra."],
        ["Fachada", "El vidrio y las lamas que giran a su lugar."],
        ["Materiales", "Hormigón, madera y la luz adentro."],
      ],
      room: [
        ["La planta", "Se dibuja el ambiente y suben las paredes."],
        ["Paredes y ventana", "La ventana, las cortinas y el rayo de luz."],
        ["Muebles", "Los muebles entran uno por uno."],
        ["La luz", "Se prenden las lámparas y el ambiente queda listo."],
      ],
      site: [
        ["Replanteo", "El terreno, el obrador y la grúa en posición."],
        ["Columnas", "Suben las columnas con su encofrado."],
        ["Losas", "Bajan las losas, piso por piso."],
        ["Fachada", "El andamio y el vidriado de los primeros pisos."],
      ],
      homes: [
        ["El loteo", "Los lotes, dibujados sobre el terreno."],
        ["Las casas", "Crecen las tres casas modelo."],
        ["Los modelos", "Cada casa con su cartel y su nombre."],
        ["El barrio", "Árboles y la luz cálida encendida."],
      ],
    },
    heroWa: "Escribinos por WhatsApp",
    heroDemo: "Ver ejemplos ↓",
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
    stage: "Stage",
    steps: {
      house: [
        ["The plan", "Walls, openings and dimensions, drawn on the lot."],
        ["The volumes", "The ground floor, the wing and the cantilevered volume rise."],
        ["Slabs and glass", "The roofs come down and the glazing closes in."],
        ["Landscape", "Pool, deck, hedges, trees and the car in the driveway."],
        ["Materials", "Exposed concrete, wood and the lights on inside."],
      ],
      studio: [
        ["The grid", "The project's axes, with their reference letters."],
        ["Structure", "Columns and core at every grid intersection."],
        ["Slabs", "Three stepped slabs, one above the other."],
        ["Façade", "The glass and the fins turning into place."],
        ["Materials", "Concrete, wood and the lights on inside."],
      ],
      room: [
        ["The floor plan", "The room is drawn and the walls go up."],
        ["Walls and window", "The window, the curtains and the beam of light."],
        ["Furniture", "The furniture comes in, piece by piece."],
        ["Lighting", "The lamps turn on and the room is ready."],
      ],
      site: [
        ["Setting out", "The lot, the site office and the crane in place."],
        ["Columns", "The columns rise with their formwork."],
        ["Slabs", "The slabs come down, floor by floor."],
        ["Façade", "The scaffolding and the glazing on the first floors."],
      ],
      homes: [
        ["The lots", "The lots, drawn on the land."],
        ["The homes", "The three model homes go up."],
        ["The models", "Each home with its sign and its name."],
        ["The neighborhood", "Trees and the warm lights on."],
      ],
    },
    heroWa: "Message us on WhatsApp",
    heroDemo: "See examples ↓",
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
              {/* el mismo hero en los 7 rubros: título, bajada y las dos acciones */}
              <div className="rb-acts r-late">
                <a className="btn btn-glass btn-blue" href={waLink(r.wa)} target="_blank" rel="noopener">
                  <span>{t.heroWa}</span>
                </a>
                <a className="btn btn-glass" href="#rb-demo-sec">
                  <span>{t.heroDemo}</span>
                </a>
              </div>
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
                <div className="ph">
                  <Image src={r.hero.photo} alt="" sizes="(max-width: 980px) calc(100vw - 48px), 640px" priority />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {r.scene && (
        // data-scrub: con 3D la sección queda fija y el scroll arma la obra (scenes/kit.ts, scrub)
        <section className="section scene-sec" data-scrub style={{ paddingTop: 0 }} aria-labelledby="rb-scene">
          <div className="wrap">
            <div className="scene-wrap">
              <div className="hw-txt">
                <h2 className="h2" id="rb-scene" data-lines>
                  {r.scene.title}
                </h2>
                <p className="mut">{r.scene.text}</p>
                {/* etapas: línea de tiempo con el riel que se llena con el scroll (lib/fx/rubro); la etapa
                    activa despliega qué se está armando. En celular, solo la activa con el contador. */}
                <div className="sc-prog">
                  <p className="sc-count" aria-hidden="true">
                    {t.stage} <b className="sc-cur">01</b>
                    <span> / {String(t.steps[r.scene.kind].length).padStart(2, "0")}</span>
                  </p>
                  <ol className="sc-steps" data-at={STEP_AT[r.scene.kind].join(",")}>
                    {t.steps[r.scene.kind].map(([name, what], i) => (
                      <li key={name}>
                        <span className="sc-n">{String(i + 1).padStart(2, "0")}</span>
                        <div className="sc-tx">
                          <b>{name}</b>
                          <div className="sc-what">
                            <p>{what}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="sc-rail" aria-hidden="true">
                    <i></i>
                  </div>
                </div>
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

      <section className="section" id="rb-demo-sec" style={{ paddingTop: 0 }} aria-labelledby="rb-demo">
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
