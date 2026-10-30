"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { counterpart, langOf, routes, type Lang } from "@/i18n";
import { FAMS, RUBROS } from "@/lib/webs";
import { NavArt, type ArtKey } from "./NavArt";

const LABELS = {
  es: {
    nav: "Principal",
    home: "Inicio",
    sistemas: "Sistemas",
    sisCol: "Sistemas que construimos",
    rodeo: "Gestión de hacienda",
    scout: "Gestión comercial y CRM",
    allSis: "Ver sistemas a medida →",
    casos: "Todos los casos",
    webs: "Webs",
    allWebs: "Ver todas las webs →",
    planes: "Planes y precios",
    nosotros: "Nosotros",
    contacto: "Contacto",
    other: "English",
  },
  en: {
    nav: "Main",
    home: "Home",
    sistemas: "Systems",
    sisCol: "Systems we've built",
    rodeo: "Livestock management",
    scout: "Sales management & CRM",
    allSis: "See custom systems →",
    casos: "All case studies",
    webs: "Websites",
    allWebs: "See all websites →",
    planes: "Plans and pricing",
    nosotros: "About",
    contacto: "Contact",
    other: "Español",
  },
} as const;

type MegaItem = { href: string; name: string; desc: string; art: ArtKey };
type MegaCol = { title: string; items: MegaItem[] };

/**
 * Menú desplegable de un ítem (Webs, Sistemas): se abre al pasar el mouse o con el foco (teclado); las
 * opciones por columna a la izquierda y, a la derecha, la ilustración de la que tiene el mouse. En
 * celular va desplegado debajo de su ítem (sin ilustración).
 */
function Mega({
  path,
  href,
  label,
  current,
  cols,
  foot,
}: {
  path: string;
  href: string;
  label: string;
  current?: "page" | "true";
  cols: MegaCol[];
  foot: { href: string; label: string }[];
}) {
  const items = cols.flatMap((c) => c.items);
  // al abrir: la de la página en la que estás o la primera
  const here = items.find((it) => it.href === path)?.art;
  const [art, setArt] = useState<ArtKey>(here ?? items[0].art);
  // al elegir una opción el panel se cierra (si no, tapa la página nueva: el mouse y el foco siguen
  // encima) y no se vuelve a abrir hasta que el mouse sale y vuelve a entrar
  const [shut, setShut] = useState(false);
  const close = (e: React.MouseEvent) => {
    if (!(e.target as Element).closest("a")) return;
    setShut(true);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  return (
    <div
      className={shut ? "nav-dd shut" : "nav-dd"}
      onClick={close}
      onMouseEnter={() => here && setArt(here)}
      onMouseLeave={() => setShut(false)}
      onFocus={() => setShut(false)}
    >
      <Link href={href} aria-current={current}>
        {label}
      </Link>
      <div className="nav-mega">
        <div className="nm-cols" style={{ "--cols": cols.length } as React.CSSProperties}>
          {cols.map((c) => (
            <div className="nm-col" key={c.title}>
              <p className="nm-fam">{c.title}</p>
              <ul className="nav-sub" aria-label={c.title}>
                {c.items.map((it) => (
                  <li key={it.href} className={art === it.art ? "on" : undefined}>
                    <Link
                      href={it.href}
                      aria-current={path === it.href ? "page" : undefined}
                      onMouseEnter={() => setArt(it.art)}
                      onFocus={() => setArt(it.art)}
                    >
                      <b>{it.name}</b>
                      <span>{it.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="nm-art">
          <NavArt slug={art} key={art} />
        </div>
        <div className="nm-foot">
          {foot.map((f) => (
            <Link key={f.href} href={f.href} aria-current={path === f.href ? "page" : undefined}>
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavLinks() {
  const path = usePathname();
  const lang = langOf(path);
  const r = routes(lang),
    t = LABELS[lang];
  // "page" en la página misma; "true" (sección actual) en sus subpáginas: casos, planes, rubros
  const current = (href: string, match: string[]) => (path === href ? "page" : match.some((m) => path.startsWith(m)) ? "true" : undefined);
  const MEGA: Record<string, { cols: MegaCol[]; foot: { href: string; label: string }[] }> = {
    [r.sistemas]: {
      cols: [
        {
          title: t.sisCol,
          items: [
            { href: r.casoRodeo, name: "Aspa Rodeo", desc: t.rodeo, art: "aspa-rodeo" },
            { href: r.casoScout, name: "Aspa Scout", desc: t.scout, art: "aspa-scout" },
          ],
        },
      ],
      foot: [
        { href: r.sistemas, label: t.allSis },
        { href: r.casos, label: t.casos },
      ],
    },
    [r.webs]: {
      cols: FAMS[lang].map((fam, i) => ({
        title: fam,
        items: RUBROS.filter((rb) => rb.fam === i).map((rb) => ({
          href: r.rubro(rb.slug),
          name: lang === "es" ? rb.menu : rb.menuEn,
          desc: lang === "es" ? rb.desc : rb.descEn,
          art: rb.slug,
        })),
      })),
      foot: [
        { href: r.webs, label: t.allWebs },
        { href: r.planes, label: t.planes },
      ],
    },
  };
  const NAV = [
    { href: r.home, label: t.home, match: [] as string[] },
    { href: r.sistemas, label: t.sistemas, match: [r.sistemas, r.casos] },
    { href: r.webs, label: t.webs, match: [r.webs] },
    { href: r.nosotros, label: t.nosotros, match: [r.nosotros] },
    { href: r.contacto, label: t.contacto, match: [r.contacto] },
  ];
  const other: Lang = lang === "es" ? "en" : "es";
  return (
    <nav className="nav" id="nav" aria-label={t.nav}>
      {NAV.map((n) =>
        MEGA[n.href] ? (
          <Mega key={n.href} path={path} href={n.href} label={n.label} current={current(n.href, n.match)} {...MEGA[n.href]} />
        ) : (
          <Link key={n.href} href={n.href} aria-current={current(n.href, n.match)}>
            {n.label}
          </Link>
        ),
      )}
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
