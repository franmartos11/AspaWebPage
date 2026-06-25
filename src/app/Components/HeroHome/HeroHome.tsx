"use client";
import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "./SparklesCore";
import { TextGenerateEffect } from "../GenerativeText/TextGenerateEffect";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import Link from "next/link";

export function HeroHome() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      tagline: "Impulsamos tu negocio con software a medida",
      cta1: "Ver Servicios",
      cta2: "Contáctanos",
      scroll: "Scroll",
    },
    en: {
      tagline: "We Boost Your Business with Custom Software",
      cta1: "View Services",
      cta2: "Contact Us",
      scroll: "Scroll",
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Título principal con animación */}
      <motion.h1
        className="text-4xl md:text-7xl lg:text-9xl font-bold text-center text-white relative z-20 px-4"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
          Aspa Software
        </span>
      </motion.h1>

      {/* Sparkles + tagline */}
      <div className="w-full max-w-[80rem] h-24 md:h-48 relative mt-2 md:mt-0">
        {/* Líneas decorativas */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Partículas */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={300}
          className="w-full h-full relative"
          particleColor="#87CEFA"
        />

        {/* Mask */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_190px_at_top,transparent_10%,white)]" />

        {/* Tagline animado */}
        <div className="absolute inset-0 w-full h-full">
          <div className="flex flex-col items-center pt-[0.5rem]">
            <div className="text-center pb-12 z-50 h-[150%] w-[90vw] md:w-[60vw]">
              <TextGenerateEffect words={texts[language].tagline} />
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center z-30 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <Link href="/servicios" title="Ver servicios de Aspa Software">
          <motion.span
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59,130,246,0.6)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {texts[language].cta1}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.span>
        </Link>
        <Link href="/contact" title="Contactar a Aspa Software">
          <motion.span
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {texts[language].cta2}
          </motion.span>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">{texts[language].scroll}</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5"
          animate={{ borderColor: ["#4b5563", "#3b82f6", "#4b5563"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 bg-blue-400 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
