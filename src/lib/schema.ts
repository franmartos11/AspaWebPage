import { SITE } from "./site";

const ORG_ID = `${SITE.url}/#organization`;

/** Empresa (servicio profesional con dirección en Córdoba) y sitio web. Va en todas las páginas. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
      image: `${SITE.url}/opengraph-image.jpg`,
      description: "Desarrollo de sistemas de gestión a medida, apps para celular, automatizaciones e integraciones y webs para empresas.",
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      areaServed: { "@type": "Country", name: "Argentina" },
      sameAs: [SITE.social.linkedin, SITE.social.instagram],
      knowsAbout: ["Software a medida", "Sistemas de gestión", "Apps para celular", "Automatizaciones", "Integraciones", "Desarrollo web"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: SITE.lang,
      publisher: { "@id": ORG_ID },
    },
  ],
};

/** Servicios que se ofrecen desde el Home (cada uno tendrá su página). */
export const homeServicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Aspa Software",
  itemListElement: [
    ["Sistemas de gestión a medida", "Stock, ventas, clientes, turnos y órdenes de trabajo, en un solo lugar y al día.", "/sistemas"],
    ["Apps para celular", "iOS y Android, para tu equipo en la calle o para tus clientes.", "/sistemas#apps"],
    ["Automatizaciones e integraciones", "Las tareas que hoy hace alguien a mano, hechas solas: avisos, cargas, reportes.", "/sistemas#automatizaciones"],
    ["Webs para empresas y profesionales", "Una web que muestra tu trabajo y convence antes de la primera reunión.", "/webs"],
  ].map(([name, description, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Service", name, description, url: `${SITE.url}${path}`, provider: { "@id": ORG_ID }, areaServed: "AR" },
  })),
};

/** Migas de pan (Inicio › …): las muestra Google en lugar de la URL. */
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

/** Un servicio con sus variantes (ej. Sistemas: gestión, apps, automatizaciones…). */
export function serviceSchema({ name, description, path, offers }: { name: string; description: string; path: string; offers: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}${path}#service`,
    name,
    description,
    url: `${SITE.url}${path}`,
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Argentina" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
    },
  };
}

/** Planes con precio publicado (Webs): servicio con sus ofertas en USD. */
export function plansSchema({ name, path, plans }: { name: string; path: string; plans: { name: string; usd: number; description: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}${path}#service`,
    name,
    url: `${SITE.url}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Argentina" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.description,
        price: p.usd,
        priceCurrency: "USD",
        itemOffered: { "@type": "Service", name: `Web ${p.name}` },
      })),
    },
  };
}

/** Sistema propio de Aspa (casos): aplicación web con sus funciones principales. */
export function softwareSchema({ name, description, path, image, features }: { name: string; description: string; path: string; image: string; features: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}${path}#software`,
    name,
    description,
    url: `${SITE.url}${path}`,
    image: `${SITE.url}${image}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    featureList: features,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Listado de trabajos (/casos): página de colección con sus elementos en orden. */
export function collectionSchema({ name, description, path, items }: { name: string; description: string; path: string; items: { name: string; path: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE.url}${path}#page`,
    name,
    description,
    url: `${SITE.url}${path}`,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${SITE.url}${it.path}` })),
    },
  };
}

/** Nosotros: página "acerca de" con el equipo como miembros de la empresa. */
export function aboutSchema({ description, path, team }: { description: string; path: string; team: { name: string; role: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE.url}${path}#page`,
    url: `${SITE.url}${path}`,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@id": ORG_ID,
      foundingLocation: { "@type": "Place", name: `${SITE.address.city}, Argentina` },
      member: team.map((p) => ({ "@type": "OrganizationRole", roleName: p.role, member: { "@type": "Person", name: p.name, jobTitle: p.role } })),
    },
  };
}
