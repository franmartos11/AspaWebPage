"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function AppProjectsGrid() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestro Trabajo",
      title: "Apps Destacadas",
      button: "Ver Detalles",
    },
    en: {
      badge: "Our Work",
      title: "Featured Apps",
      button: "View Details",
    }
  };

  const t = texts[language] ?? texts.es;

  const projects = [
    {
      title: "Punto de Venta (POS)",
      category: "Gestión Comercial & Facturación",
      src: "/pos-app.png", 
      web: "#",
    },
    {
      title: "App Fitness & Gimnasios",
      category: "Salud & Deportes",
      src: "/ft-app-gym.jpeg",
      web: "#",
    },
    {
      title: "CarCheck App",
      category: "Gestión de Vehículos",
      src: "/carcheck-app.png", 
      web: "#",
    },
  ];

  return (
    <div className="relative py-24 lg:py-32 bg-black z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
            {t.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl text-white font-bold">{t.title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <Link href={project.web} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 block border border-white/5 bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-[#111] flex items-center justify-center text-white/20 text-sm z-0">
                  Cargando...
                </div>
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105 relative z-10 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500 z-20 pointer-events-none" />
              </Link>
              
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <Link 
                    href={project.web} 
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 -rotate-45 group-hover:rotate-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                <p className="text-gray-500 text-sm tracking-wide uppercase font-medium">
                  {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
