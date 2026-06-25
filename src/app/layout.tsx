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
  title: "Aspa Software Development",
  description:
    "Potenciamos negocios con soluciones de software innovadoras. Aspa Software Development es una empresa líder en desarrollo de software especializada en automatizacion de procesos, aplicaciones a medida y paginas web.",
  keywords: ["aspa", "aspa software", "software", "software a medida", "pag web", "carcheck", "auditorias", "audit", "aspa carcheck"],
  icons: "/aspaLogo.webp",
  openGraph: {
    title: "Aspa Software Development",
    description: "Desarrollamos soluciones innovadoras para potenciar tu negocio. Automatizamos procesos, creamos apps y páginas web personalizadas.",
    url: "https://www.aspasoftware.com",
    siteName: "Aspa Software",
    images: [
      {
        url: "/aspaLogo.webp",
        width: 612,
        height: 612,
        alt: "Aspa Software Logo",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspa Software Development",
    description: "Soluciones de software innovadoras para tu negocio.",
    images: ["/aspaLogo.webp"],
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
