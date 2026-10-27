import Link from "next/link";
import { routes, type Lang } from "@/i18n";
import { waLink } from "@/lib/site";
import { Logo } from "./Logo";
import { LangSwitch, NavLinks } from "./NavLinks";

const T = {
  es: {
    home: "Aspa Software, inicio",
    cta: "Hablemos",
    wa: "Hola Aspa",
    menu: "Abrir menú",
  },
  en: {
    home: "Aspa Software, home",
    cta: "Let's talk",
    wa: "Hi Aspa",
    menu: "Open menu",
  },
} as const;

export function Header({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <header className="hdr" id="hdr" suppressHydrationWarning>
      <div className="pill">
        <Link href={routes(lang).home} className="brand" aria-label={t.home}>
          <Logo />
        </Link>
        <NavLinks />
        <LangSwitch />
        <a className="btn btn-glass btn-blue btn-sm" href={waLink(t.wa)} target="_blank" rel="noopener">
          <span>{t.cta}</span>
        </a>
        <button className="menu-btn" type="button" aria-label={t.menu} aria-expanded="false" aria-controls="nav">
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
