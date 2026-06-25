"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import React from "react";

// ─── Animated Graphic ──────────────────────────────────────────────────────────

const ObjectiveGraphic = () => {
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl" />
      
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        {/* Outer dashed ring */}
        <motion.circle
          cx="50" cy="50" r="40"
          stroke="#1e3a8a" strokeWidth="1" strokeDasharray="4 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle solid ring */}
        <motion.circle
          cx="50" cy="50" r="28"
          stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Target center */}
        <motion.circle
          cx="50" cy="50" r="10"
          fill="#3b82f6" fillOpacity="0.2"
          stroke="#60a5fa" strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        />

        {/* Ascending Line Graph */}
        <motion.path
          d="M 20 70 L 35 55 L 45 60 L 65 35 L 80 40"
          stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        />
        
        {/* Data points */}
        {[[20,70], [35,55], [45,60], [65,35], [80,40]].map(([x,y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r="2.5" fill="#fff"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 + (i * 0.15) }}
          />
        ))}

        {/* Arrow head on the last point */}
        <motion.path
          d="M 72 32 L 80 40 L 72 48"
          stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 2.1 }}
        />

        {/* Floating elements */}
        <motion.rect x="15" y="30" width="8" height="8" rx="2" fill="#3b82f6" fillOpacity="0.4"
          animate={{ y: [0, -10, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.polygon points="80,75 85,85 75,85" fill="#3b82f6" fillOpacity="0.4"
          animate={{ y: [0, 10, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default function ImageWithContent() {
  const { language } = useLanguage("es");
  const texts = {
    es: {
      badge: "Nuestro Objetivo",
      title: "Qué Buscamos",
      paragraph1: "Creamos Aspa con un propósito claro: brindar a las empresas sistemas de información que realmente impulsen sus resultados. Nuestro ideal es conocer a fondo tu necesidad para desarrollar la plataforma exacta que solucione un problema, agilice un proceso y te dé ventaja competitiva.",
      paragraph2: "Para nosotros, cada proyecto no es solo código, es una oportunidad para establecer bases sólidas para el crecimiento a largo plazo. Nos centramos en la colaboración estrecha y la comunicación transparente para cultivar relaciones de confianza y éxito mutuo.",
      bullet1: "Solución de problemas reales",
      bullet2: "Agilización de procesos",
      bullet3: "Crecimiento a largo plazo",
      button: "Iniciemos tu proyecto",
    },
    en: {
      badge: "Our Objective",
      title: "What We Look For",
      paragraph1: "We created Aspa with a clear purpose: to provide companies with information systems that truly drive results. Our ideal is to deeply understand your needs to develop the exact platform that solves a problem, streamlines a process, and gives you a competitive edge.",
      paragraph2: "For us, every project is not just code, it's an opportunity to lay solid foundations for long-term growth. We focus on close collaboration and transparent communication to cultivate relationships of trust and mutual success.",
      bullet1: "Solving real problems",
      bullet2: "Streamlining processes",
      bullet3: "Long-term growth",
      button: "Start your project",
    },
  };

  const content = texts[language] ?? texts.es;

  return (
    <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Animated Graphic */}
          <motion.div 
            className="order-last lg:order-first relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-blue-900/10 to-transparent border border-blue-500/10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-30">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" className="text-blue-500">
                <path d="M0 20h40M20 0v40" strokeWidth="1" strokeDasharray="2 4" />
              </svg>
            </div>
            <ObjectiveGraphic />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="inline-block text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10">
              {content.badge}
            </span>
            <h2 className="text-4xl md:text-5xl text-white font-bold tracking-tight mb-8">
              {content.title}
            </h2>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg mb-10">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
            </div>

            {/* Checkmarks */}
            <div className="flex flex-col gap-4 mb-12">
              {[content.bullet1, content.bullet2, content.bullet3].map((bullet, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{bullet}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/contact" className="inline-block">
              <motion.button
                className="relative px-8 py-4 rounded-full font-bold text-white overflow-hidden group border border-cyan-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background that reveals on hover */}
                <span className="absolute inset-0 bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  {content.button}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
