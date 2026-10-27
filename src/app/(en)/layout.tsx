import { htmlProps, SiteBody, SiteHead, siteMetadata, siteViewport } from "@/components/SiteShell";

// Layout raíz del sitio en inglés (todo bajo /en). Pasar de un idioma al otro recarga la página.
export const metadata = siteMetadata("en");
export const viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html {...htmlProps("en")} suppressHydrationWarning>
      <head>
        <SiteHead />
      </head>
      <body suppressHydrationWarning>
        <SiteBody lang="en">{children}</SiteBody>
      </body>
    </html>
  );
}
