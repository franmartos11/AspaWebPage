import type { Metadata } from "next";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { Plans } from "@/components/Plans";
import { routes, type Lang } from "@/i18n";
import { breadcrumbs, plansSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { plansIn } from "@/lib/webs";
import "@/styles/faq.css";
import "@/styles/plans.css";
import "./planes.css";

function texts(lang: Lang) {
  const { landing, sitio, maintenanceUsd } = plansIn(lang);
  if (lang === "es")
    return {
      title: "Precios de páginas web: planes y comparación",
      description: `Cuánto cuesta una página web: Landing USD ${landing.usd} en ${landing.days} días y Sitio completo USD ${sitio.usd} en ${sitio.days} días, con dominio y hosting. Mantenimiento USD ${maintenanceUsd} por mes. Precio y plazo cerrados.`,
      h1: ["Planes y ", { em: "precios." }],
      lead: "Dos planes, con precio y plazo cerrados desde el principio.",
      two: "Los dos planes",
      what: ["Qué trae ", "cada plan"],
      cmp: "Comparación de planes",
      col: "Qué trae",
      yes: "Sí",
      no: "No",
      // qué trae cada plan: [característica, landing, sitio completo]
      rows: [
        ["Página propia por proyecto, con galería", false, true],
        ["Panel para cargar trabajos por tu cuenta", false, true],
        ["Sección de equipo", false, true],
        ["Testimonios de clientes", false, true],
        ["Dos idiomas", false, true],
        ["Dominio y hosting", true, true],
        ["Diseño pensado para el celular", true, true],
        ["Botón de WhatsApp", true, true],
        ["Aparición en Google", true, true],
      ] as [string, boolean, boolean][],
      perMonth: "/mes",
      maint: [
        "Mantenimiento.",
        " Tu web online con dominio propio y hosting, y hasta 2 cambios chicos por mes (una foto, un texto, un trabajo nuevo) sin pagar aparte.",
      ],
      fine: "Precios en USD o su equivalente en pesos.",
      dev: ["Desarrollistas:", " cotización a medida, según la cantidad de emprendimientos."],
      devLink: "Ver webs para desarrollistas",
      faqTitle: ["Antes de ", "empezar"],
      faq: [
        [
          "¿Qué les tengo que pasar para empezar?",
          "Fotos y textos de los trabajos que quieras mostrar. Con eso diseñamos la propuesta y te la mostramos antes de publicar.",
        ],
        ["¿Cuánto tardan?", `La Landing queda lista en ${landing.days} días y el Sitio completo en ${sitio.days} días.`],
        [
          "¿Puedo cargar trabajos nuevos yo?",
          "Sí, en el Sitio completo: incluye un panel para cargarlos por tu cuenta. En la Landing, los trabajos nuevos entran con los cambios del mantenimiento.",
        ],
        [
          "¿El dominio y el hosting están incluidos?",
          `Sí, en los dos planes. Con el mantenimiento de USD ${maintenanceUsd} por mes la web sigue online con dominio propio y hosting, y tenés hasta 2 cambios chicos por mes sin pagar aparte.`,
        ],
      ] as [string, string][],
      question: "¿Querés ver cómo quedaría tu web? Pasanos 3 trabajos y te mandamos una portada de ejemplo.",
      message: "Hola Aspa, quiero mi web",
      schema: "Páginas web: planes",
      landingDesc: `${landing.pages}, lista en ${landing.days} días.`,
      sitioDesc: `${sitio.pages} páginas, listo en ${sitio.days} días.`,
      crumbs: ["Webs", "Planes y precios"],
    };
  return {
    title: "Website pricing: plans and comparison",
    description: `How much a website costs: Landing page USD ${landing.usd} in ${landing.days} days and Full website USD ${sitio.usd} in ${sitio.days} days, with domain and hosting. Maintenance USD ${maintenanceUsd} per month. Fixed price and timeline.`,
    h1: ["Plans and ", { em: "pricing." }],
    lead: "Two plans, with a fixed price and timeline from day one.",
    two: "The two plans",
    what: ["What's in ", "each plan"],
    cmp: "Plan comparison",
    col: "What you get",
    yes: "Yes",
    no: "No",
    rows: [
      ["A page for each project, with a gallery", false, true],
      ["Dashboard to add projects on your own", false, true],
      ["Team section", false, true],
      ["Client testimonials", false, true],
      ["Two languages", false, true],
      ["Domain and hosting", true, true],
      ["Designed for mobile first", true, true],
      ["WhatsApp button", true, true],
      ["Shows up on Google", true, true],
    ] as [string, boolean, boolean][],
    perMonth: "/mo",
    maint: [
      "Maintenance.",
      " Your website stays online with your own domain and hosting, plus up to 2 small changes a month (a photo, some text, a new project) at no extra cost.",
    ],
    fine: "Prices in USD or the equivalent in Argentine pesos.",
    dev: ["Real estate developers:", " custom quote, based on the number of developments."],
    devLink: "See websites for developers",
    faqTitle: ["Before you ", "start"],
    faq: [
      [
        "What do I need to send you to get started?",
        "Photos and text for the projects you want to show. We use them to design the proposal and show it to you before anything goes live.",
      ],
      ["How long does it take?", `The Landing page is ready in ${landing.days} days and the Full website in ${sitio.days} days.`],
      [
        "Can I add new projects myself?",
        "Yes, with the Full website: it includes a dashboard to add them on your own. With the Landing page, new projects go in as part of the maintenance changes.",
      ],
      [
        "Are domain and hosting included?",
        `Yes, in both plans. With the USD ${maintenanceUsd} monthly maintenance your website stays online with its own domain and hosting, and you get up to 2 small changes a month at no extra cost.`,
      ],
    ] as [string, string][],
    question: "Want to see how your website could look? Send us 3 projects and we'll send you a sample homepage.",
    message: "Hi Aspa, I want my website",
    schema: "Website plans",
    landingDesc: `${landing.pages}, ready in ${landing.days} days.`,
    sitioDesc: `${sitio.pages} pages, ready in ${sitio.days} days.`,
    crumbs: ["Websites", "Pricing"],
  };
}
type Texts = ReturnType<typeof texts>;

export function planesMeta(lang: Lang): Metadata {
  const t = texts(lang);
  return pageMeta({ path: routes(lang).planes, title: t.title, description: t.description });
}

const Mark = ({ yes, t }: { yes: boolean; t: Texts }) =>
  yes ? (
    <td className="y">
      <span aria-hidden="true">✓</span>
      <span className="sr-only">{t.yes}</span>
    </td>
  ) : (
    <td className="no">
      <span aria-hidden="true">—</span>
      <span className="sr-only">{t.no}</span>
    </td>
  );

export function PlanesView({ lang }: { lang: Lang }) {
  const t = texts(lang),
    r$ = routes(lang),
    path = r$.planes;
  const { landing, sitio, maintenanceUsd } = plansIn(lang);
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="planes-title">
        <div className="wrap">
          <CharTitle id="planes-title" parts={[...t.h1]} />
          <p className="lead r-late">{t.lead}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="planes-dos">
        <div className="wrap">
          {/* las tarjetas de los planes son <h3>: el título de la sección solo para lectores de pantalla */}
          <h2 className="sr-only" id="planes-dos">
            {t.two}
          </h2>
          <Plans lang={lang} />
        </div>
      </section>

      <section className="section" aria-labelledby="planes-trae">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h2" id="planes-trae" data-lines>
                {t.what[0]}
                <em className="grad">{t.what[1]}</em>
              </h2>
            </div>
          </div>
          {/* en celular la tabla se desplaza de costado: se puede enfocar para moverla con el teclado */}
          <div className="ctbl-wrap glass glass-light" tabIndex={0} role="region" aria-label={t.cmp}>
            <table className="ctbl">
              <caption className="sr-only">{t.cmp}</caption>
              <thead>
                <tr>
                  <th scope="col">{t.col}</th>
                  <th scope="col">{landing.name}</th>
                  <th scope="col">{sitio.name}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map(([f, l, s]) => (
                  <tr key={f}>
                    <th scope="row">{f}</th>
                    <Mark yes={l} t={t} />
                    <Mark yes={s} t={t} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="maint glass" style={{ marginTop: "clamp(48px,5vw,72px)" }}>
            <div className="mp">
              <span className="usd">USD</span> {maintenanceUsd}
              <small>{t.perMonth}</small>
            </div>
            <p>
              <b>{t.maint[0]}</b>
              {t.maint[1]}
            </p>
          </div>
          <p className="fine" style={{ marginTop: 28 }}>
            {t.fine}
          </p>
          <div className="devnote">
            <p>
              <b>{t.dev[0]}</b>
              {t.dev[1]}
            </p>
            <Link className="more" href={r$.rubro("desarrollistas")}>
              {t.devLink}{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Faq
        id="planes-faq"
        title={
          <>
            {t.faqTitle[0]}
            <em className="grad">{t.faqTitle[1]}</em>
          </>
        }
        items={t.faq}
      />

      <Cta lang={lang} question={t.question} message={t.message} />

      <JsonLd
        data={plansSchema({
          name: t.schema,
          path,
          plans: [
            { name: landing.name, usd: landing.usd, description: t.landingDesc },
            { name: sitio.name, usd: sitio.usd, description: t.sitioDesc },
          ],
        })}
      />
      <JsonLd
        data={breadcrumbs([
          { name: t.crumbs[0], path: r$.webs },
          { name: t.crumbs[1], path },
        ])}
      />
      <PageFx page="planes" />
    </main>
  );
}
