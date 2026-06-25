"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function CarcheckHero() {
  const [index, setIndex] = useState(0);
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Software de Gestión Automotriz",
      dynamicTexts: [
        "Maximiza tu Rentabilidad",
        "Optimiza tus Procesos",
        "Aumenta tu Productividad",
        "Control Total de tu Taller",
      ],
      titlePrefix: "Revolucioná tu Taller ",
      subtitle:
        "Digitalizá tu taller mecánico. Gestioná clientes, vehículos, órdenes de trabajo y presupuestos desde una única plataforma inteligente y automatizada.",
      btnPrimary: "Agendar Demo",
      btnSecondary: "Ver Funcionalidades",
    },
    en: {
      badge: "Automotive Management Software",
      dynamicTexts: [
        "Maximize Your Profitability",
        "Optimize Your Processes",
        "Increase Your Productivity",
        "Total Control of Your Workshop",
      ],
      titlePrefix: "Revolutionize your Workshop ",
      subtitle:
        "Digitize your mechanical workshop. Manage clients, vehicles, work orders, and estimates from a single intelligent and automated platform.",
      btnPrimary: "Schedule Demo",
      btnSecondary: "View Features",
    },
  };

  const t = texts[language] ?? texts.es;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % t.dynamicTexts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [t.dynamicTexts.length]);

  const scrollToForm = () => {
    const formSection = document.getElementById("form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden z-10">
      
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start pt-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                {t.badge}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              {t.titlePrefix}
              <br />
              <div className="h-[1.2em] relative overflow-hidden mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="block absolute w-full"
                  >
                    {t.dynamicTexts[index]}
                  </motion.span>
                </AnimatePresence>
                {/* Invisible placeholder to maintain height */}
                <span className="opacity-0 pointer-events-none">
                  {t.dynamicTexts[0]}
                </span>
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed"
            >
              {t.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
              >
                {t.btnPrimary}
              </button>
              <button
                onClick={() => {
                  document.getElementById("funcionalidades")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                {t.btnSecondary}
              </button>
            </motion.div>
          </div>

          {/* Right Content - 3D Dashboard Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: [-10, 10, -10] }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 1 },
              rotateX: { duration: 1 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[2000px] w-full"
            style={{ perspective: "2000px" }}
          >
            {/* The Dashboard Frame */}
            <div 
              className="relative w-full max-w-[800px] aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.2)] bg-[#0a0a0a] group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glass Header (Fake browser top) */}
              <div className="absolute top-0 w-full h-8 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              {/* Dashboard Image */}
              <div className="relative w-full h-full mt-8">
                <Image
                  src="/carcheck2bg2.png"
                  alt="CarCheck Dashboard"
                  fill
                  className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Floating Notification (Fake) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl pointer-events-none"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Orden de Trabajo #402</p>
                    <p className="text-gray-400 text-xs">Completada con éxito</p>
                  </div>
                </motion.div>
              </div>

              {/* Gradient Overlay for blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
            </div>
            
            {/* Soft shadow below the dashboard */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
