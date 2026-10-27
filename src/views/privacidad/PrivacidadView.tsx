import type { Metadata } from "next";
import { CharTitle } from "@/components/CharTitle";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { routes, type Lang } from "@/i18n";
import { breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "@/styles/legal.css";

// TODO(legal): texto redactado según lo que hace el sitio y la Ley 25.326; conviene que lo revise un abogado.
// La versión en inglés es una traducción fiel: si cambia una, cambiar la otra.
const T = {
  es: {
    title: "Política de privacidad",
    description:
      "Qué datos recibe Aspa Software por el formulario de contacto, para qué los usa, cuánto tiempo los guarda y cómo pedir que se corrijan o borren.",
    h1: ["Política de ", { em: "privacidad." }],
    // Fecha de la última revisión del texto: actualizarla cuando cambie lo que el sitio hace con los datos.
    updated: ["Última actualización: ", "26 de octubre de 2026"],
    label: "Texto de la política",
    body: (
      <>
        <p>
          Esta política explica qué datos personales recibe {SITE.name} a través de {SITE.url.replace("https://", "")} y qué hace con ellos, de
          acuerdo con la Ley 25.326 de Protección de los Datos Personales de la República Argentina.
        </p>

        <h2>Quién es responsable</h2>
        <p>
          {SITE.name}, con domicilio en {SITE.address.street}, {SITE.address.city}, Argentina. Para cualquier consulta sobre tus datos escribinos a{" "}
          <a className="ul" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>

        <h2>Qué datos recibimos</h2>
        <p>Solo los que nos mandás por el formulario de contacto:</p>
        <ul>
          <li>nombre y email (obligatorios);</li>
          <li>teléfono y empresa (opcionales);</li>
          <li>qué necesitás y el mensaje que escribas.</li>
        </ul>
        <p>
          Si nos escribís por WhatsApp, email o redes sociales, recibimos lo que nos mandes por ese medio, con las condiciones de privacidad de cada
          servicio.
        </p>

        <h2>Para qué los usamos</h2>
        <p>
          Para responder tu consulta, prepararte una propuesta y hacer el seguimiento. No los usamos para enviarte publicidad si no lo pediste, y no
          los vendemos ni los compartimos con terceros para fines propios de ellos.
        </p>

        <h2>Dónde se guardan</h2>
        <p>
          El formulario nos llega como un email a una cuenta de Google (Gmail), que actúa como proveedor del servicio de correo. Además, el sitio está
          alojado en un proveedor de hosting que, como cualquier servidor web, registra datos técnicos de las visitas (dirección IP, navegador, fecha
          y hora) para su funcionamiento y seguridad.
        </p>

        <h2>Cuánto tiempo</h2>
        <p>
          Guardamos las consultas mientras sean útiles para responderte o para la relación comercial que surja. Podés pedirnos que las borremos antes.
        </p>

        <h2>Cookies</h2>
        <p>
          El sitio no usa cookies ni herramientas de análisis o publicidad. Solo guarda en tu navegador, mientras dura la visita, que ya viste la
          animación de entrada, para no repetirla.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Podés pedirnos acceder a tus datos, corregirlos, actualizarlos o borrarlos, escribiendo a{" "}
          <a className="ul" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          . El acceso es gratuito cada seis meses, salvo que acredites un interés legítimo para pedirlo antes (art. 14, inc. 3, Ley 25.326).
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende las denuncias y reclamos de quienes vean
          afectados sus derechos sobre los datos personales.
        </p>

        <h2>Cambios</h2>
        <p>Si cambiamos esta política, publicamos la nueva versión en esta página con su fecha de actualización.</p>
      </>
    ),
  },
  en: {
    title: "Privacy policy",
    description:
      "What data Aspa Software receives through the contact form, what it is used for, how long it is kept and how to ask for it to be corrected or deleted.",
    h1: ["Privacy ", { em: "policy." }],
    updated: ["Last updated: ", "October 26, 2026"],
    label: "Policy text",
    body: (
      <>
        <p>
          This policy explains what personal data {SITE.name} receives through {SITE.url.replace("https://", "")} and what it does with it, in
          accordance with Argentina&apos;s Personal Data Protection Law (Law No. 25,326).
        </p>

        <h2>Who is responsible</h2>
        <p>
          {SITE.name}, located at {SITE.address.street}, {SITE.address.city}, Argentina. For any question about your data, write to us at{" "}
          <a className="ul" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>

        <h2>What data we receive</h2>
        <p>Only what you send us through the contact form:</p>
        <ul>
          <li>name and email (required);</li>
          <li>phone and company (optional);</li>
          <li>what you need and the message you write.</li>
        </ul>
        <p>
          If you reach us on WhatsApp, by email or on social media, we receive whatever you send through that channel, subject to each service&apos;s
          privacy terms.
        </p>

        <h2>How we use it</h2>
        <p>
          To answer your inquiry, prepare a proposal and follow up. We don&apos;t use it to send you advertising you didn&apos;t ask for, and we
          don&apos;t sell it or share it with third parties for their own purposes.
        </p>

        <h2>Where it is stored</h2>
        <p>
          The form reaches us as an email in a Google (Gmail) account, which acts as our email service provider. The site is also hosted by a hosting
          provider that, like any web server, logs technical data about visits (IP address, browser, date and time) for its operation and security.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep inquiries for as long as they are useful to answer you or for any business relationship that follows. You can ask us to delete them
          sooner.
        </p>

        <h2>Cookies</h2>
        <p>
          The site does not use cookies or any analytics or advertising tools. It only stores in your browser, during your visit, that you have
          already seen the intro animation, so it doesn&apos;t play again.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to access, correct, update or delete your data by writing to{" "}
          <a className="ul" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          . Access is free of charge every six months, unless you show a legitimate interest in requesting it sooner (Section 14, subsection 3, Law
          No. 25,326).
        </p>
        <p>
          The Agency for Access to Public Information (<span lang="es">Agencia de Acceso a la Información Pública</span>), the supervisory authority
          under Law No. 25,326, handles complaints and claims from anyone whose rights over their personal data have been affected.
        </p>

        <h2>Changes</h2>
        <p>If we change this policy, we will publish the new version on this page with its update date.</p>
      </>
    ),
  },
} as const;

export function privacidadMeta(lang: Lang): Metadata {
  return pageMeta({ path: routes(lang).privacidad, title: T[lang].title, description: T[lang].description });
}

export function PrivacidadView({ lang }: { lang: Lang }) {
  const t = T[lang],
    path = routes(lang).privacidad;
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="priv-title">
        <div className="wrap">
          <CharTitle id="priv-title" parts={[...t.h1]} />
          <p className="lead">
            {t.updated[0]}
            {t.updated[1]}.
          </p>
        </div>
      </section>

      <section aria-label={t.label}>
        <div className="wrap">
          <div className="prose">{t.body}</div>
        </div>
      </section>

      <JsonLd data={breadcrumbs([{ name: t.title, path }])} />
      <PageFx page="texto" />
    </main>
  );
}
