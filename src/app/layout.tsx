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
            <title>Aspa Software</title>
            <body className={inter.className}>
                {children}
                <WhatsAppButton></WhatsAppButton>
                <Footer></Footer>
            </body>
        </html>
    );
}
