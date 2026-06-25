import Form from "../Components/Forms/Form";
import Nav from "../Components/nav/Nav";
import { AppleCardsCarouselDemo } from "../Components/ServicesDisplay/Popup";
import { CarcheckHero } from "./components/CarcheckHero";
import { CarcheckVentajas } from "./components/CarcheckVentajas";
import { PricingSaaS } from "./components/PricingSaaS";
import { CarcheckTutorials } from "./components/CarcheckTutorials";

export const metadata = {
  title: "Software para Talleres Mecánicos | CarCheck - Aspa Software",
  description:
    "CarCheck es el software de gestión ideal para talleres mecánicos. Digitalizá tu taller, administrá clientes, vehículos, órdenes de trabajo, presupuestos y mucho más.",
  keywords:
    "software para talleres mecánicos, carcheck, gestión de talleres, sistema taller, software automotriz, aspa software",
  robots: "index, follow",
  authors: [{ name: "Aspa Software" }],
  openGraph: {
    title: "CarCheck | Software para Talleres Mecánicos",
    description:
      "Gestioná tu taller mecánico con CarCheck: control total de clientes, vehículos y presupuestos.",
    url: "https://www.aspasoftware.com/carcheck",
    siteName: "Aspa Software",
    images: [
      {
        url: "/carcheck2bg2.png",
        width: 1200,
        height: 630,
        alt: "CarCheck de Aspa Software",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function CarCheckPage() {
  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <Nav page={"servicios"} />
      
      <div className="relative z-10">
        <CarcheckHero />
        <CarcheckVentajas />
        
        {/* We keep the features carousel but wrapped nicely in dark mode */}
        <section id="funcionalidades" className="py-16 bg-black relative z-10">
          <AppleCardsCarouselDemo />
        </section>

        <CarcheckTutorials />
        <PricingSaaS />
      </div>

      <Form service={"Carchek"} />
    </div>
  );
}
