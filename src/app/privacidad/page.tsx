import type { Metadata } from "next";
import { CharTitle } from "@/components/CharTitle";
import { PageFx } from "@/components/Fx";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { ROUTES, SITE } from "@/lib/site";
import "@/styles/legal.css";

const PATH = ROUTES.privacidad;
// Fecha de la última revisión del texto: actualizarla cuando cambie lo que el sitio hace con los datos.
const UPDATED = "26 de octubre de 2026";

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: "Política de privacidad",
  description: "Qué datos recibe Aspa Software por el formulario de contacto, para qué los usa, cuánto tiempo los guarda y cómo pedir que se corrijan o borren.",
});

// TODO(legal): texto redactado según lo que hace el sitio y la Ley 25.326; conviene que lo revise un abogado.
export default function PrivacidadPage() {
  return (
    <main id="main" className="view">
      <section className="phero" aria-labelledby="priv-title">
        <div className="wrap">
          <CharTitle id="priv-title" parts={["Política de ", { em: "privacidad." }]} />
          <p className="lead">Última actualización: {UPDATED}.</p>
        </div>
      </section>

      <section aria-label="Texto de la política">
        <div className="wrap">
          <div className="prose">
            <p>
              Esta política explica qué datos personales recibe {SITE.name} a través de {SITE.url.replace("https://", "")} y qué hace con ellos, de acuerdo con la Ley
              25.326 de Protección de los Datos Personales de la República Argentina.
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
              Si nos escribís por WhatsApp, email o redes sociales, recibimos lo que nos mandes por ese medio, con las condiciones de privacidad de cada servicio.
            </p>

            <h2>Para qué los usamos</h2>
            <p>
              Para responder tu consulta, prepararte una propuesta y hacer el seguimiento. No los usamos para enviarte publicidad si no lo pediste, y no los vendemos ni los
              compartimos con terceros para fines propios de ellos.
            </p>

            <h2>Dónde se guardan</h2>
            <p>
              El formulario nos llega como un email a una cuenta de Google (Gmail), que actúa como proveedor del servicio de correo. Además, el sitio está alojado en un
              proveedor de hosting que, como cualquier servidor web, registra datos técnicos de las visitas (dirección IP, navegador, fecha y hora) para su funcionamiento
              y seguridad.
            </p>

            <h2>Cuánto tiempo</h2>
            <p>Guardamos las consultas mientras sean útiles para responderte o para la relación comercial que surja. Podés pedirnos que las borremos antes.</p>

            <h2>Cookies</h2>
            <p>
              El sitio no usa cookies ni herramientas de análisis o publicidad. Solo guarda en tu navegador, mientras dura la visita, que ya viste la animación de entrada,
              para no repetirla.
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
              La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende las denuncias y reclamos de quienes vean afectados sus derechos
              sobre los datos personales.
            </p>

            <h2>Cambios</h2>
            <p>Si cambiamos esta política, publicamos la nueva versión en esta página con su fecha de actualización.</p>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbs([{ name: "Política de privacidad", path: PATH }])} />
      <PageFx page="texto" />
    </main>
  );
}
