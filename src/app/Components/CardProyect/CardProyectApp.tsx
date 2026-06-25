"use client";
import Image from "next/image";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { FeatureCard } from "../FeatureCard/FeatureCard";

export default function CardProyectApp() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestro Servicio",
      title: "Desarrollo de Apps a Medida",
      subtitle: "¿Estás listo para llevar tu negocio al siguiente nivel con una app a medida? Contacta con nosotros y te ayudaremos a crear una app que cumpla con tus necesidades y te impulse hacia el éxito.",
      text1: "Soluciones personalizadas",
      desciption1: "Olvídate de las limitaciones de las apps genéricas. Obtienes una solución que se adapta perfectamente a las necesidades específicas de tu negocio y a los flujos de trabajo de tus empleados.",
      text2: "Eficiencia y productividad",
      desciption2: "Automatiza tareas repetitivas, optimiza procesos y elimina la necesidad de personal para ciertas actividades. Esto te permite ahorrar tiempo, dinero y aumentar la productividad del equipo.",
      text3: "Mayor satisfacción del cliente",
      desciption3: "Una app intuitiva, fácil de usar y que ofrece una experiencia personalizada a tus clientes, aumenta su satisfacción y fidelización de manera significativa.",
      text4: "Ventaja competitiva",
      desciption4: "En un mercado cada vez más competitivo, tener software propio te permite diferenciarte del resto y ofrecer un valor único e inigualable a tus clientes.",
      text5: "Escalabilidad",
      desciption5: "A medida que tu negocio crece, tu app también puede crecer contigo. Se adapta a tus necesidades cambiantes y te permite seguir ofreciendo una experiencia excepcional.",
    },
    en: {
      badge: "Our Service",
      title: "Custom App Development",
      subtitle: "Ready to take your business to the next level with a custom app? Contact us and we'll help you create an app that meets your needs and drives your success.",
      text1: "Personalized Solutions",
      desciption1: "Forget the limitations of generic apps. You get a solution that perfectly fits the specific needs of your business and your employees' workflows.",
      text2: "Efficiency and Productivity",
      desciption2: "Automate repetitive tasks, optimize processes, and eliminate the need for personnel for certain activities. Save time, money, and increase team productivity.",
      text3: "Greater Customer Satisfaction",
      desciption3: "An intuitive, easy-to-use app that offers a personalized experience to your customers significantly increases their satisfaction and loyalty.",
      text4: "Competitive Advantage",
      desciption4: "In an increasingly competitive market, having your own software allows you to differentiate yourself and offer unique, unmatched value to your customers.",
      text5: "Scalability",
      desciption5: "As your business grows, your custom app can grow with you. It adapts to your changing needs and allows you to continue offering an exceptional experience.",
    },
  };

  const t = texts[language] ?? texts.es;

  // Icons for features
  const icons = [
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>,
    <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>,
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
                src="/apps-a-medida-3.jpg"
                alt="Apps a Medida"
                title="Apps a Medida"
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
