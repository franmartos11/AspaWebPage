"use client";
import Form from "../Components/Forms/Form";
import Nav from "../Components/nav/Nav";
import dynamic from "next/dynamic";

const SparklesCore = dynamic(() => import("../Components/HeroHome/SparklesCore").then((mod) => mod.SparklesCore), { ssr: false });

const DesarrolloWebHero = dynamic(() => import("./components/DesarrolloWebHero").then((mod) => mod.DesarrolloWebHero), { ssr: false });
const TimelineProcess = dynamic(() => import("./components/TimelineProcess").then((mod) => mod.TimelineProcess), { ssr: false });
const TechStack = dynamic(() => import("./components/TechStack").then((mod) => mod.TechStack), { ssr: false });
const FaqSection = dynamic(() => import("./components/FaqSection").then((mod) => mod.FaqSection), { ssr: false });
const ProjectsGrid = dynamic(() => import("./components/ProjectsGrid").then((mod) => mod.ProjectsGrid), { ssr: false });

export default function DesarrolloWebPage() {
  return (
    <section className="bg-black min-h-screen relative overflow-hidden">
      {/* Background glow effects and Sparkles */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={200}
          className="w-full h-full opacity-50"
          particleColor="#87CEFA"
        />
      </div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10 transform -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-800/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <Nav page={"servicios"}></Nav>
      
      <div className="relative z-10">
        <DesarrolloWebHero />
        <TimelineProcess />
        <TechStack />
        <ProjectsGrid />
        <FaqSection />
      </div>
      
      <Form service="Pag-web"></Form>
    </section>
  );
}
