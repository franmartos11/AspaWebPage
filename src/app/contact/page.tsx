import type { Metadata } from "next";
import ContactCardImg from "./ContactCardImg";
import Nav from "../Components/nav/Nav";

export const metadata: Metadata = {
  title: "Contacto | Aspa Software",
  description:
    "Contactá a Aspa Software. Escribinos para desarrollar tu próxima página web, aplicación a medida o automatizar tu negocio con inteligencia artificial.",
  keywords: [
    "contacto aspa software",
    "presupuesto desarrollo web",
    "contratar agencia software",
    "desarrollo a medida contacto",
  ],
  alternates: { canonical: "https://www.aspasoftware.com/contact" },
  openGraph: {
    title: "Contacto | Aspa Software",
    description: "Contactanos hoy mismo para empezar tu proyecto tecnológico.",
    url: "https://www.aspasoftware.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contacto - Aspa Software" }],
  },
};

export default function ContactPage() {
  return (
    <div>
      <Nav page={"contact"}></Nav>
      <ContactCardImg></ContactCardImg>
    </div>
  );
}
