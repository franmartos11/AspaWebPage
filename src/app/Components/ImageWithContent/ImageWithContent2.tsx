"use client";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import React, { useRef } from "react";

// Animated Network Graphic Component
const NetworkGraphic = () => {
  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center">
      {/* Ambient core glow */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        
        {/* Core rotating rings */}
        <motion.circle cx="50" cy="50" r="35" stroke="#1e3a8a" strokeWidth="0.5" strokeDasharray="2 4"
          animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="50" cy="50" r="45" stroke="#1e3a8a" strokeWidth="0.5" strokeDasharray="4 8"
          animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />

        {/* Network connections (Lines) */}
        {[
          "M50 50 L25 25", "M50 50 L75 30", "M50 50 L30 75", "M50 50 L80 70",
          "M25 25 L10 50", "M75 30 L90 50", "M30 75 L10 50", "M80 70 L90 50",
          "M25 25 L75 30", "M30 75 L80 70"
        ].map((path, i) => (
          <motion.path
            key={i} d={path} stroke="#1e40af" strokeWidth="1" strokeOpacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
          />
        ))}

        {/* Moving data packets along main paths */}
        {[
          "M50 50 L25 25", "M50 50 L75 30", "M50 50 L80 70", "M30 75 L50 50"
        ].map((path, i) => (
          <motion.path
            key={`data-${i}`} d={path} stroke="#60a5fa" strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0, strokeDasharray: "0 100" }}
            animate={{ pathLength: 1, opacity: [0, 1, 0], strokeDasharray: ["0 100", "20 100", "0 100"] }}
            transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Network Nodes */}
        {(
          [
            [50, 50, 4, "#3b82f6"], // Center
            [25, 25, 2.5, "#60a5fa"], [75, 30, 2.5, "#60a5fa"], 
            [30, 75, 2.5, "#60a5fa"], [80, 70, 2.5, "#60a5fa"],
            [10, 50, 1.5, "#93c5fd"], [90, 50, 1.5, "#93c5fd"]
          ] as [number, number, number, string][]
        ).map(([cx, cy, r, color], i) => (
          <g key={`node-${i}`}>
            {/* Outer pulse */}
            <motion.circle cx={cx} cy={cy} r={r} fill={color} opacity="0.2"
              animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Inner solid node */}
            <motion.circle cx={cx} cy={cy} r={r} fill={color}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 + (i * 0.1) }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// Interactive Glass Card Component
function GlassCard({ children, className = "", delay = 0, noPadding = false }: { children: React.ReactNode; className?: string; delay?: number; noPadding?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [-300, 300], ["-50%", "150%"]);
  const glowY = useTransform(mouseY, [-300, 300], ["-50%", "150%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 group ${className}`}
      style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.02)" }}
    >
      {/* Dynamic Glow */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          left: glowX, top: glowY,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
      
      <div className={`relative z-10 h-full w-full flex flex-col ${noPadding ? "" : "p-8 md:p-10"}`}>
        {children}
      </div>
    </motion.div>
  );
}

export default function ImageWithContent2() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestra Identidad",
      title: "Quiénes Somos",
      paragraph1: "Somos un equipo apasionado y diverso de profesionales dedicados a la excelencia y la innovación en tecnología. Fundada por dos programadores visionarios y un especialista en marketing, diseño y ventas, combinamos creatividad, tecnología avanzada y estrategia empresarial.",
      paragraph2: "En el núcleo de Aspa, creemos firmemente en el poder del trabajo en equipo y en la diversidad de perspectivas. Nuestro enfoque integral asegura que cada proyecto se ejecute con precisión, brindando resultados excepcionales y comercialmente viables.",
      button: "Hablemos de tu proyecto",
      stat1: "+5 Años", stat1Label: "De Experiencia Conjunta",
      stat2: "100%", stat2Label: "Compromiso",
    },
    en: {
      badge: "Our Identity",
      title: "Who Are We",
      paragraph1: "We are a passionate and diverse team of professionals dedicated to excellence and innovation in technology. Founded by two visionary programmers and a specialist in marketing, design, and sales, we combine creativity, advanced technology, and business strategy.",
      paragraph2: "At the core of Aspa, we firmly believe in the power of teamwork and the diversity of perspectives. Our holistic approach ensures that each project is executed with precision, delivering exceptional and commercially viable results.",
      button: "Let's talk about your project",
      stat1: "+5 Years", stat1Label: "Combined Experience",
      stat2: "100%", stat2Label: "Commitment",
    },
  };

  const content = texts[language] ?? texts.es;

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-black">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Top Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Main Text Card (Left/Top) */}
          <div className="lg:col-span-8">
            <GlassCard delay={0.1} className="h-full">
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    {content.badge}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {content.title}
                </h1>
                <div className="space-y-4 text-gray-400 text-lg leading-relaxed max-w-3xl">
                  <p>{content.paragraph1}</p>
                  <p>{content.paragraph2}</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Logo Showcase Card (Right/Top) */}
          <div className="lg:col-span-4 min-h-[350px]">
            <GlassCard delay={0.2} noPadding className="h-full w-full bg-gradient-to-br from-[#111] to-[#050505]">
              <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden min-h-[350px]">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 w-full p-4"
                >
                  <NetworkGraphic />
                </motion.div>
              </div>
            </GlassCard>
          </div>
          
        </div>

        {/* Bottom Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat 1 */}
          <GlassCard delay={0.3} className="bg-gradient-to-t from-blue-900/10 to-transparent">
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-md">
                {content.stat1}
              </div>
              <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.2em]">
                {content.stat1Label}
              </div>
            </div>
          </GlassCard>

          {/* Stat 2 */}
          <GlassCard delay={0.4} className="bg-gradient-to-t from-blue-900/10 to-transparent">
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-md">
                {content.stat2}
              </div>
              <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.2em]">
                {content.stat2Label}
              </div>
            </div>
          </GlassCard>

          {/* CTA Box */}
          <GlassCard delay={0.5} noPadding>
            <Link title="Contact" href="/contact" className="flex-1 w-full h-full flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600 transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full p-8">
                <span className="text-white font-bold text-xl mb-3">{content.button}</span>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-blue-600 transition-colors duration-300">
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
