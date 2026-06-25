"use client";
import React from "react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-black flex justify-center px-6">
      <motion.div 
        className="relative max-w-5xl w-full rounded-[2.5rem] p-10 md:p-16 overflow-hidden bg-[#080808] border border-white/10 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">transformar</span> tu negocio?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-0">
              Hablemos sobre tu proyecto y descubramos cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
          </div>
          
          <div className="md:w-1/3 flex justify-center md:justify-end w-full">
            <a 
              href="/contact" 
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] w-full md:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                Contáctanos ahora
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
