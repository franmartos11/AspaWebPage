import type { NextConfig } from "next";

// El sitio no carga nada de terceros: todo sale del propio dominio. Sin nonces (obligarían a renderizar
// cada página en el servidor y el sitio es estático): los scripts y estilos en línea quedan permitidos.
// En desarrollo, React necesita eval para las herramientas de depuración.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // data: y blob: por los SVG en línea del CSS y las texturas que las escenas 3D dibujan en canvas
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // dos layouts raíz (español e inglés): el 404 de URLs que no existen va en app/global-not-found.tsx
    globalNotFound: true,
    // ~10 KB de CSS comprimido: va en línea en el <head> y se ahorra un viaje de red antes del primer pintado
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // URLs del sitio anterior (indexadas en Google y en enlaces viejos): redirección permanente a su
  // equivalente, para no perder el posicionamiento ni dar 404
  async redirects() {
    return [
      { source: "/contact", destination: "/contacto", permanent: true },
      { source: "/servicios", destination: "/sistemas", permanent: true },
      { source: "/apps-a-medida", destination: "/sistemas", permanent: true },
      { source: "/apps-a-medida1", destination: "/sistemas", permanent: true },
      { source: "/ia-automatizacion", destination: "/sistemas", permanent: true },
      { source: "/auditorias", destination: "/sistemas", permanent: true },
      { source: "/desarrollo-web", destination: "/webs", permanent: true },
      { source: "/desarrollo-web1", destination: "/webs", permanent: true },
      { source: "/carcheck", destination: "/casos", permanent: true },
      { source: "/Carcheck1", destination: "/casos", permanent: true },
      { source: "/sitemap-0.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // texturas e imágenes fijas de la notebook 3D: no cambian entre deploys sin cambiar de nombre
      { source: "/3d/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
