"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function DesarrolloWebHero() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Servicio Premium",
      title1: "Desarrollo Web",
      title2: "de Alto Rendimiento",
      description: "Diseñamos y desarrollamos sitios web rápidos, seguros y optimizados para SEO que convierten visitantes en clientes leales.",
      stats: [
        { value: "50+", label: "Proyectos Entregados" },
        { value: "+30%", label: "Conversión Promedio" },
        { value: "4.9/5", label: "Satisfacción del Cliente" },
      ]
    },
    en: {
      badge: "Premium Service",
      title1: "High-Performance",
      title2: "Web Development",
      description: "We design and develop fast, secure, and SEO-optimized websites that turn visitors into loyal customers.",
      stats: [
        { value: "50+", label: "Delivered Projects" },
        { value: "+30%", label: "Average Conversion" },
        { value: "4.9/5", label: "Customer Satisfaction" },
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
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full">
              {t.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - 3D Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px]"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[500px] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.3)] transform rotate-y-[-15deg] rotate-x-[5deg]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 left-0 w-full h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 z-20 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="relative w-full h-full pt-8 bg-[#0a0a0a]">
                <Image
                  src="/vpHome2.png"
                  alt="Web Development Mockup"
                  fill
                  className="object-cover object-top opacity-80"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/4 bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">SEO Score</p>
                  <p className="text-green-400 font-bold">100/100</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 bottom-1/3 bg-[#111] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
            >
               <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Performance</p>
                  <p className="text-blue-400 font-bold">A+</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
