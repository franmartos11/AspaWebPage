import type { Metadata } from "next";
import Form from "../Components/Forms/Form";
import Nav from "../Components/nav/Nav";
import { AppHero } from "./components/AppHero";
import Ventajas from "./Ventajas";
import DevelopmentMethodology from "./DevelopmentMethodology";
import { AppTechStack } from "./components/AppTechStack";
import { AppProjectsGrid } from "./components/AppProjectsGrid";

export const metadata: Metadata = {
  title: "Desarrollo de Apps a Medida | Mobile y Web",
  description:
    "Desarrollamos aplicaciones móviles y software a medida para empresas en Argentina. Soluciones personalizadas que se adaptan exactamente a las necesidades de tu negocio.",
  keywords: [
    "desarrollo de apps a medida Argentina",
    "aplicaciones móviles empresas",
    "software personalizado Buenos Aires",
    "app Android iOS Argentina",
    "desarrollo de software empresarial",
  ],
  alternates: { canonical: "https://www.aspasoftware.com/apps-a-medida" },
  openGraph: {
    title: "Apps a Medida | Aspa Software",
    description: "Creamos aplicaciones móviles y software personalizado para tu empresa en Argentina.",
    url: "https://www.aspasoftware.com/apps-a-medida",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Apps a Medida - Aspa Software" }],
  },
};

export default function AppsAMedidaPage() {
  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <Nav page={"servicios"}></Nav>
      
      <div className="relative z-10">
        <AppHero />
        <Ventajas />
        <DevelopmentMethodology />
        <AppTechStack />
        <AppProjectsGrid />
      </div>

      <Form service={"Apps-a-medida"}></Form>
    </div>
  );
}
