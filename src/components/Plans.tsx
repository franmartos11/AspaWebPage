import type { Lang } from "@/i18n";
import { waLink } from "@/lib/site";
import { plansIn } from "@/lib/webs";

const T = {
  es: {
    days: " días",
    landingReady: "hasta estar lista",
    landingPages: "con todo",
    works: "trabajos",
    landingIdeal: "Ideal para quien recién arranca o quiere su trabajo en un solo link.",
    landingWa: "Hola Aspa, me interesa la Landing",
    landingBtn: "Quiero la landing",
    rec: "Recomendado",
    sitioReady: "hasta estar listo",
    sitioPages: "páginas",
    sitioWorks: "trabajos + los que cargues",
    sitioIdeal: "Ideal para empresas con equipo, varias líneas de trabajo y mucho para mostrar.",
    sitioWa: "Hola Aspa, me interesa el Sitio completo",
    sitioBtn: "Quiero el sitio completo",
    maint: ["Mantenimiento USD ", " por mes."],
  },
  en: {
    days: " days",
    landingReady: "to go live",
    landingPages: "with everything",
    works: "projects",
    landingIdeal: "Ideal if you're just starting out or want your work in a single link.",
    landingWa: "Hi Aspa, I'm interested in the Landing page",
    landingBtn: "I want the landing page",
    rec: "Recommended",
    sitioReady: "to go live",
    sitioPages: "pages",
    sitioWorks: "projects + any you add",
    sitioIdeal: "Ideal for firms with a team, several lines of work and plenty to show.",
    sitioWa: "Hi Aspa, I'm interested in the Full website",
    sitioBtn: "I want the full website",
    maint: ["Maintenance: USD ", " per month."],
  },
};

/** Los dos planes de Webs (Landing y Sitio completo) con su botón de WhatsApp. */
export function Plans({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { landing, sitio, maintenanceUsd } = plansIn(lang);
  return (
    <>
      <div className="plans">
        <article className="plan glass rv">
          <h3>{landing.name}</h3>
          <div className="price">
            <small>USD</small>
            {landing.usd}
          </div>
          <ul className="specs">
            <li>
              <b>
                {landing.days}
                {t.days}
              </b>
              {t.landingReady}
            </li>
            <li>
              <b>{landing.pages}</b>
              {t.landingPages}
            </li>
            <li>
              <b>{landing.works}</b>
              {t.works}
            </li>
          </ul>
          <p className="ideal mut">{t.landingIdeal}</p>
          <a className="btn btn-glass" href={waLink(t.landingWa)} target="_blank" rel="noopener">
            <span>{t.landingBtn}</span>
          </a>
        </article>
        <article className="plan rec glass rv">
          <span className="badge">{t.rec}</span>
          <h3>{sitio.name}</h3>
          <div className="price">
            <small>USD</small>
            {sitio.usd}
          </div>
          <ul className="specs">
            <li>
              <b>
                {sitio.days}
                {t.days}
              </b>
              {t.sitioReady}
            </li>
            <li>
              <b>{sitio.pages}</b>
              {t.sitioPages}
            </li>
            <li>
              <b>{sitio.works}</b>
              {t.sitioWorks}
            </li>
          </ul>
          <p className="ideal mut">{t.sitioIdeal}</p>
          <a className="btn btn-glass btn-blue" href={waLink(t.sitioWa)} target="_blank" rel="noopener">
            <span>{t.sitioBtn}</span>
          </a>
        </article>
      </div>
      <p className="fine" style={{ marginTop: 20 }}>
        {t.maint[0]}
        {maintenanceUsd}
        {t.maint[1]}
      </p>
    </>
  );
}
