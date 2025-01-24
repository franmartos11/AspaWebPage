"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const texts = [
  "Maximiza tu Rentabilidad",
  "Optimiza tus Procesos",
  "Aumenta tu Productividad",
  "Gestión Integral del Taller",
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  // Cambia el texto cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-white overflow-hidden mt-[0rem] mb-[5rem]">
      {/* Contenedor principal */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 lg:py-32 gap-12">
        {/* Texto principal */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Optimiza tu Taller <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={texts[index]}
                className="text-blue-700 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {texts[index]}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Gestiona tu taller mecánico de forma <strong>integral</strong>, optimizando tu tiempo,
            mejorando la eficiencia de tus procesos y aumentando la productividad diaria.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a
              href="#demo"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Solicita una Demo
            </a>
            <a
              href="#features"
              className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300"
            >
              Ver Funcionalidades
            </a>
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

