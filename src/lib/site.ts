// Datos de la empresa y rutas del sitio: una sola fuente para la UI, la metadata y el JSON-LD.

export const SITE = {
  name: "Aspa Software",
  // dominio principal en Vercel: aspasoftware.com redirige a www
  url: "https://www.aspasoftware.com",
  locale: "es_AR",
  lang: "es-AR",
  tagline: "Sistemas a medida, apps y webs para empresas.",
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
  },
  social: {
    // "company/aspa-software" no existe (daba 404); este es el id de la página de la empresa
    linkedin: "https://www.linkedin.com/company/85621550/",
    instagram: "https://www.instagram.com/aspa.software",
  },
} as const;

export const ROUTES = {
  home: "/",
  sistemas: "/sistemas",
  webs: "/webs",
  planes: "/webs/planes",
  nosotros: "/nosotros",
  contacto: "/contacto",
  privacidad: "/privacidad",
  casos: "/casos",
  casoRodeo: "/casos/aspa-rodeo",
  casoScout: "/casos/aspa-scout",
  rubro: (slug: string) => `/webs/${slug}`,
} as const;

/** Link de WhatsApp con mensaje prellenado (o email mientras no haya número cargado). */
export function waLink(text: string) {
  if (SITE.whatsapp) return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(text)}`;
}
