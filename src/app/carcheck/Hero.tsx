"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const { language, setLanguage } = useLanguage("es");

  const texts = {
    es: {
      texts: [
        "Maximiza tu Rentabilidad",
        "Optimiza tus Procesos",
        "Aumenta tu Productividad",
        "Gestión Integral del Taller",
      ],
      text2: "Optimiza tu Taller ",
      text3:
        "Gestiona tu taller mecánico de forma integral, optimizando tu tiempo, mejorando la eficiencia de tus procesos y aumentando la productividad diaria.",
      text4: "Solicita una Demo",
      text5: "Ver Funcionalidades",
    },
    en: {
      texts: [
        "Maximize Your Profitability",
        "Optimize Your Processes",
        "Increase Your Productivity",
        "Comprehensive Workshop Management",
      ],
      text2: "Optimize Your Workshop",
      text3:
        "Manage your mechanical workshop comprehensively, optimizing your time, improving the efficiency of your processes, and increasing daily productivity.",
      text4: "Request a Demo",
      text5: "View Features",
    },
  };

  // Cambia el texto cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts[language].texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative text-white overflow-hidden mt-[0rem] mb-[5rem]">
      {/* Contenedor principal */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 lg:py-32 gap-12">
        {/* Texto principal */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {texts[language].text2} <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={texts.es.texts[index]}
                className="text-blue-700 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {texts[language].texts[index]}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            {texts[language].text3}
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button
              onClick={scrollToForm}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            >
              {texts[language].text2}
            </button>
            <button
              onClick={scrollToForm}
              className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              {texts[language].text4}
            </button>
          </div>
        </div>

        {/* Imagen de dispositivos */}
        <div className="relative lg:w-1/2 flex justify-center">
          <Image
            src="/carcheck2bg2.png"
            alt="Software de Gestión para Talleres Mecánicos"
            width={700}
            height={500}
            className="object-contain drop-shadow-2xl"
            draggable={false}
          />
        </div>
      </div>

      {/* Efecto decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"></div>
    </section>
  );
};
