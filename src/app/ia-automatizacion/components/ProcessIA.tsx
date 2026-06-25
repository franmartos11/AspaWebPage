"use client";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function ProcessIA() {
  const { language } = useLanguage("es");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const texts = {
    es: {
      title: "Nuestro Proceso",
      subtitle: "De la teoría a la automatización total",
      steps: [
        {
          title: "Auditoría de Procesos",
          description: "Analizamos el flujo de trabajo de tu empresa para detectar cuellos de botella y tareas manuales repetitivas que pueden automatizarse.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        },
        {
          title: "Diseño de Solución IA",
          description: "Seleccionamos las mejores herramientas de Inteligencia Artificial y RPA (Automatización Robótica de Procesos) para resolver tus desafíos específicos.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        },
        {
          title: "Integración de Sistemas",
          description: "Conectamos tus bases de datos, CRMs y ERPs con los nuevos modelos inteligentes para que la información fluya sin intervención humana.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        },
        {
          title: "Despliegue y Capacitación",
          description: "Implementamos la solución de forma segura y capacitamos a tu equipo para interactuar y aprovechar al máximo las nuevas herramientas.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        },
        {
          title: "Monitoreo y Mejora Continua",
          description: "Los modelos de IA aprenden con el tiempo. Supervisamos los resultados y ajustamos los algoritmos para maximizar el ROI.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        }
      ]
    },
    en: {
      title: "Our Process",
      subtitle: "From theory to total automation",
      steps: [
        {
          title: "Process Audit",
          description: "We analyze your company's workflow to detect bottlenecks and repetitive manual tasks that can be automated.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        },
        {
          title: "AI Solution Design",
          description: "We select the best Artificial Intelligence and RPA (Robotic Process Automation) tools to solve your specific challenges.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        },
        {
          title: "System Integration",
          description: "We connect your databases, CRMs, and ERPs with the new intelligent models so information flows without human intervention.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        },
        {
          title: "Deployment & Training",
          description: "We securely implement the solution and train your team to interact with and make the most of the new tools.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        },
        {
          title: "Monitoring & Continuous Improvement",
          description: "AI models learn over time. We monitor results and adjust algorithms to maximize ROI.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        }
      ]
    }
  };

  const t = texts[language] ?? texts.es;

  return (
    <div className="relative py-24 lg:py-32 bg-[#050505] z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 relative">
        
        <div className="text-center mb-20">
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
            {t.title}
          </h2>
          <h3 className="text-4xl md:text-5xl text-white font-bold">{t.subtitle}</h3>
        </div>

        <div className="relative">
          {/* Main vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          {/* Progress line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-blue-500 -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          />

          <div className="space-y-12 md:space-y-0 relative">
            {t.steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center md:h-64 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                  
                  {/* Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`w-full md:w-1/2 pl-20 ${isEven ? 'md:pl-0 md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} group`}
                  >
                    <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} items-start relative`}>
                      <span className={`text-blue-500/50 font-black text-6xl md:text-7xl absolute opacity-20 -top-6 -left-4 md:-top-10 ${isEven ? 'md:left-auto md:-right-8' : 'md:-left-8'} select-none pointer-events-none`}>
                        0{index + 1}
                      </span>
                      <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-colors duration-300 relative w-full max-w-md">
                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
                      className="w-16 h-16 rounded-full bg-[#111] border-2 border-white/10 z-10 flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
                    >
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {step.icon}
                      </svg>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
