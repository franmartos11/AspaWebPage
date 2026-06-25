"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function AppHero() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Desarrollo Nativo",
      title1: "Apps a Medida",
      title2: "para tu Negocio",
      description: "Creamos aplicaciones móviles excepcionales para iOS y Android que conectan con tu audiencia y potencian tu rentabilidad.",
      stats: [
        { value: "iOS &", label: "Android Nativo" },
        { value: "+50", label: "Apps Publicadas" },
        { value: "99%", label: "Crash-free rate" },
      ]
    },
    en: {
      badge: "Native Development",
      title1: "Custom Apps",
      title2: "for your Business",
      description: "We build exceptional mobile applications for iOS and Android that connect with your audience and boost your profitability.",
      stats: [
        { value: "iOS &", label: "Native Android" },
        { value: "+50", label: "Published Apps" },
        { value: "99%", label: "Crash-free rate" },
      ]
    }
  };

  const t = texts[language] ?? texts.es;

  return (
    <div className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden z-10">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
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

          {/* Right Content - 3D Mobile Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* The Phone Frame */}
            <motion.div 
              initial={{ rotateY: -15, rotateX: 5 }}
              animate={{ y: [-10, 10, -10], rotateY: -15, rotateX: 5 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[300px] h-[600px] rounded-[3rem] overflow-hidden border-[8px] border-[#1a1a1a] shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-black"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* iPhone Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-3xl z-30" />
              
              {/* Inner Screen */}
              <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/app-phone.png" // Updated to the new app phone image
                  alt="App Mockup"
                  fill
                  className="object-cover object-top opacity-80"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
              </div>
            </motion.div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 lg:right-0 top-1/4 bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">App Store</p>
                  <p className="text-blue-400 font-bold text-xs uppercase tracking-wider">Aprobado</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 lg:left-4 bottom-1/3 bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
            >
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Rendimiento</p>
                  <p className="text-green-400 font-bold">60 FPS</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
