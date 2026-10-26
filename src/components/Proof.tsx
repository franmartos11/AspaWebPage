import type { CSSProperties } from "react";

// Números y clientes: los mismos en el Home y en Nosotros.
const NUMS = [
  { n: 5, pre: "+", post: "", label: "años de experiencia del equipo" },
  { n: 8, pre: "", post: "", label: "empresas que confían en nosotros" },
  { n: 3, pre: "", post: "", label: "eventos de innovación en Córdoba" },
  { n: 100, pre: "", post: "%", label: "proyectos a medida" },
];

const CLIENTS = ["Charlatanes", "Visual Peephole", "In Aebnit Automotriz", "Alfonso Lozita", "Car Refinishes", "Servicios Norte", "Omega Soluciones", "Autolack"];

/** Contadores en tarjetas de vidrio (los anima reveal.ts). `bar`: la línea que se completa (Nosotros). */
export function Nums({ className = "nums", bar = false }: { className?: string; bar?: boolean }) {
  return (
    <ul className={className} role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {NUMS.map((n, k) => (
        <li className="num glass rv" key={n.label} style={{ "--rv-i": k } as CSSProperties}>
          <b data-count={n.n} data-pre={n.pre || undefined} data-post={n.post || undefined}>
            {n.pre}
            {n.n}
            {n.post}
          </b>
          <span>{n.label}</span>
          {bar && <i className="nn-bar" aria-hidden="true"></i>}
        </li>
      ))}
    </ul>
  );
}

/** Marquee de clientes (acelera con el scroll, ver fx/site.ts). La segunda copia es solo visual. */
export function Clients({ id, title, dur, className = "clients", mq = "mq" }: { id: string; title: string; dur: string; className?: string; mq?: string }) {
  return (
    <section className={className} aria-labelledby={id}>
      <div className="wrap">
        <h2 className="lbl" id={id}>
          {title}
        </h2>
      </div>
      <div className={mq}>
        <div className="mq-track" style={{ "--dur": dur } as CSSProperties}>
          <ul className="mq-set">
            {CLIENTS.map((c) => (
              <li key={c} style={{ display: "contents" }}>
                <span className="mq-big">{c}</span>
                <i className="mq-dot" aria-hidden="true"></i>
              </li>
            ))}
          </ul>
          <div className="mq-set" aria-hidden="true">
            {CLIENTS.map((c) => (
              <span key={c} style={{ display: "contents" }}>
                <span className="mq-big">{c}</span>
                <i className="mq-dot"></i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
