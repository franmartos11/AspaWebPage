import type { Metadata } from "next";
import { counterpart, langOf, LOCALE } from "@/i18n";
import { SITE } from "./site";

type Page = {
  /** Ruta de la página (ej. "/sistemas" o "/en/systems"): es la URL canónica y define el idioma. */
  path: string;
  /** Título sin la marca (el layout le agrega " | Aspa Software"). */
  title: string;
  description: string;
  /** imagen para redes cuando la página no tiene su opengraph-image (rutas dinámicas) */
  image?: { url: string; alt: string };
};

/** Metadata de una página: título, descripción, canónica, la misma página en el otro idioma (hreflang) y redes. */
export function pageMeta({ path, title, description, image }: Page): Metadata {
  const lang = langOf(path);
  const es = lang === "es" ? path : counterpart(path, "es"),
    en = lang === "en" ? path : counterpart(path, "en");
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        [LOCALE.es.hreflang]: es,
        [LOCALE.en.hreflang]: en,
        "x-default": es,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: LOCALE[lang].og,
      alternateLocale: LOCALE[lang === "es" ? "en" : "es"].og,
      url: path,
      title: `${title} | ${SITE.name}`,
      description,
      ...(image && {
        images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      ...(image && { images: [image.url] }),
    },
  };
}
