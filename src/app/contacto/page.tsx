import type { Metadata } from "next";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { HONEYPOT, NEEDS, STARTED } from "@/lib/contact";
import { breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES, SITE, waLink } from "@/lib/site";
import "@/styles/seg.css";
import "./contacto.css";

const PATH = ROUTES.contacto;
const DESCRIPTION = `Contanos qué necesitás: sistema, app, web o automatización. Te respondemos en menos de 24 h hábiles. ${SITE.address.street}, ${SITE.address.city}.`;

export const metadata: Metadata = pageMeta({ path: PATH, title: "Contacto: contanos qué necesitás", description: DESCRIPTION });

const Ic = ({ children }: { children: React.ReactNode }) => (
  <span className="cc-ic" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </span>
);

const CHANNELS = [
  {
    label: "Dirección",
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
    value: "Escribinos por WhatsApp",
    href: waLink("Hola Aspa"),
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

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE.url}${PATH}#page`,
  url: `${SITE.url}${PATH}`,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE.url}/#website` },
  mainEntity: { "@id": `${SITE.url}/#organization`, contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, areaServed: "AR", availableLanguage: "es" } },
};

export default function ContactoPage() {
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="contacto-title">
        <div className="wrap">
          <CharTitle id="contacto-title" parts={["Contanos qué ", { em: "necesitás." }]} />
          <p className="lead r-late">Te respondemos en menos de 24 h hábiles.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Formulario y canales de contacto">
        <div className="wrap grid cgrid2">
          {/* sin JavaScript se envía igual (el endpoint responde con una página); con JS, contacto.ts lo manda por fetch */}
          <form className="cform glass glass-big" id="cform" action="/api/contacto" method="post" noValidate aria-describedby="fmsg">
            <div className="fl">
              <input id="f-n" name="nombre" placeholder=" " required maxLength={100} autoComplete="name" />
              <label htmlFor="f-n">Nombre</label>
            </div>
            <div className="fl">
              <input id="f-e" name="email" type="email" placeholder=" " required maxLength={200} autoComplete="email" />
              <label htmlFor="f-e">Email</label>
            </div>
            <div className="fl">
              <input id="f-t" name="telefono" type="tel" placeholder=" " maxLength={40} autoComplete="tel" />
              <label htmlFor="f-t">Teléfono</label>
            </div>
            <div className="fl">
              <input id="f-c" name="empresa" placeholder=" " maxLength={120} autoComplete="organization" />
              <label htmlFor="f-c">Empresa</label>
            </div>
            <fieldset className="fl-seg">
              <legend className="lbl">¿Qué necesitás?</legend>
              <div className="seg glass" data-seg="need">
                <span className="seg-drop" aria-hidden="true"></span>
                {NEEDS.map((n, i) => (
                  <label key={n}>
                    <input type="radio" name="necesidad" value={n} defaultChecked={i === 0} />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="fl fl-ta">
              <textarea id="f-m" name="mensaje" placeholder=" " rows={5} maxLength={4000}></textarea>
              <label htmlFor="f-m">Mensaje</label>
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-hp">No completar</label>
              <input id="f-hp" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name={STARTED} defaultValue="" />
            <button className="btn btn-glass btn-blue" type="submit">
              <span>Enviar</span>
            </button>
            <p className="fine" id="fmsg" role="status" aria-live="polite">
              Al enviar aceptás la{" "}
              <Link className="ul" href={ROUTES.privacidad}>
                política de privacidad
              </Link>
              .
            </p>
          </form>
          <div className="cside">
            {CHANNELS.map((c) => (
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
      <JsonLd data={breadcrumbs([{ name: "Contacto", path: PATH }])} />
      <PageFx page="contacto" />
    </main>
  );
}
