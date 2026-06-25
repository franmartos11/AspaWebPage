"use client";
import React from "react";
import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Framer Motion", icon: "✨" },
];

export function TechStack() {
  return (
    <section className="py-24 bg-[#030303] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tecnología de Punta
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Utilizamos las herramientas más modernas del mercado para garantizar que tu producto sea rápido, seguro y escalable desde el primer día.
            </p>
          </motion.div>

          <motion.div 
            className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/20 transition-colors"
              >
                <div className="text-2xl">{tech.icon}</div>
                <span className="text-gray-300 font-medium">{tech.name}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
