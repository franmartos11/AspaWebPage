"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function TimelineProcess() {
  const { language } = useLanguage("es");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const texts = {
    es: {
      title: "Nuestro Proceso",
      subtitle: "Del concepto a la realidad en 5 pasos",
      steps: [
        {
          title: "Descubrimiento",
          description: "Analizamos tu negocio, competencia y objetivos para trazar la estrategia digital perfecta.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        },
        {
          title: "Diseño UI/UX",
          description: "Creamos prototipos interactivos enfocados en la experiencia del usuario y la identidad visual de tu marca.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        },
        {
          title: "Desarrollo Frontend",
          description: "Programamos con tecnologías modernas (React, Next.js) para garantizar velocidad y animaciones fluidas.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        },
        {
          title: "Lanzamiento y SEO",
          description: "Optimizamos el código para buscadores y desplegamos tu web en servidores de alto rendimiento.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        },
        {
          title: "Soporte y Escalabilidad",
          description: "Monitoreamos el rendimiento y añadimos nuevas funcionalidades a medida que tu negocio crece.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        }
      ]
    },
    en: {
      title: "Our Process",
      subtitle: "From concept to reality in 5 steps",
      steps: [
        {
          title: "Discovery",
          description: "We analyze your business, competition, and goals to map out the perfect digital strategy.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        },
        {
          title: "UI/UX Design",
          description: "We create interactive prototypes focused on user experience and your brand's visual identity.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        },
        {
          title: "Frontend Development",
          description: "We code using modern technologies (React, Next.js) to guarantee speed and fluid animations.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        },
        {
          title: "Launch & SEO",
          description: "We optimize the code for search engines and deploy your website on high-performance servers.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        },
        {
          title: "Support & Scalability",
          description: "We monitor performance and add new features as your business continues to grow.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
