import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { Clients, Nums } from "@/components/Proof";
import { JsonLd } from "@/components/JsonLd";
import { homeServicesSchema } from "@/lib/schema";
import { ROUTES } from "@/lib/site";
import alero from "@/assets/work/alero.jpg";
import architecture360 from "@/assets/work/architecture-360.jpg";
import avatarCampo from "@/assets/work/avatar-campo.jpg";
import scoutClientes from "@/assets/work/aspa-scout-clientes.jpg";
import scoutTareas from "@/assets/work/aspa-scout-tareas.jpg";
import rodeo from "@/assets/work/aspa-rodeo.jpg";
import dh from "@/assets/work/dh-engineering.jpg";
import notebookRodeo from "@/assets/work/notebook-aspa-rodeo.jpg";
import obliqua from "@/assets/work/obliqua.jpg";
import paulaGil from "@/assets/work/paula-gil.jpg";
import "@/styles/hgal.css";
import "@/styles/proof.css";
import "./home.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SERVICES = [
  {
    title: "Sistemas de gestión a medida",
    text: "Stock, ventas, clientes, turnos y órdenes de trabajo, en un solo lugar y al día.",
    href: ROUTES.sistemas,
    cta: "Ver sistemas",
  },
  { title: "Apps para celular", text: "iOS y Android, para tu equipo en la calle o para tus clientes.", href: `${ROUTES.sistemas}#apps`, cta: "Ver apps" },
  {
    title: "Automatizaciones e integraciones",
    text: "Las tareas que hoy hace alguien a mano, hechas solas: avisos, cargas, reportes.",
    href: `${ROUTES.sistemas}#automatizaciones`,
    cta: "Ver automatizaciones",
  },
  {
    title: "Webs para empresas y profesionales",
    text: "Una web que muestra tu trabajo y convence antes de la primera reunión.",
    href: ROUTES.webs,
    cta: "Ver webs",
  },
];

type Work = { t: string; s: string; img: StaticImageData; alt: string; href: string; cta: string };
const WORKS: Work[] = [
  { t: "Aspa Rodeo", s: "Sistema · Campo", img: rodeo, alt: "Panel de Aspa Rodeo, sistema de gestión de hacienda", href: ROUTES.casoRodeo, cta: "Ver caso" },
  { t: "DH Engineering", s: "Web · Ingeniería", img: dh, alt: "Web de DH Engineering, empresa de ingeniería", href: ROUTES.rubro("constructoras"), cta: "Ver rubro" },
  { t: "Paula Gil", s: "Web · Arquitecta", img: paulaGil, alt: "Web de Paula Gil, arquitecta", href: ROUTES.rubro("arquitectos"), cta: "Ver rubro" },
  {
    t: "Architecture 360",
    s: "Web · Desarrollista",
    img: architecture360,
    alt: "Web de Architecture 360, proyecto inmobiliario",
    href: ROUTES.rubro("desarrollistas"),
    cta: "Ver rubro",
  },
  { t: "Obliqua", s: "Web · Estudio de arquitectura", img: obliqua, alt: "Web de Obliqua, estudio de arquitectura", href: ROUTES.rubro("estudios-de-arquitectura"), cta: "Ver rubro" },
  { t: "Alero", s: "Web · Constructora de viviendas", img: alero, alt: "Web de Alero, constructora de viviendas", href: ROUTES.rubro("constructoras-de-vivienda"), cta: "Ver rubro" },
];

const FALLBACK_CARDS = [
  { t: "Aspa Rodeo", s: "Sistema de gestión de hacienda", img: rodeo },
  { t: "Aspa Scout", s: "Gestión comercial", img: scoutClientes },
  { t: "DH Engineering", s: "Sitio para constructora", img: dh },
  { t: "Architecture 360", s: "Web para desarrollista", img: architecture360 },
];

const STAGE_SIZES = "(max-width: 980px) calc(100vw - 44px), 58vw";

export default function Home() {
  return (
    <main id="main" className="view">
      {/* React lleva estos <link> al <head>: la imagen del hero se pide antes que el resto */}
      <link rel="preload" as="image" href="/3d/poster-mobile.webp" media="(max-aspect-ratio: 1/1)" fetchPriority="high" />
      <link rel="preload" as="image" href="/3d/poster-desktop.webp" media="(min-aspect-ratio: 1/1)" fetchPriority="high" />
      {/* ---------- hero: la notebook que se abre ---------- */}
      <section className="nb" id="nbHero" aria-labelledby="hero-title">
        <div className="nb-stage">
          <div className="m3d nb-3d" data-m3d="notebook" aria-hidden="true">
            <picture className="nb-poster">
              <source media="(max-aspect-ratio: 1/1)" srcSet="/3d/poster-mobile.webp" />
              {/* pesa 3-24 KB y es lo más grande que se ve al cargar: va con prioridad alta */}
              <img src="/3d/poster-desktop.webp" alt="" fetchPriority="high" />
            </picture>
          </div>
          <div className="wrap nb-txt" id="nbTxt">
            <CharTitle id="hero-title" parts={["Construimos el software que tu empresa ", { em: "necesita." }]} />
          </div>
          <div className="wrap nb-sub" id="nbSub">
            <p className="lead r-late">Sistemas a medida, apps y webs para empresas que quieren trabajar mejor y mostrarse mejor.</p>
            <div className="btns r-late">
              <Link className="btn btn-glass btn-blue" href={ROUTES.sistemas}>
                <span>Sistemas a medida</span>
              </Link>
              <Link className="btn btn-glass" href={ROUTES.webs}>
                <span>Webs para tu empresa</span>
              </Link>
            </div>
          </div>
          {/* leyenda del trabajo que se ve: decorativa (los trabajos están en la galería) */}
          <div className="nb-cap" id="nbTag" aria-hidden="true">
            <span className="ln nb-cap-k">
              <span>
                <b>01</b> / 04
              </span>
            </span>
            <span className="ln nb-cap-t">
              <span>Aspa Rodeo</span>
            </span>
            <span className="ln nb-cap-s">
              <span>Sistema de gestión de hacienda</span>
            </span>
            <span className="nb-cap-bar" id="nbMarks">
              <i>
                <s />
              </i>
              <i>
                <s />
              </i>
              <i>
                <s />
              </i>
              <i>
                <s />
              </i>
            </span>
          </div>
          <div className="nb-fb">
            <div className="nb-fb-img">
              <Image src={notebookRodeo} alt="Notebook abierta con Aspa Rodeo" sizes="(max-width: 1148px) calc(100vw - 48px), 1100px" />
            </div>
            <div className="nb-car">
              {FALLBACK_CARDS.map((c) => (
                <div className="nb-card glass" key={c.t}>
                  <Image src={c.img} alt={c.t} sizes="300px" />
                  <b>{c.t}</b>
                  <span>{c.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- servicios: acordeón con escenario ---------- */}
      <section className="section" id="que" aria-labelledby="que-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="que-title" data-lines>
                Cuatro formas de hacer que tu empresa <em className="grad">ande mejor</em>
              </h2>
            </div>
          </div>
          <div className="tabs" data-tabs>
            <div className="tabs-list">
              {SERVICES.map((s, k) => (
                <div className={k === 0 ? "tab on" : "tab"} key={s.title}>
                  <h3 className="tl">
                    <button type="button" id={`svc-b-${k}`} aria-expanded={k === 0} aria-controls={`svc-p-${k}`}>
                      <b>{s.title}</b>
                      <i className="plus" aria-hidden="true"></i>
                    </button>
                  </h3>
                  <span className="tbar" aria-hidden="true">
                    <i></i>
                  </span>
                  <div className="tbody" id={`svc-p-${k}`} role="region" aria-labelledby={`svc-b-${k}`}>
                    <div>
                      <p className="mut">{s.text}</p>
                      <Link className="ul" href={s.href}>
                        {s.cta} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tabs-stage">
              <div className="stories" aria-hidden="true">
                <i>
                  <s />
                </i>
                <i>
                  <s />
                </i>
                <i>
                  <s />
                </i>
                <i>
                  <s />
                </i>
              </div>
              <div className="tst on top">
                <Image src={rodeo} alt="Panel de inicio de Aspa Rodeo, datos de ejemplo" sizes={STAGE_SIZES} />
              </div>
              <div className="tst">
                <div className="tst-phone">
                  <div className="phone">
                    <div className="scr manga-scr mhome" role="img" aria-label="App de Aspa Rodeo en el celular, datos de ejemplo">
                      <div className="mh-top" aria-hidden="true">
                        <span className="mh-logo">
                          ASPA <small>RODEO</small>
                        </span>
                        <i className="mh-av">
                          <Image src={avatarCampo} alt="" sizes="24px" />
                        </i>
                      </div>
                      <b className="mh-hi" aria-hidden="true">
                        Buen día, Martín
                      </b>
                      <div className="mh-alert" aria-hidden="true">
                        <span className="mh-dot"></span>
                        <div>
                          <b>Vacuna vencida</b>
                          <small>Lote L-07 · 248 terneros</small>
                        </div>
                      </div>
                      <div className="mh-kpis" aria-hidden="true">
                        <div>
                          <small>Cabezas</small>
                          <b>1.284</b>
                        </div>
                        <div>
                          <small>Kg prom.</small>
                          <b>386</b>
                        </div>
                      </div>
                      <div className="mh-alert w" aria-hidden="true">
                        <span className="mh-dot"></span>
                        <div>
                          <b>Pesada pendiente</b>
                          <small>Lote L-11 · hace 32 días</small>
                        </div>
                      </div>
                      <div className="m-btn" aria-hidden="true">
                        Ver alertas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tst">
                <Image src={scoutTareas} alt="Aspa Scout, tareas del equipo comercial" sizes={STAGE_SIZES} />
              </div>
              <div className="tst">
                <Image src={paulaGil} alt="Web de Paula Gil Arquitectura" sizes={STAGE_SIZES} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- trabajos: galería horizontal guiada por el scroll ---------- */}
      <section className="hgal native" data-hgal aria-labelledby="work-title">
        <div className="hgal-stage">
          <div className="wrap hgal-head">
            <div>
              <h2 className="h2" id="work-title" data-lines>
                Sistemas y webs que ya <em className="grad">están andando</em>
              </h2>
            </div>
          </div>
          <ul className="hgal-track" id="workTrack">
            {WORKS.map((w) => (
              <li key={w.t}>
                <Link className="hcard" href={w.href}>
                  <div className="hc-img">
                    <Image src={w.img} alt={w.alt} sizes="(max-width: 980px) 78vw, (max-width: 1530px) 34vw, 520px" />
                  </div>
                  <div className="hc-meta">
                    <h3>{w.t}</h3>
                    <span className="sr-only">{w.s}</span>
                  </div>
                  <span className="hc-pill glass" aria-hidden="true">
                    {w.cta} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="wrap">
            <div className="hgal-bar" aria-hidden="true">
              <i></i>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- números ---------- */}
      <section className="section" aria-labelledby="nums-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nums-title" data-lines>
                Nuestro recorrido, <em className="grad">en números</em>
              </h2>
            </div>
          </div>
          <Nums />
        </div>
      </section>

      {/* ---------- clientes ---------- */}
      <Clients id="clients-title" title="Trabajaron con nosotros" dur="48s" mq="mq mq1" />

      <Cta question="¿Tenés un proceso que se hace a mano, una planilla que ya no da más o una web que no te representa?" message="Hola Aspa, quiero contarles un proyecto" />

      <JsonLd data={homeServicesSchema} />
      <PageFx page="home" />
    </main>
  );
}
