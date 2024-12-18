"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUserCog, FaCar, FaClipboardList, FaFileInvoice } from "react-icons/fa";

export const WhyBuyCarCheck = () => {
  return (
    <section className="py-16 px-6 ">
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Título Principal */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          ¿Por qué elegir <span className="text-blue-700">CarCheck</span>?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-[5rem]">
          Gestiona tu taller de forma <strong>integral</strong>, optimizando procesos, 
          ahorrando tiempo y mejorando la rentabilidad de tu negocio.
        </p>

        {/* Beneficios Clave */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {[
            {
              icon: <FaUserCog />,
              title: "Gestiona Clientes",
              description:
                "Organiza la información de tus clientes, accede a su historial en tiempo real y mejora la atención con un servicio personalizado.",
            },
            {
              icon: <FaCar />,
              title: "Administra Vehículos",
              description:
                "Lleva un registro completo de vehículos, su estado, historial de servicios y adjunta imágenes de referencia para mayor control.",
            },
            {
              icon: <FaClipboardList />,
              title: "Crea Órdenes de Trabajo",
              description:
                "Digitaliza tus procesos: asigna tareas, notifica a tus clientes y registra todo el trabajo con fotos y detalles del servicio.",
            },
            {
              icon: <FaFileInvoice />,
              title: "Presupuestos y Facturas",
              description:
                "Genera presupuestos detallados, envía facturas electrónicas y agiliza la administración de tu taller.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-blue-700 text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón Call-to-Action */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="#demo"
            className="px-8 py-4 bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
          >
            Solicita tu Demo Gratis
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
