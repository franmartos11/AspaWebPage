import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { PageFx } from "@/components/Fx";
import { ROUTES, waLink } from "@/lib/site";
import "@/styles/legal.css";

/** Aviso después de enviar el formulario sin JavaScript (con JS el aviso aparece en el formulario). */
export function Notice({ ok }: { ok: boolean }) {
  return (
    <main id="main" className="view">
      <section className="phero notice" aria-labelledby="notice-title">
        <div className="wrap">
          <CharTitle id="notice-title" parts={ok ? ["Recibimos tu ", { em: "mensaje." }] : ["No pudimos ", { em: "enviarlo." }]} />
          <p className="lead">
            {ok ? "Te respondemos en menos de 24 h hábiles." : "Revisá que el nombre y el email estén completos, o escribinos directamente."}
          </p>
          <div className="btns">
            {ok ? (
              <Link className="btn btn-glass" href={ROUTES.home}>
                <span>Volver al inicio</span>
              </Link>
            ) : (
              <>
                <a className="btn btn-glass btn-blue" href={waLink("Hola Aspa, quiero contarles un proyecto")} target="_blank" rel="noopener">
                  <span>Escribinos por WhatsApp</span>
                </a>
                <Link className="btn btn-glass" href={ROUTES.contacto}>
                  <span>Volver al formulario</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <PageFx page="texto" />
    </main>
  );
}
