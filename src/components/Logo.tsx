import type { CSSProperties } from "react";
import { LOGO_A, LOGO_ISO, LOGO_LETTERS, LOGO_PHX, PX_FULL, PX_ISO } from "@/lib/logo-paths";

/**
 * Trazos del logo, una sola vez por página (van en el layout). Cada <Logo> los usa con
 * <use>: el header, el footer y la intro no repiten ~8 KB de trazos cada uno.
 */
export function LogoDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        {LOGO_LETTERS.map((l) => (
          <path key={l.i} id={`lgd-l${l.i}`} d={l.d} />
        ))}
        <path id="lgd-a" d={LOGO_A} />
        <path id="lgd-iso" fillRule="evenodd" d={LOGO_ISO} />
        <path id="lgd-phx" fillRule="evenodd" d={LOGO_PHX} />
      </defs>
    </svg>
  );
}

/** Transformación del isotipo (fénix) como atributo SVG, para usarlo suelto con <use>. */
export const LOGO_ISO_T = "translate(-455.1,-486.3) scale(3.3774)";

type Props = { className?: string };

/** Logo completo de Aspa. Decorativo: el nombre accesible lo pone el contenedor. */
export function Logo({ className }: Props) {
  return (
    <svg
      className={className ? `logo ${className}` : "logo"}
      viewBox="-40 -150 2857 890"
      aria-hidden="true"
      focusable="false"
      style={{ "--px-full": PX_FULL, "--px-iso": PX_ISO } as CSSProperties}
    >
      <g className="lg-spa">
        {LOGO_LETTERS.map((l) => (
          <use key={l.i} href={`#lgd-l${l.i}`} className="lg-l" style={{ "--dx": `${l.dx}px`, "--i": l.i } as CSSProperties} />
        ))}
      </g>
      <use href="#lgd-a" className="lg-a" />
      <use href="#lgd-iso" className="lg-iso" style={{ transform: PX_ISO }} />
      <use href="#lgd-phx" className="lg-phx" />
    </svg>
  );
}
