
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer/Footer";
import WhatsAppButton from "./Components/WhatsAppLogo/WhatsAppButton";
import Script from "next/script";
import { LanguageProvider } from "./Components/AALenguageContext/LenguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Aspa Software",
    description:
        "Desarrollamos soluciones innovadoras para potenciar tu negocio. Automatizamos procesos, creamos apps y páginas web personalizadas. ¡Contáctanos!",
    icons: "/aspaLogo.webp",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <meta name="title" content="Aspa Software"></meta>
            <meta
                name="description"
                content="Potenciamos negocios con soluciones de software innovadoras. Aspa Software Development es una empresa líder en desarrollo de software especializada en automatizacion de procesos, aplicaciones a medida y paginas web. Nos diferenciamos por nuestro trato personalizado."
            ></meta>
            <meta
                name="keywords"
                content="aspa, aspa software, software, software a medida, pag web, carcheck, auditorias, audit, aspa carcheck"
            ></meta>
            <meta name="robots" content="index, follow"></meta>
            <meta
                http-equiv="Content-Type"
                content="text/html; charset=utf-8"
            ></meta>
            <meta name="language" content="Spanish"></meta>
            <head>

                <Script
                    id="gtm"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                    })(window,document,'script','dataLayer','GTM-58NQBX9H'); ` }}
                ></Script>

            </head>
            <LanguageProvider >
                <body className={inter.className} >
                    {children}
                    <WhatsAppButton></WhatsAppButton>
                    <Footer></Footer>
                </body>
            </LanguageProvider>
        </html>
    );
}
