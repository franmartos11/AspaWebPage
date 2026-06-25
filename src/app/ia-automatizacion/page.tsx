import Nav from "../Components/nav/Nav";
import Form from "../Components/Forms/Form";
import { SparklesCore } from "../Components/HeroHome/SparklesCore";
import { HeroIA } from "./components/HeroIA";
import { ProcessIA } from "./components/ProcessIA";
import { BenefitsIA } from "./components/BenefitsIA";
import { ConsultingExamplesIA } from "./components/ConsultingExamplesIA";

export const metadata = {
  title: 'Consultoría en IA y Automatización de Procesos | Aspa Software',
  description: 'Automatizamos procesos e integramos soluciones de Inteligencia Artificial para potenciar la rentabilidad de tu negocio en Argentina. Consultores IA especializados.',
  keywords: [
    'automatización de procesos Argentina',
    'inteligencia artificial empresas',
    'consultoría IA Argentina',
    'chatbots empresariales',
    'RPA Argentina',
    'machine learning negocios',
    'transformación digital Argentina',
  ],
  alternates: { canonical: 'https://www.aspasoftware.com/ia-automatizacion' },
  openGraph: {
    title: 'IA y Automatización | Aspa Software',
    description: 'Integramos Inteligencia Artificial y automatizamos procesos para optimizar la rentabilidad de tu empresa.',
    url: 'https://www.aspasoftware.com/ia-automatizacion',
    siteName: 'Aspa Software',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'IA y Automatización - Aspa Software' }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría en IA y Automatización | Aspa Software',
    images: ['/og-image.png'],
  },
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
