import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer/Footer";
import WhatsAppButton from "./Components/WhatsAppLogo/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Aspa Software",
    description:
        "Potenciamos negocios con soluciones de software innovadoras. Aspa Software Development es una empresa líder en desarrollo de software especializada en automatizacion de procesos, aplicaciones a medida y paginas web. Nos diferenciamos por nuestro trato personalizado.",
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
            <body className={inter.className} >
                {children}
                <WhatsAppButton></WhatsAppButton>
                <Footer></Footer>
            </body>
        </html>
    );
}
