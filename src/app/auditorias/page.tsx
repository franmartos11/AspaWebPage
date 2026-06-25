import type { Metadata } from "next";
import Nav from "../Components/nav/Nav";
import AuditHero from "./components/AuditHero";
import AuditFeatures from "./components/AuditFeatures";
import MoovingLogos from "../Components/MoovingLogos/MoovingLogos";
import Form from "../Components/Forms/Form";

export const metadata: Metadata = {
  title: "Auditoría IT | Optimizá tu Infraestructura Tecnológica",
  description:
    "Auditamos tu infraestructura tecnológica, seguridad informática y rendimiento para identificar oportunidades de mejora. Servicio de auditoría IT en Argentina.",
  keywords: [
    "auditoría IT Argentina",
    "auditoría informática empresa",
    "seguridad informática Buenos Aires",
    "optimización tecnológica",
    "consultoría IT Argentina",
  ],
  alternates: { canonical: "https://www.aspasoftware.com/auditorias" },
  openGraph: {
    title: "Auditoría IT | Aspa Software",
    description: "Analizamos tu infraestructura, seguridad y rendimiento para optimizar tus recursos tecnológicos.",
    url: "https://www.aspasoftware.com/auditorias",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Auditoría IT - Aspa Software" }],
  },
};

export default function AuditoriasPage() {
    return (
        <main className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-hidden">
            <Nav page={"servicios"} />
            
            <AuditHero />
            
            <AuditFeatures />
            
            <MoovingLogos />
            
            <div className="py-16 relative z-10">
                <Form service="Auditorias" />
            </div>
        </main>
    );
}