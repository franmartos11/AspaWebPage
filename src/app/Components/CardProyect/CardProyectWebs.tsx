"use client";
import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { FeatureCard } from "../FeatureCard/FeatureCard";

export default function CardProyectWeb() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestro Servicio",
      title: "Desarrollo Web",
      subtitle: "¿Quieres aprovechar las ventajas del desarrollo web y llevar tu negocio al siguiente nivel? Contacta con nosotros y te ayudaremos a crear un sitio web personalizado que cumpla con tus necesidades y te impulse hacia el éxito.",
      text1: "Visibilidad global",
      desciption1: "Un sitio web te permite estar presente en el mercado digital las 24 horas del día, los 7 días de la semana, para clientes de todo el mundo. No solo amplías tu alcance, sino que también abres nuevas oportunidades de negocio.",
      text2: "Crecimiento del negocio",
      desciption2: "Un sitio web atractivo y funcional es una herramienta poderosa para atraer nuevos clientes, aumentar tus ventas y fidelizar a los clientes existentes a través de una experiencia online personalizada.",
      text3: "Imagen profesional",
      desciption3: "Un sitio web moderno y profesional es la carta de presentación de tu negocio en el mundo digital. Te ayuda a proyectar una imagen de confianza, seriedad y competencia.",
      text4: "Eficiencia y automatización",
      desciption4: "Optimiza procesos, automatiza tareas repetitivas y elimina la necesidad de personal para ciertas actividades. Ahorra tiempo y dinero para enfocarte en hacer crecer tu negocio.",
      text5: "Marketing digital",
      desciption5: "Es la base fundamental para implementar estrategias de marketing online efectivas. Llega a tu público objetivo, genera leads y conversiones, y finalmente impulsa tus ventas.",
    },
    en: {
      badge: "Our Service",
      title: "Web Development",
      subtitle: "Want to leverage the advantages of web development and take your business to the next level? Contact us and we'll help you create a personalized website that meets your needs and drives your success.",
      text1: "Global Visibility",
      desciption1: "A website allows you to be present in the digital market 24/7 for customers around the world. Not only do you expand your reach, but you also open up new business opportunities.",
      text2: "Business Growth",
      desciption2: "An attractive and functional website is a powerful tool to attract new customers, increase your sales, and retain existing clients through a personalized online experience.",
      text3: "Professional Image",
      desciption3: "A modern and professional website is your business's calling card in the digital world. It helps you project an image of trust, seriousness, and competence.",
      text4: "Efficiency and Automation",
      desciption4: "Optimize processes, automate repetitive tasks, and eliminate the need for personnel for certain activities. Save time and money to focus on growing your business.",
      text5: "Digital Marketing",
      desciption5: "It is the fundamental base for implementing effective online marketing strategies. Reach your target audience, generate leads and conversions, and ultimately boost your sales.",
    },
  };

  const t = texts[language] ?? texts.es;

  // Icons for features
  const icons = [
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>,
    <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
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
                src="/vpweb2.png"
                alt="Desarrollo Web"
                title="Desarrollo Web"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
