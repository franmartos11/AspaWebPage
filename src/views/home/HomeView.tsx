import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { PageFx } from "@/components/Fx";
import { Clients, Nums } from "@/components/Proof";
import { JsonLd } from "@/components/JsonLd";
import { WorkGallery } from "@/components/WorkGallery";
import { LOCALE, routes, type Lang } from "@/i18n";
import { homeServicesSchema } from "@/lib/schema";
import { GALLERY } from "@/lib/webs";
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
import "@/styles/proof.css";
import "./home.css";

/** Metadata del Home: el título y la descripción vienen del layout raíz de cada idioma. */
export function homeMeta(lang: Lang): Metadata {
  const r = { es: routes("es").home, en: routes("en").home };
  return {
    alternates: {
      canonical: r[lang],
      languages: { [LOCALE.es.hreflang]: r.es, [LOCALE.en.hreflang]: r.en, "x-default": r.es },
    },
  };
}

type Service = { title: string; text: string; hash: "" | "#apps" | "#automatizaciones"; to: "sistemas" | "webs"; cta: string };
type Work = { t: string; s: string; img: StaticImageData; alt: string };

const T = {
  es: {
    heroTitle: ["Construimos el software que tu empresa ", { em: "necesita." }],
    heroLead: "Sistemas a medida, apps y webs para empresas que quieren trabajar mejor y mostrarse mejor.",
    heroBtnSys: "Sistemas a medida",
    heroBtnWeb: "Webs para tu empresa",
    capFirst: "Gestión comercial",
    nbAlt: "Notebook abierta con Aspa Rodeo",
    fallback: ["Gestión comercial", "Sitio para constructora", "Sistema de gestión de hacienda", "Web para desarrollista"],
    queTitle: ["Cuatro formas de hacer que tu empresa ", "ande mejor"],
    services: [
      {
        title: "Sistemas de gestión a medida",
        text: "Stock, ventas, clientes, turnos y órdenes de trabajo, en un solo lugar y al día.",
        to: "sistemas",
        hash: "",
        cta: "Ver sistemas",
      },
      {
        title: "Apps para celular",
        text: "iOS y Android, para tu equipo en la calle o para tus clientes.",
        to: "sistemas",
        hash: "#apps",
        cta: "Ver apps",
      },
      {
        title: "Automatizaciones e integraciones",
        text: "Las tareas que hoy hace alguien a mano, hechas solas: avisos, cargas, reportes.",
        to: "sistemas",
        hash: "#automatizaciones",
        cta: "Ver automatizaciones",
      },
      {
        title: "Webs para empresas y profesionales",
        text: "Una web que muestra tu trabajo y convence antes de la primera reunión.",
        to: "webs",
        hash: "",
        cta: "Ver webs",
      },
    ] as Service[],
    stageRodeoAlt: "Panel de inicio de Aspa Rodeo, datos de ejemplo",
    phoneLabel: "App de Aspa Rodeo en el celular, datos de ejemplo",
    phone: {
      hi: "Buen día, Martín",
      a1: "Vacuna vencida",
      a1s: "Lote L-07 · 248 terneros",
      k1: "Cabezas",
      k1v: "1.284",
      k2: "Kg prom.",
      a2: "Pesada pendiente",
      a2s: "Lote L-11 · hace 32 días",
      btn: "Ver alertas",
    },
    stageScoutAlt: "Aspa Scout, tareas del equipo comercial",
    stagePaulaAlt: "Web de Paula Gil Arquitectura",
    workTitle: ["Sistemas y webs que ya ", "están andando"],
    works: [
      { t: "Aspa Rodeo", s: "Sistema · Campo", img: rodeo, alt: "Panel de Aspa Rodeo, sistema de gestión de hacienda" },
      {
        t: "DH Engineering",
        s: "Web · Ingeniería",
        img: dh,
        alt: "Web de DH Engineering, empresa de ingeniería",
      },
      { t: "Paula Gil", s: "Web · Arquitecta", img: paulaGil, alt: "Web de Paula Gil, arquitecta" },
      {
        t: "Architecture 360",
        s: "Web · Desarrollista",
        img: architecture360,
        alt: "Web de Architecture 360, proyecto inmobiliario",
      },
      {
        t: "Obliqua",
        s: "Web · Estudio de arquitectura",
        img: obliqua,
        alt: "Web de Obliqua, estudio de arquitectura",
      },
      {
        t: "Alero",
        s: "Web · Constructora de viviendas",
        img: alero,
        alt: "Web de Alero, constructora de viviendas",
      },
    ] as Work[],
    numsTitle: ["Nuestro recorrido, ", "en números"],
    clients: "Trabajaron con nosotros",
    ctaQ: "¿Tenés un proceso que se hace a mano, una planilla que ya no da más o una web que no te representa?",
    ctaMsg: "Hola Aspa, quiero contarles un proyecto",
  },
  en: {
    heroTitle: ["We build the software your business ", { em: "needs." }],
    heroLead: "Custom systems, apps and websites for companies that want to work smarter and look their best.",
    heroBtnSys: "Custom software",
    heroBtnWeb: "Business websites",
    capFirst: "Sales management",
    nbAlt: "Open laptop showing Aspa Rodeo",
    fallback: ["Sales management", "Construction company website", "Livestock management system", "Real estate developer website"],
    queTitle: ["Four ways to make your business ", "run better"],
    services: [
      {
        title: "Custom management systems",
        text: "Inventory, sales, customers, bookings and work orders, all in one place and always up to date.",
        to: "sistemas",
        hash: "",
        cta: "Explore systems",
      },
      {
        title: "Mobile apps",
        text: "iOS and Android, for your team in the field or for your customers.",
        to: "sistemas",
        hash: "#apps",
        cta: "Explore apps",
      },
      {
        title: "Automation and integrations",
        text: "The tasks someone does by hand today, done automatically: alerts, data entry, reports.",
        to: "sistemas",
        hash: "#automatizaciones",
        cta: "Explore automation",
      },
      {
        title: "Websites for companies and professionals",
        text: "A website that showcases your work and wins clients over before the first meeting.",
        to: "webs",
        hash: "",
        cta: "Explore websites",
      },
    ] as Service[],
    stageRodeoAlt: "Aspa Rodeo home dashboard, sample data",
    phoneLabel: "Aspa Rodeo mobile app, sample data",
    phone: {
      hi: "Good morning, Martín",
      a1: "Vaccine overdue",
      a1s: "Lot L-07 · 248 calves",
      k1: "Head",
      k1v: "1,284",
      k2: "Avg. kg",
      a2: "Weigh-in due",
      a2s: "Lot L-11 · 32 days ago",
      btn: "View alerts",
    },
    stageScoutAlt: "Aspa Scout, sales team tasks",
    stagePaulaAlt: "Paula Gil Arquitectura website",
    workTitle: ["Systems and websites already ", "up and running"],
    works: [
      { t: "Aspa Rodeo", s: "System · Agriculture", img: rodeo, alt: "Aspa Rodeo dashboard, livestock management system" },
      {
        t: "DH Engineering",
        s: "Website · Engineering",
        img: dh,
        alt: "DH Engineering website, engineering firm",
      },
      { t: "Paula Gil", s: "Website · Architect", img: paulaGil, alt: "Paula Gil website, architect" },
      {
        t: "Architecture 360",
        s: "Website · Real estate developer",
        img: architecture360,
        alt: "Architecture 360 website, real estate project",
      },
      {
        t: "Obliqua",
        s: "Website · Architecture studio",
        img: obliqua,
        alt: "Obliqua website, architecture studio",
      },
      {
        t: "Alero",
        s: "Website · Home builder",
        img: alero,
        alt: "Alero website, home builder",
      },
    ] as Work[],
    numsTitle: ["Our track record, ", "by the numbers"],
    clients: "Companies we've worked with",
    ctaQ: "Got a process still done by hand, a spreadsheet that can't keep up, or a website that doesn't represent you?",
    ctaMsg: "Hi Aspa, I'd like to tell you about a project",
  },
} as const;

const FALLBACK_IMGS = [
  { t: "Aspa Scout", img: scoutClientes },
  { t: "DH Engineering", img: dh },
  { t: "Aspa Rodeo", img: rodeo },
  { t: "Architecture 360", img: architecture360 },
];

const STAGE_SIZES = "(max-width: 980px) calc(100vw - 44px), 58vw";

export function HomeView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const r = routes(lang);
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
            <CharTitle id="hero-title" parts={[...t.heroTitle]} />
          </div>
          <div className="wrap nb-sub" id="nbSub">
            <p className="lead r-late">{t.heroLead}</p>
            <div className="btns r-late">
              <Link className="btn btn-glass btn-blue" href={r.sistemas}>
                <span>{t.heroBtnSys}</span>
              </Link>
              <Link className="btn btn-glass" href={r.webs}>
                <span>{t.heroBtnWeb}</span>
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
              <span>Aspa Scout</span>
            </span>
            <span className="ln nb-cap-s">
              <span>{t.capFirst}</span>
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
              <Image src={notebookRodeo} alt={t.nbAlt} sizes="(max-width: 1148px) calc(100vw - 48px), 1100px" />
            </div>
            <div className="nb-car">
              {FALLBACK_IMGS.map((c, k) => (
                <div className="nb-card glass" key={c.t}>
                  <Image src={c.img} alt={c.t} sizes="300px" />
                  <b>{c.t}</b>
                  <span>{t.fallback[k]}</span>
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
                {t.queTitle[0]}
                <em className="grad">{t.queTitle[1]}</em>
              </h2>
            </div>
          </div>
          <div className="tabs" data-tabs>
            <div className="tabs-list">
              {t.services.map((s, k) => (
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
                      <Link className="ul" href={`${r[s.to]}${s.hash}`}>
                        {s.cta} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tabs-stage">
              <div className="tst on top">
                <Image src={rodeo} alt={t.stageRodeoAlt} sizes={STAGE_SIZES} />
              </div>
              <div className="tst">
                <div className="tst-phone">
                  <div className="phone">
                    <div className="scr manga-scr mhome" role="img" aria-label={t.phoneLabel}>
                      <div className="mh-top" aria-hidden="true">
                        <span className="mh-logo">
                          ASPA <small>RODEO</small>
                        </span>
                        <i className="mh-av">
                          <Image src={avatarCampo} alt="" sizes="24px" />
                        </i>
                      </div>
                      <b className="mh-hi" aria-hidden="true">
                        {t.phone.hi}
                      </b>
                      <div className="mh-alert" aria-hidden="true">
                        <span className="mh-dot"></span>
                        <div>
                          <b>{t.phone.a1}</b>
                          <small>{t.phone.a1s}</small>
                        </div>
                      </div>
                      <div className="mh-kpis" aria-hidden="true">
                        <div>
                          <small>{t.phone.k1}</small>
                          <b>{t.phone.k1v}</b>
                        </div>
                        <div>
                          <small>{t.phone.k2}</small>
                          <b>386</b>
                        </div>
                      </div>
                      <div className="mh-alert w" aria-hidden="true">
                        <span className="mh-dot"></span>
                        <div>
                          <b>{t.phone.a2}</b>
                          <small>{t.phone.a2s}</small>
                        </div>
                      </div>
                      <div className="m-btn" aria-hidden="true">
                        {t.phone.btn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tst">
                <Image src={scoutTareas} alt={t.stageScoutAlt} sizes={STAGE_SIZES} />
              </div>
              <div className="tst">
                <Image src={paulaGil} alt={t.stagePaulaAlt} sizes={STAGE_SIZES} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- trabajos: galería horizontal guiada por el scroll ---------- */}
      <WorkGallery
        lang={lang}
        id="work-title"
        trackId="workTrack"
        title={t.workTitle}
        works={t.works.map((w) => {
          const url = GALLERY.find((g) => g.name.es === w.t)?.url;
          return { name: w.t, tipo: w.s, img: w.img, alt: w.alt, url, href: url ? undefined : r.casoRodeo };
        })}
      />

      {/* ---------- números ---------- */}
      <section className="section" aria-labelledby="nums-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="nums-title" data-lines>
                {t.numsTitle[0]}
                <em className="grad">{t.numsTitle[1]}</em>
              </h2>
            </div>
          </div>
          <Nums lang={lang} />
        </div>
      </section>

      {/* ---------- clientes ---------- */}
      <Clients id="clients-title" title={t.clients} dur="48s" mq="mq mq1" />

      <Cta lang={lang} question={t.ctaQ} message={t.ctaMsg} />

      <JsonLd data={homeServicesSchema(lang)} />
      <PageFx page="home" />
    </main>
  );
}
