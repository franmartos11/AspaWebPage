"use client";
import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { FeatureCard } from "../FeatureCard/FeatureCard";

export default function CardProyect() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestro Producto",
      title: "Software CarCheck",
      subtitle: "Nuestra aplicación especializada te permite gestionar tu taller mecánico de forma integral, optimizando tu tiempo y maximizando tu rentabilidad.",
      text1: "Gestionar clientes",
      desciption1: "Organiza la información de tus clientes, mejora la atención y optimiza tu negocio. Crea perfiles, accede al historial en tiempo real y ofrece un servicio personalizado.",
      text2: "Administrar vehículos",
      desciption2: "Registro detallado de información de vehículos: marca, modelo, matrícula, historial de servicios e imágenes del ingreso para documentar visualmente el estado del auto.",
      text3: "Órdenes de trabajo",
      desciption3: "Genera órdenes con detalles del vehículo, cliente y presupuesto. Asigna tareas a los mecánicos, rastrea el progreso y notifica al cliente del estado.",
      text4: "Presupuestos y facturas",
      desciption4: "Personaliza presupuestos con desglose de mano de obra y repuestos. Envía por email o WhatsApp para su aprobación rápida. Emite facturas digitales y mejora la administración.",
      text5: "Digitaliza procesos",
      desciption5: "Centraliza todo en una sola plataforma: registros de trabajo, toma de fotos y evidencias del taller. Mantén al cliente informado y ofrece un servicio transparente.",
    },
    en: {
      badge: "Our Product",
      title: "CarCheck Software",
      subtitle: "Our specialized application allows you to manage your mechanical workshop comprehensively, optimizing your time and maximizing your profitability.",
      text1: "Manage Clients",
      desciption1: "Organize client information, improve customer service, and optimize your business. Create profiles, access history in real-time, and offer personalized service.",
      text2: "Manage Vehicles",
      desciption2: "Detailed registration of vehicle information: make, model, license plate, service history, and entry images to visually document the car's condition.",
      text3: "Work Orders",
      desciption3: "Generate orders with vehicle, client, and budget details. Assign tasks to mechanics, track progress, and notify the client of the status.",
      text4: "Estimates and Invoices",
      desciption4: "Customize estimates with labor and parts breakdown. Send via email or WhatsApp for quick approval. Issue digital invoices and improve administration.",
      text5: "Digitize Processes",
      desciption5: "Centralize everything in a single platform: work logs, photo taking, and workshop evidence. Keep the client informed and offer transparent service.",
    },
  };

  const t = texts[language] ?? texts.es;

  // Icons for features
  const icons = [
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  ];

  return (
    <div className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {t.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Image Card (Left Side) */}
          <motion.div 
            className="lg:col-span-5 relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="sticky top-24 h-[600px] w-full rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
              <Image
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                src="/carcheck.webp"
                alt="CarCheck Software"
                title="CarCheck Software"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid (Right Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FeatureCard delay={0.1} title={t.text1} text={t.desciption1} icon={icons[0]} />
            </div>
            <FeatureCard delay={0.2} title={t.text2} text={t.desciption2} icon={icons[1]} />
            <FeatureCard delay={0.3} title={t.text3} text={t.desciption3} icon={icons[2]} />
            <FeatureCard delay={0.4} title={t.text4} text={t.desciption4} icon={icons[3]} />
            <FeatureCard delay={0.5} title={t.text5} text={t.desciption5} icon={icons[4]} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
