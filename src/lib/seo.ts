import type { Metadata } from "next";
import { SITE } from "./site";

type Page = {
  /** Ruta de la página (ej. "/sistemas"): es la URL canónica. */
  path: string;
  /** Título sin la marca (el layout le agrega " | Aspa Software"). */
  title: string;
  description: string;
  /** imagen para redes cuando la página no tiene su opengraph-image (rutas dinámicas) */
  image?: { url: string; alt: string };
};

/** Metadata de una página interna: título, descripción, canónica y tarjetas para redes. */
export function pageMeta({ path, title, description, image }: Page): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: path,
      title: `${title} | ${SITE.name}`,
      description,
      ...(image && { images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }] }),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description, ...(image && { images: [image.url] }) },
  };
}
