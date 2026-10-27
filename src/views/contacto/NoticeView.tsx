import type { Metadata } from "next";
import Link from "next/link";
import { CharTitle } from "@/components/CharTitle";
import { PageFx } from "@/components/Fx";
import { routes, type Lang } from "@/i18n";
import { waLink } from "@/lib/site";
import "@/styles/legal.css";

const T = {
  es: {
    ok: { title: "Mensaje enviado", h1: ["Recibimos tu ", { em: "mensaje." }], lead: "Te respondemos en menos de 24 h hábiles." },
    err: {
      title: "No pudimos enviar el mensaje",
      h1: ["No pudimos ", { em: "enviarlo." }],
      lead: "Revisá que el nombre y el email estén completos, o escribinos directamente.",
    },
    home: "Volver al inicio",
    wa: "Escribinos por WhatsApp",
    waMsg: "Hola Aspa, quiero contarles un proyecto",
    back: "Volver al formulario",
  },
  en: {
    ok: { title: "Message sent", h1: ["We got your ", { em: "message." }], lead: "We reply within 1 business day." },
    err: {
      title: "We couldn't send your message",
      h1: ["We couldn't ", { em: "send it." }],
      lead: "Make sure your name and email are filled in, or reach out to us directly.",
    },
    home: "Back to home",
    wa: "Message us on WhatsApp",
    waMsg: "Hi Aspa, I'd like to tell you about a project",
    back: "Back to the form",
  },
} as const;

/** Metadata de los avisos: no se indexan. */
export function noticeMeta(ok: boolean, lang: Lang): Metadata {
  return { title: T[lang][ok ? "ok" : "err"].title, robots: { index: false, follow: true } };
}

/** Aviso después de enviar el formulario sin JavaScript (con JS el aviso aparece en el formulario). */
export function NoticeView({ ok, lang }: { ok: boolean; lang: Lang }) {
  const t = T[lang],
    n = t[ok ? "ok" : "err"],
    r = routes(lang);
  return (
    <main id="main" className="view">
      <section className="phero notice" aria-labelledby="notice-title">
        <div className="wrap">
          <CharTitle id="notice-title" parts={[...n.h1]} />
          <p className="lead">{n.lead}</p>
          <div className="btns">
            {ok ? (
              <Link className="btn btn-glass" href={r.home}>
                <span>{t.home}</span>
              </Link>
            ) : (
              <>
                <a className="btn btn-glass btn-blue" href={waLink(t.waMsg)} target="_blank" rel="noopener">
                  <span>{t.wa}</span>
                </a>
                <Link className="btn btn-glass" href={r.contacto}>
                  <span>{t.back}</span>
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
