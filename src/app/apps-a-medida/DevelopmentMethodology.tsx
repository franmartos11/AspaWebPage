"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

const steps = {
  es: [
    {
      id: 1,
      title: "Análisis de requisitos",
      description:
        "Nuestros asesores te contactarán para valorar cuál es la mejor solución de desarrollo de app para tu negocio.",
      icon: "/analisis.png",
    },
    {
      id: 2,
      title: "Análisis de marketing",
      description:
        "Estudiaremos desde una perspectiva de negocio qué funcionalidades pueden aportarte un mayor valor y cómo posicionar tu app en el mercado.",
      icon: "/analisisM.png",
    },
    {
      id: 3,
      title: "Diseño de UI",
      description:
        "Nuestros creativos diseñarán tu app asegurando en todo momento la mejor experiencia para el usuario.",
      icon: "/ui.png",
    },
    {
      id: 4,
      title: "Desarrollo",
      description:
        "Nuestro equipo de desarrolladores construirá tu aplicación utilizando las tecnologías más adecuadas (nativas o multiplataforma).",
      icon: "/desarrollo2.png",
    },
    {
      id: 5,
      title: "Testing",
      description:
        "Todas las funcionalidades pasarán por un entorno de prueba exhaustivo en el que verificaremos que todo esté correcto y libre de bugs.",
      icon: "/testing.png",
    },
    {
      id: 6,
      title: "Lanzamiento",
      description:
        "La publicación en las plataformas será cosa nuestra. Trabajaremos para la aprobación y distribución en Google Play y App Store.",
      icon: "/lanzamiento.png",
    },
  ],
  en: [
    {
      id: 1,
      title: "Requirement Analysis",
      description:
        "Our consultants will contact you to assess the best app development solution for your business.",
      icon: "/analisis.png",
    },
    {
      id: 2,
      title: "Marketing Analysis",
      description:
        "We will study which features can add the most value and how to position your app in the market.",
      icon: "/analisisM.png",
    },
    {
      id: 3,
      title: "UI Design",
      description:
        "Our creative team will design your app, ensuring the best user experience at all times.",
      icon: "/ui.png",
    },
    {
      id: 4,
      title: "Development",
      description:
        "Our team will build your application using the most suitable technologies (native or cross-platform).",
      icon: "/desarrollo2.png",
    },
    {
      id: 5,
      title: "Testing",
      description:
        "All functionalities will go through a comprehensive testing environment where we verify everything is bug-free.",
      icon: "/testing.png",
    },
    {
      id: 6,
      title: "Launch",
      description:
        "We will take care of publishing your app, handling approval and distribution on Google Play and the App Store.",
      icon: "/lanzamiento.png",
    },
  ],
};

const texts = {
  es: {
    badge: "Proceso Paso a Paso",
    title1: "Nuestra Metodología de ",
    title2: "Desarrollo de Apps",
    subtitle:
      "Trabajamos contigo en cada fase del proyecto, desde la definición de la idea hasta su publicación, pasando por el diseño, desarrollo y lanzamiento de tu aplicación.",
  },
  en: {
    badge: "Step by Step Process",
    title1: "Our Methodology for ",
    title2: "App Development",
    subtitle:
      "We work with you through every stage of the project, from defining the idea to publication, including design, development, and launch.",
  },
};

const DevelopmentMethodology: React.FC = () => {
  const { language } = useLanguage("es");
  const t = texts[language] ?? texts.es;
  const currentSteps = steps[language] ?? steps.es;

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden z-10" ref={containerRef}>
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
            {t.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl text-white font-bold mb-6">
            {t.title1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {t.title2}
            </span>
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          {/* Animated Central Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-blue-500 to-indigo-500 -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          {currentSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className="relative flex items-center justify-between md:justify-center w-full mb-16 md:mb-24 last:mb-0">
                
                {/* Node Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-blue-500 -translate-x-1/2 z-20">
                  <motion.div 
                    className="w-full h-full bg-blue-500 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                </div>

                {/* Content Container */}
                <div className={`w-full flex ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
                  
                  {/* Empty space for desktop alternating layout */}
                  <div className="hidden md:block w-1/2" />

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
                        0{step.id}
                      </span>
                      
                      <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center mb-6 shadow-lg relative z-10 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300">
                        <img src={step.icon} alt={step.title} className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                      </div>
                      
                      <h4 className="text-2xl font-bold text-white mb-4 relative z-10">
                        {step.title}
                      </h4>
                      
                      <p className="text-gray-400 leading-relaxed relative z-10">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentMethodology;
