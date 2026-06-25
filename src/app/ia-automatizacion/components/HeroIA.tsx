"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function HeroIA() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Inteligencia Artificial",
      title1: "Transformá tu Negocio con",
      title2: "IA & Automatización",
      description: "Optimizamos tus procesos operativos, reducimos costos y potenciamos la toma de decisiones integrando soluciones inteligentes a medida de tu empresa.",
      stats: [
        { value: "24/7", label: "Operación Continua" },
        { value: "-40%", label: "Reducción de Costos Operativos" },
        { value: "100%", label: "Procesos Optimizados" },
      ]
    },
    en: {
      badge: "Artificial Intelligence",
      title1: "Transform your Business with",
      title2: "AI & Automation",
      description: "We optimize your operational processes, reduce costs, and empower decision-making by integrating intelligent solutions tailored to your company.",
      stats: [
        { value: "24/7", label: "Continuous Operation" },
        { value: "-40%", label: "Operational Cost Reduction" },
        { value: "100%", label: "Optimized Processes" },
      ]
    }
  };

  const t = texts[language] ?? texts.es;

  return (
    <div className="relative min-h-screen flex items-center pt-40 pb-16 overflow-hidden z-10">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {t.badge}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {t.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {t.title2}
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              {t.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 w-full">
              {t.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual representation of Neural Network / AI */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center w-full"
          >
            {/* Center Brain/Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-[40px] pointer-events-none" />

            {/* Neural Network Nodes SVG Animation */}
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px]">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Connecting Lines */}
              {[
                { x1: 200, y1: 200, x2: 100, y2: 100 },
                { x1: 200, y1: 200, x2: 300, y2: 80 },
                { x1: 200, y1: 200, x2: 320, y2: 240 },
                { x1: 200, y1: 200, x2: 220, y2: 330 },
                { x1: 200, y1: 200, x2: 80, y2: 250 },
                { x1: 100, y1: 100, x2: 300, y2: 80 },
                { x1: 300, y1: 80, x2: 320, y2: 240 },
                { x1: 320, y1: 240, x2: 220, y2: 330 },
                { x1: 220, y1: 330, x2: 80, y2: 250 },
                { x1: 80, y1: 250, x2: 100, y2: 100 }
              ].map((line, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                  stroke="url(#line-grad)" strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
                />
              ))}

              {/* Floating Data Pulses along lines */}
              {[
                { p1: {x: 200, y: 200}, p2: {x: 100, y: 100} },
                { p1: {x: 320, y: 240}, p2: {x: 200, y: 200} },
                { p1: {x: 80, y: 250}, p2: {x: 220, y: 330} }
              ].map((path, i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r="3" fill="#fff"
                  style={{ filter: "drop-shadow(0 0 5px #fff)" }}
                  animate={{
                    cx: [path.p1.x, path.p2.x],
                    cy: [path.p1.y, path.p2.y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.7 }}
                />
              ))}

              {/* Nodes */}
              {[
                { cx: 200, cy: 200, r: 16, delay: 0 },
                { cx: 100, cy: 100, r: 8, delay: 0.2 },
                { cx: 300, cy: 80, r: 10, delay: 0.4 },
                { cx: 320, cy: 240, r: 12, delay: 0.6 },
                { cx: 220, cy: 330, r: 9, delay: 0.8 },
                { cx: 80, cy: 250, r: 11, delay: 1 }
              ].map((node, i) => (
                <motion.g key={`node-${i}`}>
                  <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r}
                    fill="#111" stroke="#3b82f6" strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 + node.delay }}
                  />
                  <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r * 1.5}
                    fill="transparent" stroke="#3b82f6" strokeWidth="1"
                    animate={{ r: [node.r, node.r * 2, node.r], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
                  />
                </motion.g>
              ))}
            </svg>

            {/* Floating Info Boxes */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 lg:-right-4 top-1/4 bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Automatización</p>
                  <p className="text-blue-400 font-bold text-xs uppercase tracking-wider">Activada</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [15, -15, 15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-0 lg:-left-4 bottom-1/4 bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
            >
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Análisis de Datos</p>
                  <p className="text-cyan-400 font-bold">Tiempo Real</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
