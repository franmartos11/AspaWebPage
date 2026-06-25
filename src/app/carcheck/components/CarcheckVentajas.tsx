"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function CarcheckVentajas() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      title1: "¿Por qué elegir ",
      title2: "CarCheck?",
      subtitle:
        "Gestiona tu taller de forma integral, optimizando procesos, ahorrando tiempo y mejorando la rentabilidad de tu negocio con nuestro software todo-en-uno.",
      benefits: [
        {
          id: "clientes",
          title: "Gestión de Clientes",
          description:
            "Organiza la información de tus clientes, accede a su historial en tiempo real y mejora la atención con un servicio personalizado.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
          colSpan: "md:col-span-2",
        },
        {
          id: "vehiculos",
          title: "Administra Vehículos",
          description:
            "Lleva un registro completo de vehículos, su estado, historial de servicios y adjunta imágenes de referencia.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
          colSpan: "md:col-span-1",
        },
        {
          id: "ordenes",
          title: "Órdenes de Trabajo",
          description:
            "Digitaliza tus procesos: asigna tareas, notifica a tus clientes y registra todo el trabajo con fotos y detalles.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          ),
          colSpan: "md:col-span-1",
        },
        {
          id: "facturacion",
          title: "Presupuestos y Facturas",
          description:
            "Genera presupuestos detallados, envía facturas electrónicas y agiliza la administración financiera de tu taller de forma automática.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          colSpan: "md:col-span-2",
        },
      ],
    },
    en: {
      title1: "Why Choose ",
      title2: "CarCheck?",
      subtitle:
        "Manage your workshop comprehensively, optimizing processes, saving time, and improving your business profitability with our all-in-one software.",
      benefits: [
        {
          id: "clientes",
          title: "Manage Clients",
          description:
            "Organize client information, access their history in real-time, and enhance customer service with a personalized approach.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
          colSpan: "md:col-span-2",
        },
        {
          id: "vehiculos",
          title: "Manage Vehicles",
          description:
            "Keep a complete record of vehicles, their condition, service history, and attach reference images for better control.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
          colSpan: "md:col-span-1",
        },
        {
          id: "ordenes",
          title: "Create Work Orders",
          description:
            "Digitize your processes: assign tasks, notify clients, and record all work with photos and service details.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          ),
          colSpan: "md:col-span-1",
        },
        {
          id: "facturacion",
          title: "Estimates and Invoices",
          description:
            "Generate detailed estimates, send electronic invoices, and streamline the financial management of your workshop automatically.",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          colSpan: "md:col-span-2",
        },
      ],
    },
  };

  const t = texts[language] ?? texts.es;

  return (
    <section className="relative py-12 lg:py-16 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-6 tracking-tight">
            {t.title1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              {t.title2}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${benefit.colSpan} relative group p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col justify-between`}
            >
              {/* Background Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-all duration-300 shadow-lg shadow-blue-500/5">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
