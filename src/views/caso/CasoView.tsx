import type { Metadata } from "next";
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
import "@/styles/prodname.css";
import "../casos/casos.css";

const T = {
  es: {
    crumb: "Casos",
    own: "Sistema propio",
    problem: ["El ", "problema"],
    mods: ["Los ", "módulos"],
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

/** Captura que se amplía: el lightbox usa el srcset grande (hasta 2200 px), no el de la miniatura. */
function Shot({ img, cap, first, zoom }: { img: Caso["shots"][number]["img"]; cap: string; first: boolean; zoom: string }) {
  const sizes = first ? "(max-width: 1328px) calc(100vw - 64px), 1264px" : "(max-width: 1328px) calc(50vw - 40px), 624px";
  const big = getImageProps({ src: img, alt: "", sizes: "min(1176px, 92vw)" }).props;
  return (
    <button
      className="shot glass rv-img"
      type="button"
      data-lb
      data-cap={cap}
      data-srcset={big.srcSet}
      data-sizes={big.sizes}
      aria-label={`${zoom}: ${cap}`}
    >
      <Image src={img} alt={cap} sizes={sizes} />
    </button>
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
              <Shot key={s.cap} img={s.img} cap={s.cap} first={i === 0} zoom={t.zoom} />
            ))}
          </div>
          {c.manga && <Manga m={t.manga} />}
        </div>
      </section>

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
