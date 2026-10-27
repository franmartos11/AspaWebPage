// Idiomas del sitio: español (por defecto, en las URLs de siempre) e inglés (bajo /en, con URLs
// en inglés). Una sola tabla de rutas para los links, la metadata (canónica + hreflang), el
// sitemap y el botón ES/EN, que lleva a la misma página en el otro idioma.

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LOCALE = {
  es: { html: "es-AR", og: "es_AR", hreflang: "es-AR" },
  en: { html: "en", og: "en_US", hreflang: "en" },
} as const;

/** Slugs de los rubros: la clave es el slug en español (el que usan los datos). */
export const RUBRO_SLUGS = {
  arquitectos: "architects",
  "estudios-de-arquitectura": "architecture-studios",
  interiorismo: "interior-design",
  constructoras: "construction-companies",
  "constructoras-de-vivienda": "home-builders",
  "steel-framing": "steel-framing",
  desarrollistas: "real-estate-developers",
} as const;
export type RubroKey = keyof typeof RUBRO_SLUGS;

const PATHS = {
  home: { es: "/", en: "/en" },
  sistemas: { es: "/sistemas", en: "/en/systems" },
  webs: { es: "/webs", en: "/en/websites" },
  planes: { es: "/webs/planes", en: "/en/websites/pricing" },
  casos: { es: "/casos", en: "/en/work" },
  casoRodeo: { es: "/casos/aspa-rodeo", en: "/en/work/aspa-rodeo" },
  casoScout: { es: "/casos/aspa-scout", en: "/en/work/aspa-scout" },
  nosotros: { es: "/nosotros", en: "/en/about" },
  contacto: { es: "/contacto", en: "/en/contact" },
  enviado: { es: "/contacto/enviado", en: "/en/contact/sent" },
  error: { es: "/contacto/error", en: "/en/contact/error" },
  privacidad: { es: "/privacidad", en: "/en/privacy" },
} as const;
export type PageKey = keyof typeof PATHS;

const rubroPath = (key: RubroKey, lang: Lang) => (lang === "es" ? `/webs/${key}` : `/en/websites/${RUBRO_SLUGS[key]}`);

/** Rutas del sitio en un idioma: `routes(lang).sistemas`, `routes(lang).rubro("arquitectos")`. */
export function routes(lang: Lang) {
  const r = Object.fromEntries(Object.entries(PATHS).map(([k, v]) => [k, v[lang]])) as { [K in PageKey]: string };
  return { ...r, rubro: (key: string) => rubroPath(key as RubroKey, lang) };
}

/** Cada página en los dos idiomas (para hreflang, el sitemap y el botón ES/EN). */
export function allPages(): { es: string; en: string }[] {
  return [
    ...Object.values(PATHS).filter((p) => p.es !== PATHS.enviado.es && p.es !== PATHS.error.es),
    ...(Object.keys(RUBRO_SLUGS) as RubroKey[]).map((k) => ({
      es: rubroPath(k, "es"),
      en: rubroPath(k, "en"),
    })),
  ];
}

/** La misma página en el otro idioma (o el inicio de ese idioma si no hay equivalente). */
export function counterpart(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  const all = [
    ...Object.values(PATHS),
    ...(Object.keys(RUBRO_SLUGS) as RubroKey[]).map((k) => ({
      es: rubroPath(k, "es"),
      en: rubroPath(k, "en"),
    })),
  ];
  const hit = all.find((p) => p.es === clean || p.en === clean);
  return hit ? hit[to] : PATHS.home[to];
}

export const langOf = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es");
