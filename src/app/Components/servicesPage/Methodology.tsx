"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Descubrimiento",
    desc: "Entendemos a fondo tu negocio, tus objetivos y los de tus usuarios.",
  },
  {
    num: "02",
    title: "Diseño UI/UX",
    desc: "Creamos prototipos interactivos asegurando una experiencia visual increíble.",
  },
  {
    num: "03",
    title: "Desarrollo Ágil",
    desc: "Escribimos código limpio y escalable con entregas continuas y transparentes.",
  },
  {
    num: "04",
    title: "Lanzamiento y Soporte",
    desc: "Desplegamos tu producto y te acompañamos en su crecimiento y evolución.",
  },
];

export function Methodology() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-400/10">
            Nuestro Proceso
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cómo trabajamos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Convertimos ideas complejas en soluciones digitales excepcionales a
            través de una metodología probada y transparente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-3xl bg-[#080808] border border-white/5 group hover:border-blue-500/30 hover:bg-[#0a0a0a] transition-all duration-300"
            >
              <div className="text-5xl font-extrabold text-white/5 mb-6 group-hover:text-blue-500/10 transition-colors duration-300">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
              
              {/* Connector Line (visible only on lg screens) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10 group-hover:bg-blue-500/30 transition-colors" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
