import Nav from "../Components/nav/Nav";
import Form from "../Components/Forms/Form";
import { SparklesCore } from "../Components/HeroHome/SparklesCore";
import { HeroIA } from "./components/HeroIA";
import { ProcessIA } from "./components/ProcessIA";
import { BenefitsIA } from "./components/BenefitsIA";
import { ConsultingExamplesIA } from "./components/ConsultingExamplesIA";

export const metadata = {
  title: 'Consultoría en IA y Automatización | Aspa Software',
  description: 'Automatizamos procesos e integramos soluciones de Inteligencia Artificial para potenciar la rentabilidad de tu negocio.',
};

export default function IAAutomationPage() {
  return (
    <main className="bg-black min-h-screen relative overflow-hidden font-sans text-white selection:bg-indigo-500/30">
      
      {/* Background Sparkles Effect */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={150}
          className="w-full h-full opacity-60"
          particleColor="#3b82f6" // Blue-500
        />
      </div>

      <Nav page={"servicios"}></Nav>

      <div className="relative z-10">
        <HeroIA />
        <ConsultingExamplesIA />
        <BenefitsIA />
        <ProcessIA />
      </div>

      <Form service="IA-Automatizacion"></Form>
    </main>
  );
}
