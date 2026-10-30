import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Lang } from "@/i18n";
import "@/styles/hgal.css";

/** Un trabajo de la galería: con `url` abre la web publicada; con `href`, una página del sitio (un caso). */
export type Work = { name: string; tipo: string; img: StaticImageData; alt: string; url?: string; href?: string };

const T = {
  es: { live: "Ver en vivo ↗", caso: "Ver caso →", newTab: "(se abre en otra pestaña)" },
  en: { live: "View live ↗", caso: "View case →", newTab: "(opens in a new tab)" },
} as const;

const SIZES = "(max-width: 980px) 84vw, (max-width: 1530px) 34vw, 520px";

/** Galería horizontal guiada por el scroll (fx/site initGallery): la misma en el Home y en Webs. */
export function WorkGallery({ lang, id, trackId, title, works }: { lang: Lang; id: string; trackId: string; title: readonly [string, string]; works: Work[] }) {
  const t = T[lang];
  return (
    <section className="hgal native" data-hgal aria-labelledby={id}>
      <div className="hgal-stage">
        <div className="wrap hgal-head">
          <div>
            <h2 className="h2" id={id} data-lines>
              {title[0]}
              <em className="grad">{title[1]}</em>
            </h2>
          </div>
        </div>
        <ul className="hgal-track" id={trackId}>
          {works.map((w) => {
            const body = (
              <>
                <div className="hc-img">
                  <Image src={w.img} alt={w.alt} sizes={SIZES} />
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
                  <a className="hcard" href={`https://${w.url}`} target="_blank" rel="noopener">
                    {body}
                    <span className="hc-pill glass" aria-hidden="true">
                      {t.live}
                    </span>
                    <span className="sr-only">{t.newTab}</span>
                  </a>
                ) : w.href ? (
                  <Link className="hcard" href={w.href}>
                    {body}
                    <span className="hc-pill glass" aria-hidden="true">
                      {t.caso}
                    </span>
                  </Link>
                ) : (
                  <div className="hcard">{body}</div>
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
  );
}
