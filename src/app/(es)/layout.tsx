import { htmlProps, SiteBody, SiteHead, siteMetadata, siteViewport } from "@/components/SiteShell";

// Layout raíz del sitio en español (URLs de siempre). El inglés tiene el suyo en (en)/.
export const metadata = siteMetadata("es");
export const viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html {...htmlProps("es")} suppressHydrationWarning>
      <head>
        <SiteHead />
      </head>
      <body suppressHydrationWarning>
        <SiteBody lang="es">{children}</SiteBody>
      </body>
    </html>
  );
}
