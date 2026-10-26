import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { CASOS, NEXT, type Caso } from "@/lib/casos";
import { breadcrumbs, softwareSchema } from "@/lib/schema";
import { ROUTES } from "@/lib/site";

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
function Shot({ img, cap, first }: { img: Caso["shots"][number]["img"]; cap: string; first: boolean }) {
  const sizes = first ? "(max-width: 1328px) calc(100vw - 64px), 1264px" : "(max-width: 1328px) calc(50vw - 40px), 624px";
  const big = getImageProps({ src: img, alt: "", sizes: "min(1176px, 92vw)" }).props;
  return (
    <button className="shot glass rv-img" type="button" data-lb data-cap={cap} data-srcset={big.srcSet} data-sizes={big.sizes} aria-label={`Ampliar: ${cap}`}>
      <Image src={img} alt={cap} sizes={sizes} />
    </button>
  );
}

/** App de la manga (Rodeo): la pantalla de carga de una pesada en el celular. */
function Manga() {
  return (
    <div className="manga rv">
      <div className="phone" role="img" aria-label="App de la manga: nueva pesada del lote L-04, caravana AR 0412, 396 kg, 18 kg más que la anterior">
        <div className="scr manga-scr" aria-hidden="true">
          <p className="m-cap">Manga · Lote L-04</p>
          <b className="m-t">Nueva pesada</b>
          <div className="m-row">
            <span>Caravana</span>
            <span>AR 0412</span>
          </div>
          <div className="m-row">
            <span>Peso</span>
            <span>396 kg</span>
          </div>
          <div className="m-row">
            <span>Dif. anterior</span>
            <span className="ok">+ 18 kg</span>
          </div>
          <div className="m-btn">Guardar y siguiente</div>
        </div>
      </div>
      <div>
        <p className="lbl">App de la manga</p>
        <p className="mut" style={{ maxWidth: "34ch" }}>
          Las pesadas se cargan desde el celular, en la manga, y quedan en el sistema al instante.
        </p>
      </div>
    </div>
  );
}

/** Visor de capturas: <dialog> modal (foco atrapado, Escape y fondo inerte los da el navegador). */
export function Lightbox() {
  return (
    <dialog className="lb" id="lb" aria-label="Captura ampliada">
      <div className="lb-in glass glass-big">
        {/* eslint-disable-next-line @next/next/no-img-element -- la elige casos.ts del srcset de cada captura */}
        <img alt="" id="lbImg" />
        <div className="lb-bar">
          <span id="lbCount">01 / 01</span>
          <span id="lbCap" aria-live="polite"></span>
          <span className="lb-btns">
            <button type="button" data-lb-prev aria-label="Anterior">
              ←
            </button>
            <button type="button" data-lb-next aria-label="Siguiente">
              →
            </button>
            <button type="button" data-lb-close aria-label="Cerrar">
              ✕
            </button>
          </span>
        </div>
      </div>
    </dialog>
  );
}

/** Página de un caso (sistema propio): presentación, problema, módulos, capturas y resultado. */
export function CasoPage({ c }: { c: Caso }) {
  const next = CASOS[NEXT[c.slug]];
  return (
    <main id="main" className="view">
      <section className="case-hero" aria-label={`Aspa ${c.name}`}>
        <div className="wrap">
          <p className="crumb2">
            <Link className="ul" href={ROUTES.casos}>
              Casos
            </Link>{" "}
            · Sistema propio
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
                El <em className="grad">problema</em>
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
                Los <em className="grad">módulos</em>
              </h2>
            </div>
          </div>
          <div className="mods">
            {c.mods.map(([t, d]) => (
              <article className="mod glass rv" key={t}>
                <h3>{t}</h3>
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
                Cómo <em className="grad">se ve</em>
              </h2>
            </div>
          </div>
          <div className="shots">
            {c.shots.map((s, i) => (
              <Shot key={s.cap} img={s.img} cap={s.cap} first={i === 0} />
            ))}
          </div>
          {c.manga && <Manga />}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Resultado">
        <div className="wrap">
          <div className="result glass rv">
            <p className="lbl">Resultado</p>
            <p className="lead">{c.result}</p>
          </div>
        </div>
      </section>

      <section className="next-case" aria-label="Otro caso">
        <Link className="next glass" href={next.path}>
          <span className="lbl">Otro caso</span>
          <span className="next-t">
            Aspa {next.name} <span className="arrow">→</span>
          </span>
          <span className="next-img" aria-hidden="true">
            <Image src={next.cover} alt="" sizes="28vw" />
          </span>
        </Link>
      </section>

      <Cta question="¿Qué proceso de tu empresa te gustaría que se haga solo?" message="Hola Aspa, quiero automatizar un proceso" />

      <Lightbox />
      <JsonLd
        data={softwareSchema({
          name: `Aspa ${c.name}`,
          description: c.description,
          path: c.path,
          image: getImageProps({ src: c.cover, alt: "", width: 1200 }).props.src,
          features: c.mods.map(([t, d]) => `${t}: ${d}`),
        })}
      />
      <JsonLd
        data={breadcrumbs([
          { name: "Casos", path: ROUTES.casos },
          { name: `Aspa ${c.name}`, path: c.path },
        ])}
      />
      <PageFx page="caso" />
    </main>
  );
}
