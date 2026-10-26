import Link from "next/link";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { waLink } from "@/lib/site";

export function Header() {
  return (
    <header className="hdr" id="hdr" suppressHydrationWarning>
      <div className="pill">
        <Link href="/" className="brand" aria-label="Aspa Software, inicio">
          <Logo />
        </Link>
        <NavLinks />
        {/* TODO: versión en inglés. Hasta que exista, EN queda deshabilitado. */}
        <div className="lang" role="group" aria-label="Idioma">
          <button type="button" aria-pressed="true">
            ES
          </button>
          <button type="button" aria-pressed="false" disabled title="English version coming soon">
            EN
          </button>
        </div>
        <a className="btn btn-glass btn-blue btn-sm" href={waLink("Hola Aspa")} target="_blank" rel="noopener">
          <span>Hablemos</span>
        </a>
        <button className="menu-btn" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
