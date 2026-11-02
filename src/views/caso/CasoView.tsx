import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { routes, type Lang } from "@/i18n";
import { caso, NEXT, type Caso, type CasoSlug } from "@/lib/casos";
import { breadcrumbs, softwareSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { waLink } from "@/lib/site";
import "@/styles/prodname.css";
import "../casos/casos.css";
import "./showcase.css";

const T = {
  es: {
    crumb: "Casos",
    own: "Sistema propio",
    problem: ["El ", "problema"],
    mods: ["Los ", "módulos"],
    tourNav: "Módulos",
    before: "Antes",
    after: "Con Aspa",
    sx: {
      title: ["De la búsqueda al cobro, ", "en un solo sistema."],
      see: "Ver los módulos",
      demo: "Pedir una demo",
      demoMsg: "Hola Aspa, quiero ver una demo de Aspa Scout",
      shot: "Aspa Scout: resultados del equipo comercial, con la tasa de respuesta y qué ciudades responden mejor",
      cand: ["378", "candidatos esperando tu revisión"],
      chat: ["Parrilla Don Ramón", "Dale, pasame más info"],
      send: ["Programar envío", "Programar 6 envíos"],
      sendRows: [
        ["10:15", "Parrilla Don Ramón"],
        ["10:42", "Hotel Las Piedras"],
        ["11:06", "Salón Los Álamos"],
      ],
      cobro: ["Por cobrar", "$180.000", "2 clientes con deuda"],
    },
    looks: ["Cómo ", "se ve"],
    result: "Resultado",
    other: "Otro caso",
    zoom: "Ampliar",
    question: "¿Qué proceso de tu empresa te gustaría que se haga solo?",
    message: "Hola Aspa, quiero automatizar un proceso",
    lb: { label: "Captura ampliada", prev: "Anterior", next: "Siguiente", close: "Cerrar" },
    manga: {
      aria: "App de la manga: nueva pesada del lote L-04, caravana AR 0412, 396 kg, 18 kg más que la anterior",
      cap: "Manga · Lote L-04",
      title: "Nueva pesada",
      rows: [
        ["Caravana", "AR 0412"],
        ["Peso", "396 kg"],
      ],
      diff: "Dif. anterior",
      btn: "Guardar y siguiente",
      lbl: "App de la manga",
      text: "Las pesadas se cargan desde el celular, en la manga, y quedan en el sistema al instante.",
    },
  },
  en: {
    crumb: "Work",
    own: "Our own product",
    problem: ["The ", "problem"],
    mods: ["The ", "modules"],
    tourNav: "Modules",
    before: "Before",
    after: "With Aspa",
    sx: {
      title: ["From search to payment, ", "in a single system."],
      see: "See the modules",
      demo: "Book a demo",
      demoMsg: "Hi Aspa, I'd like a demo of Aspa Scout",
      shot: "Aspa Scout: sales team results, with response rate and which cities respond best",
      cand: ["378", "candidates waiting for your review"],
      chat: ["Parrilla Don Ramón", "Sure, send me more info"],
      send: ["Schedule outreach", "Schedule 6 messages"],
      sendRows: [
        ["10:15", "Parrilla Don Ramón"],
        ["10:42", "Hotel Las Piedras"],
        ["11:06", "Salón Los Álamos"],
      ],
      cobro: ["Outstanding", "$180,000", "2 customers owing"],
    },
    looks: ["How it ", "looks"],
    result: "Result",
    other: "Another case",
    zoom: "Enlarge",
    question: "Which process in your business would you love to see run on its own?",
    message: "Hi Aspa, I'd like to automate a process",
    lb: { label: "Enlarged screenshot", prev: "Previous", next: "Next", close: "Close" },
    manga: {
      aria: "Chute app: new weigh-in for lot L-04, ear tag AR 0412, 396 kg, 18 kg more than the previous one",
      cap: "Chute · Lot L-04",
      title: "New weigh-in",
      rows: [
        ["Ear tag", "AR 0412"],
        ["Weight", "396 kg"],
      ],
      diff: "Vs. previous",
      btn: "Save and next",
      lbl: "Chute-side app",
      text: "Weigh-ins are entered from a phone, right at the chute, and show up in the system instantly.",
    },
  },
} as const;

type Tx = (typeof T)[Lang];

export function casoMeta(slug: CasoSlug, lang: Lang): Metadata {
  const c = caso(slug, lang);
  return pageMeta({ path: c.path, title: c.seoTitle, description: c.description });
}

/** "Aspa" + nombre en Cinzel, como en Sistemas. */
function ProdName({ name }: { name: string }) {
  return (
    <h1 className="prodname" aria-label={`Aspa ${name}`}>
      <span className="pn-logo" aria-hidden="true">
        <Logo />
      </span>
      <span className="pn-name" aria-hidden="true">
        {name}
      </span>
    </h1>
  );
}

const SHOT_FULL = "(max-width: 1328px) calc(100vw - 64px), 1264px",
  SHOT_HALF = "(max-width: 1328px) calc(50vw - 40px), 624px",
  /** la captura del módulo elegido: lo que queda al lado de la lista en escritorio, todo el ancho en celular */
  SHOT_TOUR = "(max-width: 980px) calc(100vw - 32px), (max-width: 1328px) calc(100vw - 420px), 920px";

/** id de cada módulo: "Búsquedas" → "mod-busquedas". */
const modId = (h: string) =>
  "mod-" +
  h
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Íconos de los módulos de Scout, en el orden del recorrido (trazos de 24 × 24). */
const MOD_ICONS: string[][] = [
  ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "m20 20-3.5-3.5"],
  ["M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6", "M16 4.6a3.5 3.5 0 0 1 0 6.8", "M21 20c0-2.6-1.6-4.8-3.8-5.6"],
  ["M21 12a8.5 8.5 0 0 1-12.4 7.6L3.5 21l1.4-4.6A8.5 8.5 0 1 1 21 12z"],
  ["M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M3 10h18", "M8 3v4", "M16 3v4"],
  ["M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z", "m8.5 12 2.5 2.5 4.5-5"],
  [
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    "M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5",
    "M12 6v2",
    "M12 16v2",
  ],
  ["M3 20h18", "M6 16v-5", "M11 16V6", "M16 16V9", "M20 16v-3"],
  ["M12 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", "M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"],
];

function ModIcon({ i }: { i: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {(MOD_ICONS[i] ?? MOD_ICONS[0]).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** Módulos de Scout como selector: a la izquierda la lista (pestañas con ícono), a la derecha el módulo
 *  elegido con su captura y su explicación. Avanza solo, con una barra que marca el tiempo, hasta
 *  que se elige uno a mano. Sin JS se ven todos los módulos, uno debajo del otro. El cambio de
 *  pestaña, el avance y el teclado los pone fx/casos.ts. */
function Tour({ c, t }: { c: Caso; t: Tx }) {
  const tour = c.tour!;
  return (
    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="caso-modulos">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="h2" id="caso-modulos" data-lines>
              {t.mods[0]}
              <em className="grad">{t.mods[1]}</em>
            </h2>
          </div>
        </div>
        <div className="mt" data-mt>
          <div className="mt-list rv" role="tablist" aria-label={t.tourNav}>
            {tour.map((m, i) => (
              <button
                key={m.h}
                type="button"
                role="tab"
                id={`${modId(m.h)}-tab`}
                aria-controls={modId(m.h)}
                aria-selected={i === 0}
                tabIndex={i === 0 ? 0 : -1}
                className={i === 0 ? "mt-tab on" : "mt-tab"}
              >
                <span className="mt-ico">
                  <ModIcon i={i} />
                </span>
                <span className="mt-name">{m.h}</span>
                <span className="mt-bar" aria-hidden="true">
                  <i />
                </span>
              </button>
            ))}
          </div>
          <div className="mt-stage" data-lb-group>
            {tour.map((m, i) => (
              <div key={m.h} role="tabpanel" id={modId(m.h)} aria-labelledby={`${modId(m.h)}-tab`} className={i === 0 ? "mt-panel on" : "mt-panel"}>
                <div className="mt-shot">
                  <span className="mt-glow" aria-hidden="true" />
                  <Shot img={m.img} cap={m.cap} sizes={SHOT_TOUR} zoom={t.zoom} />
                </div>
                <div className="mt-info">
                  <div>
                    <h3 className="h3">{m.h}</h3>
                    <p className="mt-d">{m.d}</p>
                  </div>
                  <ul className="mt-pts">
                    {m.pts.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Captura que se amplía: el lightbox usa el srcset grande (hasta 2200 px), no el de la miniatura. */
function Shot({ img, cap, sizes, zoom }: { img: Caso["shots"][number]["img"]; cap: string; sizes: string; zoom: string }) {
  const big = getImageProps({ src: img, alt: "", sizes: "min(1176px, 92vw)" }).props;
  return (
    <button className="shot glass rv-img" type="button" data-lb data-cap={cap} data-srcset={big.srcSet} data-sizes={big.sizes} aria-label={`${zoom}: ${cap}`}>
      <Image src={img} alt={cap} sizes={sizes} />
    </button>
  );
}

/** El problema como antes / después (Scout): a la izquierda cómo se trabajaba, a la derecha qué hace el
 *  sistema. Al entrar cada fila, lo de antes se tacha y llega la respuesta (CSS sobre .rv.in). */
function Pains({ c, t }: { c: Caso; t: Tx }) {
  return (
    <section className="section pf-sec" aria-labelledby="caso-problema">
      <div className="wrap">
        <div className="grid case-split pf-head">
          <div>
            <h2 className="h2" id="caso-problema" data-lines>
              {t.problem[0]}
              <em className="grad">{t.problem[1]}</em>
            </h2>
          </div>
          <p className="lead pf-lead">{c.problem}</p>
        </div>
        <div className="pf glass glass-big">
          <div className="pf-cols" aria-hidden="true">
            <span>{t.before}</span>
            <span />
            <span>
              {t.after} {c.name}
            </span>
          </div>
          <ul className="pf-list">
            {c.pains!.map(([a, b], i) => (
              <li className="pf-row rv" key={a} style={{ "--rv-i": i % 2 } as CSSProperties}>
                <span className="pf-old">
                  <span className="pf-x" aria-hidden="true" />
                  <span className="pf-t">
                    <span className="sr-only">{t.before}: </span>
                    {a}
                  </span>
                </span>
                <span className="pf-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h15" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
                <span className="pf-new">
                  <span className="pf-ok" aria-hidden="true" />
                  <span>
                    <span className="sr-only">
                      {t.after} {c.name}:{" "}
                    </span>
                    {b}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Hero con escena (Scout): título grande, botones y la pantalla de Resultados en 3D con tarjetas que
 *  flotan alrededor (candidatos, un chat de WhatsApp, el envío programado y lo que falta cobrar).
 *  Las tarjetas repiten lo que ya dice la página: son decorativas (aria-hidden). El movimiento con el
 *  puntero y el scroll lo pone fx/casos.ts; la entrada y la flotación, el CSS. */
function Showcase({ c, t }: { c: Caso; t: Tx }) {
  const x = t.sx;
  return (
    <section className="case-hero sx-hero" aria-label={`Aspa ${c.name}`}>
      <div className="sx-bg" aria-hidden="true">
        <span className="sx-blob sx-b1" />
        <span className="sx-blob sx-b2" />
        <span className="sx-grid" />
      </div>
      <div className="wrap sx-top">
        <ProdName name={c.name} />
        <p className="sx-title r-late">
          {x.title[0]}
          <span className="sx-grad">{x.title[1]}</span>
        </p>
        <p className="lead sx-lead r-late">{c.lead}</p>
        <div className="btns sx-btns r-late">
          <a className="btn btn-glass btn-blue" href="#caso-modulos">
            <span>{x.see}</span>
          </a>
          <a className="btn btn-glass" href={waLink(x.demoMsg)} target="_blank" rel="noopener">
            <span>{x.demo}</span>
          </a>
        </div>
      </div>

      <div className="sx-stage" data-sx>
        <div className="sx-scene">
          <div className="sx-screen">
            <div className="sx-screen-in">
              <Image src={c.showcase!} alt={x.shot} sizes="(max-width: 980px) calc(100vw - 32px), min(1120px, 78vw)" priority />
            </div>
          </div>

          <div className="sx-chip sx-c1" style={{ "--d": 1.3 } as CSSProperties} aria-hidden="true">
            <div className="sx-float">
              <div className="sx-card glass">
                <span className="sx-ico">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <span>
                  <b className="sx-big">{x.cand[0]}</b>
                  <span className="sx-sm">{x.cand[1]}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="sx-chip sx-c2" style={{ "--d": 1.8 } as CSSProperties} aria-hidden="true">
            <div className="sx-float">
              <div className="sx-card glass sx-chat">
                <span className="sx-av">PD</span>
                <span>
                  <span className="sx-sm" lang="es">
                    {x.chat[0]}
                  </span>
                  <span className="sx-bub">
                    <span className="sx-typing">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="sx-msg">{x.chat[1]}</span>
                    <span className="sx-time">09:12 ✓✓</span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="sx-chip sx-c3" style={{ "--d": 0.9 } as CSSProperties} aria-hidden="true">
            <div className="sx-float">
              <div className="sx-card glass sx-send">
                <b>{x.send[0]}</b>
                {x.sendRows.map(([h, n]) => (
                  <span className="sx-row" key={h}>
                    <span>{h}</span>
                    <span lang="es">{n}</span>
                  </span>
                ))}
                <span className="sx-btn">{x.send[1]}</span>
              </div>
            </div>
          </div>

          <div className="sx-chip sx-c4" style={{ "--d": 1.5 } as CSSProperties} aria-hidden="true">
            <div className="sx-float">
              <div className="sx-card glass">
                <span>
                  <span className="sx-sm">{x.cobro[0]}</span>
                  <b className="sx-big sx-amber">{x.cobro[1]}</b>
                  <span className="sx-sm">{x.cobro[2]}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ul className="feat sx-feat glass r-late">
          {c.feat.map(([k, v]) => (
            <li key={k}>
              <span>{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** App de la manga (Rodeo): la pantalla de carga de una pesada en el celular. */
function Manga({ m }: { m: Tx["manga"] }) {
  return (
    <div className="manga rv">
      <div className="phone" role="img" aria-label={m.aria}>
        <div className="scr manga-scr" aria-hidden="true">
          <p className="m-cap">{m.cap}</p>
          <b className="m-t">{m.title}</b>
          {m.rows.map(([k, v]) => (
            <div className="m-row" key={k}>
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="m-row">
            <span>{m.diff}</span>
            <span className="ok">+ 18 kg</span>
          </div>
          <div className="m-btn">{m.btn}</div>
        </div>
      </div>
      <div>
        <p className="lbl">{m.lbl}</p>
        <p className="mut" style={{ maxWidth: "34ch" }}>
          {m.text}
        </p>
      </div>
    </div>
  );
}

/** Visor de capturas: <dialog> modal (foco atrapado, Escape y fondo inerte los da el navegador). */
function Lightbox({ t }: { t: Tx["lb"] }) {
  return (
    <dialog className="lb" id="lb" aria-label={t.label}>
      <div className="lb-in glass glass-big">
        {/* eslint-disable-next-line @next/next/no-img-element -- la elige casos.ts del srcset de cada captura */}
        <img alt="" id="lbImg" />
        <div className="lb-bar">
          <span id="lbCount">01 / 01</span>
          <span id="lbCap" aria-live="polite"></span>
          <span className="lb-btns">
            <button type="button" data-lb-prev aria-label={t.prev}>
              ←
            </button>
            <button type="button" data-lb-next aria-label={t.next}>
              →
            </button>
            <button type="button" data-lb-close aria-label={t.close}>
              ✕
            </button>
          </span>
        </div>
      </div>
    </dialog>
  );
}

/** Página de un caso (sistema propio): presentación, problema, módulos, capturas y resultado. */
export function CasoView({ slug, lang }: { slug: CasoSlug; lang: Lang }) {
  const t = T[lang],
    c = caso(slug, lang),
    next = caso(NEXT[slug], lang),
    casos = routes(lang).casos;
  return (
    <main id="main" className="view">
      {c.showcase ? (
        <Showcase c={c} t={t} />
      ) : (
        <section className="case-hero" aria-label={`Aspa ${c.name}`}>
          <div className="wrap">
            <p className="crumb2">
              <Link className="ul" href={casos}>
                {t.crumb}
              </Link>{" "}
              {`· ${t.own}`}
            </p>
            <ProdName name={c.name} />
            <div className="grid case-intro r-late">
              <p className="lead">{c.lead}</p>
              <ul className="feat glass">
                {c.feat.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {c.pains ? (
        <Pains c={c} t={t} />
      ) : (
        <section className="section" aria-labelledby="caso-problema">
          <div className="wrap">
            <div className="grid case-split">
              <div>
                <h2 className="h2" id="caso-problema" data-lines>
                  {t.problem[0]}
                  <em className="grad">{t.problem[1]}</em>
                </h2>
              </div>
              <p className="lead2">{c.problem}</p>
            </div>
          </div>
        </section>
      )}

      {c.tour ? (
        <Tour c={c} t={t} />
      ) : (
        <>
          <section className="section" style={{ paddingTop: 0 }} aria-labelledby="caso-modulos">
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <h2 className="h2" id="caso-modulos" data-lines>
                    {t.mods[0]}
                    <em className="grad">{t.mods[1]}</em>
                  </h2>
                </div>
              </div>
              <div className="mods">
                {c.mods.map(([h, d]) => (
                  <article className="mod glass rv" key={h}>
                    <h3>{h}</h3>
                    <p className="mut">{d}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }} aria-labelledby="caso-pantallas">
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <h2 className="h2" id="caso-pantallas" data-lines>
                    {t.looks[0]}
                    <em className="grad">{t.looks[1]}</em>
                  </h2>
                </div>
              </div>
              <div className="shots">
                {c.shots.map((s, i) => (
                  <Shot key={s.cap} img={s.img} cap={s.cap} sizes={i === 0 ? SHOT_FULL : SHOT_HALF} zoom={t.zoom} />
                ))}
              </div>
              {c.manga && <Manga m={t.manga} />}
            </div>
          </section>
        </>
      )}

      <section className="section" style={{ paddingTop: 0 }} aria-label={t.result}>
        <div className="wrap">
          <div className="result glass rv">
            <p className="lbl">{t.result}</p>
            <p className="lead">{c.result}</p>
          </div>
        </div>
      </section>

      <section className="next-case" aria-label={t.other}>
        <Link className="next glass" href={next.path}>
          <span className="lbl">{t.other}</span>
          <span className="next-t">
            Aspa {next.name} <span className="arrow">→</span>
          </span>
          <span className="next-img" aria-hidden="true">
            <Image src={next.cover} alt="" sizes="28vw" />
          </span>
        </Link>
      </section>

      <Cta lang={lang} question={t.question} message={t.message} />

      <Lightbox t={t.lb} />
      <JsonLd
        data={softwareSchema({
          name: `Aspa ${c.name}`,
          description: c.description,
          path: c.path,
          image: getImageProps({ src: c.cover, alt: "", width: 1200 }).props.src,
          features: c.mods.map(([h, d]) => `${h}: ${d}`),
        })}
      />
      <JsonLd
        data={breadcrumbs([
          { name: t.crumb, path: casos },
          { name: `Aspa ${c.name}`, path: c.path },
        ])}
      />
      <PageFx page="caso" />
    </main>
  );
}
