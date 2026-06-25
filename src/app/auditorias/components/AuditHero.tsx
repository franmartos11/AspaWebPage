"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "../../Components/AALenguageContext/LenguageContext";

export default function AuditHero() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "App de Auditorías",
      title1: "Control Total",
      title2: "en la palma de tu mano.",
      description:
        "Digitalizá los controles de calidad, seguridad e higiene. Realizá auditorías eficientes, completas y genera planes de acción con nuestra aplicación todo-en-uno.",
      cta: "Comenzar ahora",
    },
    en: {
      badge: "Audit App",
      title1: "Total Control",
      title2: "in the palm of your hand.",
      description:
        "Digitize quality, safety, and hygiene controls. Conduct efficient, comprehensive audits and generate action plans with our all-in-one application.",
      cta: "Start now",
    },
  };

  const t = texts[language] ?? texts.es;

  // Floating animations
  const floatAnimation = {
    initial: { y: 0, rotateX: 10, rotateY: -15, rotateZ: 5 },
    animate: { 
      y: [-10, 10, -10],
      rotateX: [10, 12, 10],
      rotateY: [-15, -13, -15],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden z-10">
      
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left pt-10 lg:pt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
                {t.badge}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              {t.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {t.title2}
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              {t.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              {t.cta}
            </motion.button>
          </motion.div>

          {/* Right Image/3D Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px]"
          >
            {/* Main Image */}
            <motion.div 
              {...floatAnimation}
              className="relative z-20 w-full max-w-[500px] aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/50 bg-[#050505]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay z-10 pointer-events-none" />
              <Image 
                src="/auditoria.jpeg" 
                alt="Audit App Dashboard" 
                fill 
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Floating Elements (Fake UI) */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 md:-left-12 z-30 bg-[#111] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Auditoría Aprobada</p>
                <p className="text-gray-400 text-xs">Sector Producción - 100%</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -top-6 -right-6 md:-right-10 z-30 bg-[#111] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Reporte PDF Generado</p>
                <p className="text-gray-400 text-xs">Enviado al cliente</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
