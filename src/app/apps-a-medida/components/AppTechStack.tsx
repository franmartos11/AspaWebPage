"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function AppTechStack() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Stack Mobile",
      title: "Tecnologías que Usamos",
      description: "Construimos aplicaciones con las tecnologías más modernas, asegurando un rendimiento nativo impecable y escalabilidad a largo plazo.",
    },
    en: {
      badge: "Mobile Stack",
      title: "Technologies We Use",
      description: "We build applications with the most modern technologies, ensuring flawless native performance and long-term scalability.",
    }
  };

  const t = texts[language] ?? texts.es;

  const technologies = [
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "App Store", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
    { name: "Google Play", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
  ];

  return (
    <div className="relative py-24 lg:py-32 overflow-hidden z-10">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
            {t.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl text-white font-bold mb-6">{t.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center mb-4 shadow-lg group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 relative grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100">
                  <Image 
                    src={tech.icon} 
                    alt={tech.name} 
                    fill 
                    className={`object-contain ${tech.name === 'App Store' ? 'invert' : ''}`}
                    sizes="48px"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
