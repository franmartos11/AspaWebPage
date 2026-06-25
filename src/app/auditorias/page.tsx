import Nav from "../Components/nav/Nav";
import AuditHero from "./components/AuditHero";
import AuditFeatures from "./components/AuditFeatures";
import MoovingLogos from "../Components/MoovingLogos/MoovingLogos";
import Form from "../Components/Forms/Form";

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