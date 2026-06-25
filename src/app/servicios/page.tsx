import type { Metadata } from "next";
import { TracingBeamDemo } from "../Components/TricingBean/TracingBeamWrapper";
import Nav from "../Components/nav/Nav";
import ServicesPage from "../Components/servicesPage/ServicesPage";
import { Methodology } from "../Components/servicesPage/Methodology";
import { TechStack } from "../Components/servicesPage/TechStack";
import { CTA } from "../Components/servicesPage/CTA";

export const metadata: Metadata = {
  title: "Servicios de Software | Desarrollo Web, Apps e IA",
  description:
    "Descubrí todos los servicios de Aspa Software: desarrollo web, apps a medida, automatización con IA, auditorías IT y software CarCheck para talleres.",
  keywords: [
    "servicios de software Argentina",
    "desarrollo web y apps",
    "automatización IA empresa",
    "auditoría IT Argentina",
    "software a medida Buenos Aires",
  ],
  alternates: { canonical: "https://www.aspasoftware.com/servicios" },
  openGraph: {
    title: "Servicios | Aspa Software",
    description: "Desarrollo web, apps, IA y auditorías. Soluciones completas de software para tu empresa.",
    url: "https://www.aspasoftware.com/servicios",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Servicios de Aspa Software" }],
  },
};

export default function ServiciosPage() {
  return (
    <div className="bg-black">
      <Nav page={"servicios"}></Nav>
      <ServicesPage></ServicesPage>
      <Methodology></Methodology>
      <TechStack></TechStack>
      <TracingBeamDemo></TracingBeamDemo>
      <CTA></CTA>
    </div>
  );
}
