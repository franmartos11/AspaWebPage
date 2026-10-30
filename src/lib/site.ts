import { routes, type Lang } from "@/i18n";

// Datos de la empresa y rutas del sitio: una sola fuente para la UI, la metadata y el JSON-LD.

export const SITE = {
  name: "Aspa Software",
  // dominio principal en Vercel: aspasoftware.com redirige a www
  url: "https://www.aspasoftware.com",
  locale: "es_AR",
  lang: "es-AR",
  tagline: {
    es: "Sistemas a medida, apps y webs para empresas.",
    en: "Custom software, apps and websites for companies.",
  } as Record<Lang, string>,
  // datos de contacto del sitio anterior (github.com/franmartos11/AspaWebPage)
  email: "aspasoftwaredevelopment@gmail.com",
  // WhatsApp en formato internacional sin "+" ni espacios (+54 9 3517 87-8609)
  whatsapp: "5493517878609",
  address: {
    street: "Av. Colón 730",
    postalCode: "X5003",
    city: "Córdoba",
    region: "Córdoba",
    country: "AR",
    maps: "https://maps.google.com/?q=Av.+Col%C3%B3n+730,+C%C3%B3rdoba",
    // Av. Colón 730 en OpenStreetMap (Nominatim): el centro del mapa de Nosotros y `geo` en los datos estructurados
    geo: { lat: -31.4106156, lng: -64.1930532 },
  },
  social: {
    // "company/aspa-software" no existe (daba 404); este es el id de la página de la empresa
    linkedin: "https://www.linkedin.com/company/85621550/",
    instagram: "https://www.instagram.com/aspa.software",
  },
} as const;

// Rutas en español (las de siempre). Para el otro idioma: routes(lang) de "@/i18n".
export const ROUTES = routes("es");

/** Link de WhatsApp con mensaje prellenado (o email mientras no haya número cargado). */
export function waLink(text: string) {
  if (SITE.whatsapp) return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(text)}`;
}
