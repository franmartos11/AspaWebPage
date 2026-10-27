"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpart, langOf, routes, type Lang } from "@/i18n";

const LABELS = {
  es: {
    nav: "Principal",
    sistemas: "Sistemas",
    webs: "Webs",
    nosotros: "Nosotros",
    contacto: "Contacto",
    other: "English",
  },
  en: {
    nav: "Main",
    sistemas: "Systems",
    webs: "Websites",
    nosotros: "About",
    contacto: "Contact",
    other: "Español",
  },
} as const;

export function NavLinks() {
  const path = usePathname();
  const lang = langOf(path);
  const r = routes(lang),
    t = LABELS[lang];
  const NAV = [
    { href: r.sistemas, label: t.sistemas, match: [r.sistemas, r.casos] },
    { href: r.webs, label: t.webs, match: [r.webs] },
    { href: r.nosotros, label: t.nosotros, match: [r.nosotros] },
    { href: r.contacto, label: t.contacto, match: [r.contacto] },
  ];
  const other: Lang = lang === "es" ? "en" : "es";
  return (
    <nav className="nav" id="nav" aria-label={t.nav}>
      {NAV.map((n) => (
        // "page" en la página misma; "true" (sección actual) en sus subpáginas: casos, planes, rubros
        <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : n.match.some((m) => path.startsWith(m)) ? "true" : undefined}>
          {n.label}
        </Link>
      ))}
      {/* en celular el selector de idioma del header no entra: va como último ítem del menú */}
      <a className="nav-lang" href={counterpart(path, other)} hrefLang={other} lang={other}>
        {t.other}
      </a>
    </nav>
  );
}

/** ES / EN: lleva a la misma página en el otro idioma (cambiar de idioma recarga la página). */
export function LangSwitch() {
  const path = usePathname();
  const lang = langOf(path);
  return (
    <div className="lang" role="group" aria-label={lang === "es" ? "Idioma" : "Language"}>
      {(["es", "en"] as const).map((l) =>
        l === lang ? (
          <span key={l} aria-current="true">
            {l.toUpperCase()}
          </span>
        ) : (
          <a key={l} href={counterpart(path, l)} hrefLang={l} lang={l} aria-label={l === "es" ? "ES, Español" : "EN, English"}>
            {l.toUpperCase()}
          </a>
        ),
      )}
    </div>
  );
}
