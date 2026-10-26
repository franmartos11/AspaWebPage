import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/site";
import { PLANS } from "@/lib/webs";
import { interiorDepto, interiorLiving, type Web } from "@/lib/rubros";
import obliqua from "@/assets/work/obliqua.jpg";
import cocina from "@/assets/rubros/interior-cocina-living.jpg";
import dormitorio from "@/assets/rubros/interior-dormitorio.jpg";
import steel0 from "@/assets/rubros/steel-0.jpg";
import steel1 from "@/assets/rubros/steel-1.jpg";
import stageAisl from "@/assets/rubros/stage-aisl.jpg";
import stageOsb from "@/assets/rubros/stage-osb.jpg";
import stageTerm from "@/assets/rubros/stage-term.jpg";
import fbTower from "@/assets/rubros/fb-tower.jpg";
import a360Unidad from "@/assets/rubros/architecture360-unidad.jpg";
import a360Galeria from "@/assets/rubros/architecture360-galeria.jpg";
import a360Amenities from "@/assets/rubros/architecture360-amenities.jpg";

// Piezas de las páginas por rubro (portadas de los helpers del diseño: bw, phone, demoHTML,
// NOGAL, BOCETO, TRAMA, DEVDEMO, iconFor, miniPrices).

const BW_SIZES = "(max-width: 980px) calc(100vw - 48px), 900px";

/** Captura dentro de una ventana de navegador. Las capturas chicas no se estiran (como en el diseño). */
export function Bw({ url, img, alt = "", sizes = BW_SIZES, priority }: { url?: string; img: StaticImageData; alt?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className="bw" style={img.width < 900 ? { maxWidth: Math.round(img.width * 1.25) } : undefined}>
      <div className="bw-top" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
        <span>{url || "diseño de ejemplo"}</span>
      </div>
      <Image src={img} alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}

export function Phone({ img }: { img: StaticImageData }) {
  return (
    <div className="phone" aria-hidden="true">
      <div className="scr">
        <Image src={img} alt="" sizes="260px" />
      </div>
    </div>
  );
}

const Real = () => <span className="ej-tag real">Cliente real</span>;

/** Una web hecha, con captura de escritorio y de celular. */
export function Demo({ w, rev }: { w: Web; rev?: boolean }) {
  return (
    <article className={rev ? "demo rev" : "demo"}>
      <div className="stagef rv">
        <Bw url={w.url} img={w.d} alt={`Captura de la web de ${w.name}`} />
        {w.m && <Phone img={w.m} />}
      </div>
      <div className="txt">
        <h3>{w.name}</h3>
        {w.url && <span className="url">{w.url}</span>}
        <p className="mut">
          {w.tipo}. {w.txt}
        </p>
        <p>{w.real && <Real />}</p>
        {w.url && (
          <a className="btn btn-ghost" href={`https://${w.url}`} target="_blank" rel="noopener">
            Mirala en vivo{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        )}
      </div>
    </article>
  );
}

/** Interiorismo: maqueta de ejemplo "Nogal". */
export function Nogal() {
  const fig = (img: StaticImageData, cap: string) => (
    <figure>
      <div className="ph">
        <Image src={img} alt="" sizes="300px" />
      </div>
      <figcaption>{cap}</figcaption>
    </figure>
  );
  return (
    <div className="mock rv">
      <div className="bw">
        <div className="bw-top" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
          <span>nogal · diseño de ejemplo</span>
        </div>
        <div className="nogal-nav">
          <b>Nogal</b>
          <span>Proyectos · Proceso · Presupuesto</span>
        </div>
        <div className="ng">
          <div className="ng-hero">
            <Image src={interiorDepto} alt="Departamento con vista a la ciudad" sizes={BW_SIZES} />
            {/* título de la web de ejemplo, no de la página: párrafo (en el diseño era un h4 y rompía el orden de títulos) */}
            <p className="ng-t">Departamento con vista</p>
          </div>
          <div className="ng-grid">
            {fig(cocina, "Cocina integral")}
            {fig(dormitorio, "Dormitorio")}
            {fig(interiorLiving, "Living")}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Estudios: del boceto (wireframe) a la web terminada, con el comparador. */
export function Boceto() {
  return (
    <>
      <div className="sec-head" style={{ marginTop: "clamp(96px,10vw,150px)" }}>
        <h3 className="h3">
          Del boceto a la <em>web</em>
        </h3>
      </div>
      <div className="cmp" data-cmp style={{ "--hc": "#6E6CFF", "--hk": "#FFFFFF" } as React.CSSProperties}>
        <div className="pane" aria-hidden="true">
          <div className="wf">
            <div className="bar" style={{ left: "3%", top: "5%", width: "10%" }}></div>
            <div className="bar" style={{ right: "3%", top: "5%", width: "24%" }}></div>
            <div className="b x" style={{ left: "3%", right: "3%", top: "14%", bottom: "40%" }}></div>
            <div className="lbx" style={{ left: "44%", top: "26%" }}>
              Foto de obra
            </div>
            <div className="b" style={{ left: "3%", bottom: "14%", width: "46%", height: "20%" }}></div>
            <div className="lbx" style={{ left: "5%", bottom: "28%" }}>
              Título del estudio
            </div>
            <div className="bar" style={{ left: "3%", bottom: "8%", width: "20%" }}></div>
          </div>
        </div>
        <div className="pane p2" aria-hidden="true">
          <Image className="pane-img" src={obliqua} alt="" sizes="(max-width: 1148px) calc(100vw - 48px), 1100px" />
        </div>
        <div className="handle">
          <button className="knob" type="button" role="slider" aria-label="Comparar boceto y web terminada" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

/** Steel framing: maqueta "Trama" con la casa de la estructura a terminada (3D en lib/fx/trama). */
export function Trama() {
  const STEPS: [string, string][] = [
    ["0.19", "Estructura"],
    ["0.37", "Aislación"],
    ["0.57", "OSB"],
    ["0.71", "Terminación"],
    ["0.87", "Techo"],
    ["1", "Terminada"],
  ];
  return (
    <div className="mock" data-trama>
      <div className="bw">
        <div className="bw-top" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
          <span>trama · diseño de ejemplo</span>
        </div>
        <div className="trama">
          <div className="tr-nav">
            <b>trama</b>
            <span>El sistema · Modelos · Obras · Cotizar</span>
          </div>
          <div className="tr-stage m3d" id="trStage">
            <Image className="m3d-fb" src={steel0} alt="Casa en steel framing: estructura de perfiles" sizes={BW_SIZES} />
            {/* sin 3D: la casa terminada se descubre sobre la estructura con el deslizador (lib/fx/trama) */}
            <Image className="tr-end" src={steel1} alt="Casa en steel framing terminada" sizes={BW_SIZES} />
            <b className="tr-lbl" id="trLbl">
              Estructura de perfiles
            </b>
          </div>
          <div className="tr-ctl">
            <span>Estructura</span>
            <input type="range" id="trRange" min="0" max="100" defaultValue="0" aria-label="De la estructura a la casa terminada" />
            <span>Terminada</span>
          </div>
          <div className="tr-steps">
            {STEPS.map(([v, t]) => (
              <button type="button" data-v={v} key={v}>
                {t}
              </button>
            ))}
          </div>
          <div className="obras">
            {(
              [
                [stageAisl, "Estructura"],
                [stageOsb, "Placas OSB"],
                [stageTerm, "Terminada"],
              ] as const
            ).map(([img, cap]) => (
              <figure key={cap}>
                <div className="ph">
                  <Image src={img} alt="" sizes="300px" />
                </div>
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desarrollistas: torre 3D con unidades y la sala de ventas interactiva (comportamiento en lib/fx/devdemo). */
export function DevDemo() {
  const caps = [a360Unidad, a360Galeria, a360Amenities];
  return (
    <div data-devdemo>
      <div className="tower-wrap">
        <div className="tw-txt">
          <h3 className="h3">El edificio, piso por piso</h3>
          <p className="mut">Tocá una unidad para ver su ficha. Las cálidas están disponibles, las ámbar reservadas y las oscuras vendidas.</p>
          <div className="unit-card" id="unitCard" aria-live="polite">
            <b>Elegí una unidad</b>
          </div>
        </div>
        <div className="m3d tower-3d" aria-hidden="true">
          <Image className="m3d-fb" src={fbTower} alt="" sizes="(max-width: 980px) 100vw, 60vw" />
          <div className="tw-tip" id="twTip" hidden></div>
        </div>
      </div>
      <div className="bento-wrap">
        <div className="sec-head">
          <div>
            <h3 className="h3">La sala de ventas, interactiva</h3>
          </div>
        </div>
        <div className="bento">
          <div className="tile glass t-mp">
            <p className="cap">
              <span>Masterplan interactivo</span>
              <span>Tocá un lote</span>
            </p>
            <div className="mp-wrap">
              <svg className="mp-svg" id="mp" viewBox="0 0 520 340" role="group" aria-label="Masterplan con lotes"></svg>
              <div className="mp-info" id="mpInfo" aria-live="polite"></div>
            </div>
            <div className="leg">
              <span>
                <i style={{ background: "#E07A52" }}></i>Disponible
              </span>
              <span>
                <i style={{ background: "#8b7d6b" }}></i>Reservado
              </span>
              <span>
                <i style={{ background: "#3a3631", outline: "1px solid rgba(237,230,218,.25)" }}></i>Vendido
              </span>
            </div>
          </div>
          <div className="tile glass t-tour">
            <p className="cap">
              <span>Tour 360°</span>
              <span>Arrastrá</span>
            </p>
            {/* en el diseño la imagen del tour no cargaba (la clave "interior" no tenía archivo) */}
            <div className="tour" id="tour" role="img" aria-label="Vista 360 del living, arrastrable">
              <div className="pano" id="pano">
                {[0, 1, 2].map((k) => (
                  <Image key={k} src={interiorDepto} alt="" sizes="800px" />
                ))}
              </div>
              <span className="hud">Living · Unidad 4B</span>
              <span className="deg" id="deg">
                0°
              </span>
            </div>
          </div>
          <div className="tile glass t-cot cot">
            <p className="cap">
              <span>Cotizador de cuotas</span>
              <span id="cotUnit">Lote 07</span>
            </p>
            <div className="rowv">
              <label htmlFor="ant">Anticipo</label>
              <span className="cap" id="antV">
                30 %
              </span>
            </div>
            <input type="range" id="ant" min="10" max="60" step="5" defaultValue="30" />
            <span className="lbl-c" id="cuotasLbl">
              Cuotas
            </span>
            <div className="seg" id="seg" role="group" aria-labelledby="cuotasLbl">
              {[12, 24, 36, 48].map((n) => (
                <button type="button" aria-pressed={n === 24} key={n}>
                  {n}
                </button>
              ))}
            </div>
            <div className="res">
              <div>
                <small>Cuota mensual estimada</small>
                <br />
                <b id="cuota">USD 0</b>
              </div>
              <small id="precioU">Precio USD 0</small>
            </div>
          </div>
          <div className="tile glass t-uni">
            <p className="cap">
              <span>Unidades disponibles</span>
              <span id="uniCount"></span>
            </p>
            <div style={{ overflowX: "auto" }}>
              <table className="uni" id="uni">
                <thead>
                  <tr>
                    <th scope="col">Unidad</th>
                    <th scope="col">Sup.</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="tile glass t-bim">
            <p className="cap">
              <span>Modelo BIM</span>
              <span>Pasá el mouse o tocá</span>
            </p>
            <div className="bim" id="bim" role="img" aria-label="Modelo del edificio por pisos">
              <svg viewBox="0 0 360 240" id="bimSvg"></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="capstrip" style={{ marginTop: "clamp(96px,10vw,150px)" }}>
        {caps.map((img, i) => (
          <div className="rv" key={i}>
            <Bw url="architecture360.vercel.app/proyecto/demo" img={img} sizes="(max-width: 980px) calc(100vw - 48px), 420px" />
          </div>
        ))}
        <div className="rv" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <p className="mut" style={{ margin: 0 }}>
            Architecture 360: planta de la unidad, galería y amenities de un emprendimiento de ejemplo.
          </p>
          <a className="btn btn-ghost" style={{ alignSelf: "flex-start" }} href="https://architecture360.vercel.app/proyecto/demo" target="_blank" rel="noopener">
            Mirala en vivo{" "}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- íconos de "Qué incluye" (se eligen por palabras, como en el diseño) ---------- */
const ICONS = {
  img: '<rect x="6" y="10" width="36" height="28" rx="2"/><path d="M6 32l10-10 8 8 6-6 12 12"/><circle cx="33" cy="18" r="3"/>',
  grid: '<rect x="6" y="8" width="15" height="15"/><rect x="27" y="8" width="15" height="15"/><rect x="6" y="27" width="15" height="15"/><rect x="27" y="27" width="15" height="15"/>',
  team: '<circle cx="17" cy="17" r="6"/><path d="M6 38c0-7 5-11 11-11s11 4 11 11"/><circle cx="33" cy="15" r="5"/><path d="M30 26c7 0 12 4 12 11"/>',
  panel: '<rect x="6" y="8" width="36" height="32" rx="2"/><path d="M6 16h36M24 22v12M18 28h12"/>',
  globe: '<circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c5 5 7 11 7 17s-2 12-7 17M24 7c-5 5-7 11-7 17s2 12 7 17"/>',
  phone: '<rect x="14" y="5" width="20" height="38" rx="4"/><path d="M21 37h6"/>',
  house: '<path d="M8 40V18l16-10 16 10v22"/><path d="M8 40h32M20 40V28h8v12"/>',
  medal: '<circle cx="24" cy="18" r="10"/><path d="M18 26l-4 14 10-5 10 5-4-14"/>',
  chat: '<path d="M41 23a17 17 0 0 1-25 15L7 41l3-9A17 17 0 1 1 41 23z"/><path d="M18 19c0 6 5 11 11 11"/>',
  search: '<circle cx="21" cy="21" r="12"/><path d="M30 30l11 11"/>',
  steps: '<path d="M6 40h9v-9h9v-9h9v-9h9"/>',
  form: '<rect x="9" y="6" width="30" height="36" rx="2"/><path d="M15 15h18M15 22h18M15 29h10"/>',
  split: '<rect x="6" y="10" width="36" height="28" rx="2"/><path d="M24 6v36M19 24h-6M35 24h-6"/>',
  calc: '<rect x="10" y="5" width="28" height="38" rx="3"/><path d="M16 12h16v7H16zM16 26h2M23 26h2M30 26h2M16 33h2M23 33h2M30 33h2"/>',
  pin: '<path d="M24 43s13-12 13-23a13 13 0 0 0-26 0c0 11 13 23 13 23z"/><circle cx="24" cy="20" r="5"/>',
  cube: '<path d="M24 5l16 9v20l-16 9-16-9V14z"/><path d="M8 14l16 9 16-9M24 23v20"/>',
  quote: '<path d="M10 30c0-8 4-13 10-14M26 30c0-8 4-13 10-14"/><rect x="8" y="28" width="12" height="12" rx="2"/><rect x="24" y="28" width="12" height="12" rx="2"/>',
  chart: '<path d="M8 40V8M8 40h32"/><path d="M14 32l8-10 7 6 11-14"/>',
  ask: '<circle cx="24" cy="24" r="17"/><path d="M19 19a5 5 0 1 1 7 5c-2 1-2 2-2 4M24 33v1"/>',
  frame: '<rect x="6" y="8" width="36" height="32" rx="2"/><rect x="11" y="13" width="26" height="22"/>',
  star: '<path d="M24 6l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z"/>',
  plan: '<rect x="6" y="6" width="36" height="36"/><path d="M6 22h16V6M22 22v20M30 22h12"/>',
  cal: '<rect x="6" y="9" width="36" height="32" rx="2"/><path d="M6 18h36M15 5v8M33 5v8"/>',
};
const ICON_WORDS: [string, keyof typeof ICONS][] = [
  ["antes", "split"],
  ["deslizador", "split"],
  ["galer", "img"],
  ["casas term", "img"],
  ["portada", "frame"],
  ["render", "frame"],
  ["equipo", "team"],
  ["testimon", "quote"],
  ["panel", "panel"],
  ["idioma", "globe"],
  ["celular", "phone"],
  ["whatsapp", "chat"],
  ["consultas", "chat"],
  ["dominio", "search"],
  ["google", "search"],
  ["pasos", "steps"],
  ["proceso", "steps"],
  ["etapas", "steps"],
  ["formulario", "form"],
  ["cotizador", "calc"],
  ["ubicación", "pin"],
  ["360", "cube"],
  ["amenities", "star"],
  ["premios", "medal"],
  ["números", "chart"],
  ["preguntas", "ask"],
  ["sistema explicado", "ask"],
  ["modelos", "plan"],
  ["unidades", "plan"],
  ["masterplan", "plan"],
  ["tipos", "grid"],
  ["por tipo", "grid"],
  ["servicios", "house"],
  ["inicio", "house"],
  ["agendar", "cal"],
];
export function IncIcon({ text }: { text: string }) {
  const t = text.toLowerCase();
  const k = ICON_WORDS.find(([w]) => t.includes(w))?.[1] ?? "frame";
  return <svg viewBox="0 0 48 48" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[k] }} />;
}

/** Bloque "Inversión": precios de los planes (o cotización a medida). */
export function PriceBlock({ pay, custom, wa }: { pay: string; custom?: React.ReactNode; wa: string }) {
  return (
    <div className="price-blk glass glass-big rv">
      <div>
        <p className="lbl">Inversión</p>
        <p className="pay-s">{pay}</p>
      </div>
      <div>
        {custom ? (
          <>
            <h3 className="h3" style={{ maxWidth: "20ch" }}>
              {custom}
            </h3>
            <p style={{ marginTop: 24 }}>
              <a className="btn btn-glass btn-blue" href={wa} target="_blank" rel="noopener">
                <span>Consultanos</span>
              </a>
            </p>
          </>
        ) : (
          <>
            <div className="mini-prices">
              <div className="mini">
                <span>
                  {PLANS.landing.name} · {PLANS.landing.days} días
                </span>
                <b>USD {PLANS.landing.usd}</b>
              </div>
              <div className="mini">
                <span>
                  {PLANS.sitio.name} · {PLANS.sitio.days} días
                </span>
                <b>USD {PLANS.sitio.usd}</b>
              </div>
            </div>
            <p style={{ marginTop: 24 }}>
              <Link className="more" href={ROUTES.planes}>
                Ver planes{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
