import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer/Footer";
import WhatsAppButton from "./Components/WhatsAppLogo/WhatsAppButton";
import Script from "next/script";
import { LanguageProvider } from "./Components/AALenguageContext/LenguageContext";
import { Analytics } from "@vercel/analytics/react";
import BackgroundOrbs from "./Components/BackgroundOrbs/BackgroundOrbs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aspasoftware.com"),
  title: {
    default: "Aspa Software | Desarrollo de Software a Medida en Argentina",
    template: "%s | Aspa Software",
  },
  description:
    "Empresa de desarrollo de software en Argentina. Creamos páginas web, apps a medida, soluciones con IA y automatización de procesos. Contáctanos y transformá tu negocio.",
  keywords: [
    "desarrollo de software Argentina",
    "empresa de software Buenos Aires",
    "desarrollo web Argentina",
    "apps a medida Argentina",
    "automatización con IA",
    "software a medida",
    "páginas web profesionales",
    "software para talleres mecánicos",
    "carcheck",
    "auditoría IT",
    "aspa software",
  ],
  icons: "/aspaLogo.webp",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.aspasoftware.com",
  },
  openGraph: {
    title: "Aspa Software | Desarrollo de Software a Medida en Argentina",
    description:
      "Desarrollamos páginas web, apps móviles, soluciones con IA y automatizamos procesos para potenciar tu negocio. Empresa argentina de software.",
    url: "https://www.aspasoftware.com",
    siteName: "Aspa Software",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aspa Software — Desarrollo de Software a Medida en Argentina",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspa Software | Desarrollo de Software a Medida",
    description:
      "Páginas web, apps a medida, IA y automatización. Soluciones tecnológicas para empresas argentinas.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aspa Software",
  url: "https://www.aspasoftware.com",
  logo: "https://www.aspasoftware.com/aspaLogo.webp",
  description:
    "Empresa de desarrollo de software en Argentina especializada en páginas web, apps a medida, automatización con IA y software para talleres mecánicos.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [],
  areaServed: {
    "@type": "Country",
    name: "Argentina",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','GTM-58NQBX9H'); `,
          }}
        ></Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <LanguageProvider>
        <body className={inter.className}>
          <BackgroundOrbs />
          {children}
          <Analytics />
          <WhatsAppButton></WhatsAppButton>
          <Footer></Footer>
        </body>
      </LanguageProvider>
    </html>
  );
}
