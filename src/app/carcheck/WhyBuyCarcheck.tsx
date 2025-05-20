"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaCar,
  FaClipboardList,
  FaFileInvoice,
} from "react-icons/fa";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

const content = {
  es: {
    title: "¿Por qué elegir ",
    description:
      "Gestiona tu taller de forma integral, optimizando procesos, ahorrando tiempo y mejorando la rentabilidad de tu negocio.",
    benefits: [
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
    ],
    button: "Solicita una reunion",
  },
  en: {
    title: "Why Choose",
    description:
      "Manage your workshop comprehensively, optimizing processes, saving time, and improving your business profitability.",
    benefits: [
      {
        icon: <FaUserCog />,
        title: "Manage Clients",
        description:
          "Organize client information, access their history in real-time, and enhance customer service with a personalized approach.",
      },
      {
        icon: <FaCar />,
        title: "Manage Vehicles",
        description:
          "Keep a complete record of vehicles, their condition, service history, and attach reference images for better control.",
      },
      {
        icon: <FaClipboardList />,
        title: "Create Work Orders",
        description:
          "Digitize your processes: assign tasks, notify clients, and record all work with photos and service details.",
      },
      {
        icon: <FaFileInvoice />,
        title: "Estimates and Invoices",
        description:
          "Generate detailed estimates, send electronic invoices, and streamline the management of your workshop.",
      },
    ],
    button: "Request a Meeting",
  },
};

export const WhyBuyCarCheck = () => {
  const { language } = useLanguage("es"); // Gestión del idioma
  const langContent = content[language];
  const scrollToForm = () => {
    const formSection = document.getElementById("form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };
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
          {langContent.title} <span className="text-blue-700">CarCheck ?</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-[5rem]">
          {langContent.description}
        </p>

        {/* Beneficios Clave */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {langContent.benefits.map((item, index) => (
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
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
          >
            {langContent.button}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
