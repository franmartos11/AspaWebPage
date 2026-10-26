import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { RUBROS } from "@/lib/webs";

// Sumar cada página nueva acá.
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

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${SITE.url}${p.path === "/" ? "" : p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
