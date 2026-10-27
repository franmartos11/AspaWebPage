import type { MetadataRoute } from "next";
import { counterpart, LOCALE } from "@/i18n";
import { SITE } from "@/lib/site";
import { RUBROS } from "@/lib/webs";

// Cada página en español; la versión en inglés sale de la tabla de rutas (src/i18n). Sumar acá cada página nueva.
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/sistemas", priority: 0.9, changeFrequency: "monthly" },
  { path: "/webs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/webs/planes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/nosotros", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contacto", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.2, changeFrequency: "yearly" },
  { path: "/casos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/casos/aspa-rodeo", priority: 0.7, changeFrequency: "yearly" },
  { path: "/casos/aspa-scout", priority: 0.7, changeFrequency: "yearly" },
  ...RUBROS.map((r) => ({ path: `/webs/${r.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
];

const abs = (p: string) => `${SITE.url}${p === "/" ? "" : p}`;

// Las dos versiones de cada página, y en cada una sus alternativas (hreflang) para Google.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((p) => {
    const es = p.path,
      en = counterpart(p.path, "en");
    const languages = { [LOCALE.es.hreflang]: abs(es), [LOCALE.en.hreflang]: abs(en), "x-default": abs(es) };
    return [es, en].map((path) => ({ url: abs(path), changeFrequency: p.changeFrequency, priority: p.priority, alternates: { languages } }));
  });
}
