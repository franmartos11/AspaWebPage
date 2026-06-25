"use client";
import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

function ServiceCard({
  href,
  img,
  title,
  text,
  delay,
  accentColor = "#3b82f6",
}: {
  href: string;
  img: string;
  title: string;
  text: string;
  delay: number;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [-300, 300], ["-20%", "120%"]);
  const glowY = useTransform(mouseY, [-300, 300], ["-20%", "120%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    // Intentionally left empty. Do not reset mouseX/mouseY to allow
    // the glow to fade out smoothly at the exit point.
  };

  return (
    <motion.a
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      title={title}
      href={href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative block w-full h-full rounded-[2rem] overflow-hidden bg-[#050505] shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Subtle border that glows on hover */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-blue-500/30 transition-colors duration-500 z-30 pointer-events-none" />

      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 60%)`,
        }}
      />

      {/* Image container */}
      <div className="relative w-full h-64 overflow-hidden bg-black rounded-b-3xl z-20">
        <Image
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
          src={img}
          alt={title}
          title={title}
          width={600}
          height={400}
        />
        {/* Inner shadow to blend image into background */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(5,5,5,0.9)] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-100 z-10" />
      </div>

      {/* Content Section */}
      <div className="relative z-30 flex flex-col p-8 pt-0 h-[calc(100%-14rem)]">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed flex-grow">
          {text}
        </p>

        {/* Action link */}
        <div className="mt-6 flex items-center text-sm font-bold tracking-wide text-blue-500 group-hover:text-blue-400 transition-colors">
          <span>Saber más</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

export default function ServicesPage() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestra Especialidad",
      txt1: "Nuestros Servicios",
      txt2: "Selecciona el servicio del que desees conocer más y descubre cómo impulsamos tu negocio.",
      card1: {
        title: "Aplicaciones a Medida",
        description: "Desarrollamos aplicaciones personalizadas que se adaptan exactamente a las necesidades operativas de tu empresa. Arquitectura escalable y código limpio.",
        img: "/amedida.jpg",
      },
      card2: {
        title: "Software CarCheck",
        description: "Software especializado en gestión integral para talleres mecánicos, optimizando el tiempo, el presupuesto y el control de vehículos en tiempo real.",
        img: "/desarrollado.jpg",
      },
      card3: {
        title: "Desarrollo Web",
        description: "Creamos páginas web institucionales y plataformas e-commerce de altísimo rendimiento con diseños ultra modernos y optimización SEO integral.",
        img: "/webdevelopment.webp",
      },
    },
    en: {
      badge: "Our Specialty",
      txt1: "Our Services",
      txt2: "Select the service you want to know more about and discover how we boost your business.",
      card1: {
        title: "Custom Applications",
        description: "We develop customized applications that fit exactly the operational needs of your company. Scalable architecture and clean code.",
        img: "/amedida.jpg",
      },
      card2: {
        title: "CarCheck Software",
        description: "Specialized software in comprehensive management for mechanical workshops, optimizing time, budget, and vehicle control in real time.",
        img: "/desarrollado.jpg",
      },
      card3: {
        title: "Web Development",
        description: "We create high-performance institutional websites and e-commerce platforms with ultra-modern designs and comprehensive SEO optimization.",
        img: "/webdevelopment.webp",
      },
    },
  };

  const content = texts[language] ?? texts.es;

  return (
    <section className="pt-32 pb-16 relative">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Header */}
      <motion.div
        className="container px-6 mx-auto relative z-20 text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-400/10">
          {content.badge}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {content.txt1}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {content.txt2}
        </p>
      </motion.div>
      
      {/* Cards Grid */}
      <div className="container px-6 mx-auto relative z-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          <ServiceCard
            delay={0.1}
            href={"/apps-a-medida"}
            img={content.card1.img}
            title={content.card1.title}
            text={content.card1.description}
          />
          <ServiceCard
            delay={0.3}
            href={"/carcheck"}
            img={content.card2.img}
            title={content.card2.title}
            text={content.card2.description}
          />
          <ServiceCard
            delay={0.5}
            href={"/desarrollo-web"}
            img={content.card3.img}
            title={content.card3.title}
            text={content.card3.description}
          />
        </div>
      </div>
    </section>
  );
}
