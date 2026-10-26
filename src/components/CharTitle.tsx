import type { CSSProperties, ReactNode } from "react";

type Part = string | { em: string };

/**
 * Título de hero que entra por palabras (sube, gana opacidad y se enfoca).
 * Se arma en el servidor, sin parpadeo. Por palabra y no por letra: conserva el
 * kerning, son 9 capas animadas en lugar de 34 y el recorrido es más corto.
 * El texto completo queda en aria-label y en el DOM para buscadores.
 */
export function CharTitle({ parts, id, className = "hero-t" }: { parts: Part[]; id?: string; className?: string }) {
  let i = 0;
  const out: ReactNode[] = [];
  const label = parts.map((p) => (typeof p === "string" ? p : p.em)).join("");
  parts.forEach((p, pi) => {
    const em = typeof p !== "string";
    const text = em ? p.em : p;
    text.split(/(\s+)/).forEach((w, wi) => {
      if (!w) return;
      if (/^\s+$/.test(w)) {
        out.push(" ");
        return;
      }
      const style = { "--i": i++ } as CSSProperties;
      out.push(
        em ? (
          <em className="grad w" aria-hidden="true" style={style} key={`${pi}-${wi}`}>
            {w}
          </em>
        ) : (
          <span className="w" aria-hidden="true" style={style} key={`${pi}-${wi}`}>
            {w}
          </span>
        ),
      );
    });
  });
  return (
    <h1 className={className} id={id} aria-label={label}>
      {out}
    </h1>
  );
}
