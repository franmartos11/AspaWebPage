import type { Metadata } from "next";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { routes, type Lang } from "@/i18n";
import { HONEYPOT, LANG_FIELD, NEED_LABELS, NEEDS, STARTED } from "@/lib/contact";
import { breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { SITE, waLink } from "@/lib/site";
import "@/styles/seg.css";
import "./contacto.css";

const T = {
  es: {
    title: "Contacto: contanos qué necesitás",
    description: `Contanos qué necesitás: sistema, app, web o automatización. Te respondemos en menos de 24 h hábiles. ${SITE.address.street}, ${SITE.address.city}.`,
    h1: ["Contanos qué ", { em: "necesitás." }],
    lead: "Te respondemos en menos de 24 h hábiles.",
    section: "Formulario y canales de contacto",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    company: "Empresa",
    need: "¿Qué necesitás?",
    message: "Mensaje",
    hp: "No completar",
    send: "Enviar",
    privacy: ["Al enviar aceptás la", "política de privacidad"],
    address: "Dirección",
    wa: "Escribinos por WhatsApp",
    waMsg: "Hola Aspa",
    langs: "es",
    crumb: "Contacto",
  },
  en: {
    title: "Contact: tell us what you need",
    description: `Tell us what you need: a system, app, website or automation. We reply within 1 business day. ${SITE.address.street}, ${SITE.address.city}.`,
    h1: ["Tell us what you ", { em: "need." }],
    lead: "We reply within 1 business day.",
    section: "Contact form and channels",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    need: "What do you need?",
    message: "Message",
    hp: "Leave this empty",
    send: "Send",
    privacy: ["By sending, you accept our", "privacy policy"],
    address: "Address",
    wa: "Message us on WhatsApp",
    waMsg: "Hi Aspa",
    langs: ["en", "es"],
    crumb: "Contact",
  },
} as const;

export function contactoMeta(lang: Lang): Metadata {
  return pageMeta({ path: routes(lang).contacto, title: T[lang].title, description: T[lang].description });
}

const Ic = ({ children }: { children: React.ReactNode }) => (
  <span className="cc-ic" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </span>
);

const channels = (t: (typeof T)[Lang]) => [
  {
    label: t.address,
    value: `${SITE.address.street}, ${SITE.address.city}`,
    href: SITE.address.maps,
    ext: true,
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    ext: false,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    value: t.wa,
    href: waLink(t.waMsg),
    ext: true,
    icon: (
      <>
        <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6z" />
        <path d="M9.2 8.6c.3 2.6 2.4 4.9 5.2 5.5l1-1.2-1.6-.9-.7.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.7-.9-1.6z" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    value: "aspa-software",
    href: SITE.social.linkedin,
    ext: true,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2a2 2 0 0 1 4 0V16M11.5 10.5V16" />
      </>
    ),
  },
  {
    label: "Instagram",
    value: "@aspa.software",
    href: SITE.social.instagram,
    ext: true,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
      </>
    ),
  },
];

export function ContactoView({ lang }: { lang: Lang }) {
  const t = T[lang],
    r = routes(lang),
    path = r.contacto,
    labels = NEED_LABELS[lang];
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE.url}${path}#page`,
    url: `${SITE.url}${path}`,
    description: t.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@id": `${SITE.url}/#organization`,
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, areaServed: "AR", availableLanguage: t.langs },
    },
  };
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="contacto-title">
        <div className="wrap">
          <CharTitle id="contacto-title" parts={[...t.h1]} />
          <p className="lead r-late">{t.lead}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-label={t.section}>
        <div className="wrap grid cgrid2">
          {/* sin JavaScript se envía igual (el endpoint responde con una página); con JS, contacto.ts lo manda por fetch */}
          <form className="cform glass glass-big" id="cform" action="/api/contacto" method="post" noValidate aria-describedby="fmsg">
            <div className="fl">
              <input id="f-n" name="nombre" placeholder=" " required maxLength={100} autoComplete="name" />
              <label htmlFor="f-n">{t.name}</label>
            </div>
            <div className="fl">
              <input id="f-e" name="email" type="email" placeholder=" " required maxLength={200} autoComplete="email" />
              <label htmlFor="f-e">{t.email}</label>
            </div>
            <div className="fl">
              <input id="f-t" name="telefono" type="tel" placeholder=" " maxLength={40} autoComplete="tel" />
              <label htmlFor="f-t">{t.phone}</label>
            </div>
            <div className="fl">
              <input id="f-c" name="empresa" placeholder=" " maxLength={120} autoComplete="organization" />
              <label htmlFor="f-c">{t.company}</label>
            </div>
            <fieldset className="fl-seg">
              <legend className="lbl">{t.need}</legend>
              <div className="seg glass" data-seg="need">
                <span className="seg-drop" aria-hidden="true"></span>
                {NEEDS.map((n, i) => (
                  <label key={n}>
                    <input type="radio" name="necesidad" value={n} defaultChecked={i === 0} />
                    {labels[i]}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="fl fl-ta">
              <textarea id="f-m" name="mensaje" placeholder=" " rows={5} maxLength={4000}></textarea>
              <label htmlFor="f-m">{t.message}</label>
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-hp">{t.hp}</label>
              <input id="f-hp" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name={STARTED} defaultValue="" />
            {/* el idioma solo lo manda el formulario en inglés (sin él, el endpoint responde en español) */}
            {lang === "en" && <input type="hidden" name={LANG_FIELD} value="en" />}
            <button className="btn btn-glass btn-blue" type="submit">
              <span>{t.send}</span>
            </button>
            <p className="fine" id="fmsg" role="status" aria-live="polite">
              {t.privacy[0]}{" "}
              <Link className="ul" href={r.privacidad}>
                {t.privacy[1]}
              </Link>
              .
            </p>
          </form>
          <div className="cside">
            {channels(t).map((c) => (
              <a className="cc glass" href={c.href} key={c.label} {...(c.ext && { target: "_blank", rel: "noopener" })}>
                <Ic>{c.icon}</Ic>
                <span className="cc-tx">
                  <span className="lbl">{c.label}</span>
                  <b>{c.value}</b>
                </span>
                <span className="cc-go" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={contactSchema} />
      <JsonLd data={breadcrumbs([{ name: t.crumb, path }])} />
      <PageFx page="contacto" />
    </main>
  );
}
