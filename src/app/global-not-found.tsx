import type { Metadata } from "next";
import { htmlProps, SiteBody, SiteHead, siteViewport } from "@/components/SiteShell";
import { routes } from "@/i18n";

// 404 de cualquier URL que no existe. Hay dos layouts raíz (español e inglés), así que este va
// aparte y en los dos idiomas (no se sabe de qué lado llegó la visita).
export const metadata: Metadata = { title: "Página no encontrada · Page not found | Aspa Software", robots: { index: false } };
export const viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <html {...htmlProps("es")} suppressHydrationWarning>
      <head>
        <SiteHead />
      </head>
      <body suppressHydrationWarning>
        <SiteBody lang="es">
          <main id="main" className="view">
            <section className="section" style={{ minHeight: "80vh", display: "grid", alignItems: "center", paddingTop: 160 }}>
              <div className="wrap">
                <p className="lbl">Error 404</p>
                <h1 className="h2">Esta página no existe (todavía).</h1>
                <p className="lead" style={{ marginTop: 24 }}>
                  Puede que el link esté mal o que estemos terminando esta sección.
                </p>
                <p className="lead mut" lang="en" style={{ marginTop: 12 }}>
                  This page doesn’t exist. The link may be wrong.
                </p>
                <div className="btns" style={{ marginTop: 32 }}>
                  <a className="btn btn-glass btn-blue" href={routes("es").home}>
                    <span>Volver al inicio</span>
                  </a>
                  <a className="btn btn-glass" href={routes("en").home} lang="en">
                    <span>Go to the English site</span>
                  </a>
                </div>
              </div>
            </section>
          </main>
        </SiteBody>
      </body>
    </html>
  );
}
