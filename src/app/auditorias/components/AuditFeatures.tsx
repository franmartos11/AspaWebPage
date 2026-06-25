"use client";
import Image from "next/image";
import { useLanguage } from "../../Components/AALenguageContext/LenguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

// Reusable Bento Feature Card
function FeatureCard({ title, text, delay, icon }: { title: string; text: string; delay: number; icon: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [-200, 200], ["-20%", "120%"]);
  const glowY = useTransform(mouseY, [-200, 200], ["-20%", "120%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative flex flex-col p-6 rounded-3xl bg-[#080808] border border-white/5 overflow-hidden group transition-all duration-500 hover:border-blue-500/30 hover:bg-[#0a0a0a]"
    >
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{
          left: glowX, top: glowY,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />
      
      <div className="relative z-20 flex items-center mb-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white ml-4 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-400 leading-relaxed relative z-20">
        {text}
      </p>
    </motion.div>
  );
}

export default function AuditFeatures() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Nuestro Producto",
      title: "Auditoría Inteligente",
      subtitle: "¿Estás listo para llevar tu negocio al siguiente nivel? Nuestra App te permite realizar auditorías eficientes, completas y 100% digitalizadas.",
      text1: "Responder auditorías",
      desciption1: "Completa auditorías respondiendo ítems predefinidos. Carga evidencia visual (fotos) y genera planes de acción con plazos para abordar las no conformidades. Todo exportable en PDF.",
      text2: "Registrar auditores",
      desciption2: "Crea perfiles con fotos y datos. Asigna auditorías pendientes a los responsables, facilitando la organización y seguimiento de los planes de acción asignados a cada uno.",
      text3: "Registrar auditorías",
      desciption3: "Define modelos de auditoría estandarizados que se pueden reutilizar para diferentes áreas o procesos, asegurando la consistencia y eficiencia en todas las evaluaciones.",
      text4: "Registrar preguntas",
      desciption4: "Define las preguntas o ítems específicos que se incluirán en cada modelo, permitiendo personalizar al 100% las evaluaciones según las necesidades de cada área.",
      text5: "Categorizar ítems",
      desciption5: "Organiza las preguntas en categorías temáticas. Esto facilita enormemente la navegación durante la auditoría y el análisis posterior de los resultados.",
      text6: "Generar informes",
      desciption6: "Crea reportes personalizados con indicadores clave, gráficos dinámicos y filtros avanzados para comprender a fondo el estado de la organización.",
    },
    en: {
      badge: "Our Product",
      title: "Smart Audit",
      subtitle: "Ready to take your business to the next level? Our app allows you to conduct efficient, comprehensive, and 100% digitized audits.",
      text1: "Conduct Audits",
      desciption1: "Complete audits by answering predefined items. Upload visual evidence (photos) and generate action plans with deadlines to address non-conformities. All exportable to PDF.",
      text2: "Register Auditors",
      desciption2: "Create profiles with photos and data. Assign pending audits to those responsible, facilitating the organization and tracking of action plans assigned to each one.",
      text3: "Register Audits",
      desciption3: "Define standardized audit models that can be reused for different areas or processes, ensuring consistency and efficiency in all evaluations.",
      text4: "Register Questions",
      desciption4: "Define the specific questions or items to be included in each model, allowing 100% customization of evaluations according to the needs of each area.",
      text5: "Categorize Items",
      desciption5: "Organize questions into thematic categories. This greatly facilitates navigation during the audit and subsequent analysis of the results.",
      text6: "Generate Reports",
      desciption6: "Create custom reports with key indicators, dynamic charts, and advanced filters to fully understand the state of the organization.",
    },
  };

  const t = texts[language] ?? texts.es;

  // Icons for features
  const icons = [
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>,
    <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    <svg key="6" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  ];

  return (
    <div className="relative py-12 lg:py-16 px-6 z-10">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
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
                src="/auditoria.jpeg"
                alt="Auditorías"
                title="Auditorías"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid (Right Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard delay={0.1} title={t.text1} text={t.desciption1} icon={icons[0]} />
            <FeatureCard delay={0.2} title={t.text2} text={t.desciption2} icon={icons[1]} />
            <FeatureCard delay={0.3} title={t.text3} text={t.desciption3} icon={icons[2]} />
            <FeatureCard delay={0.4} title={t.text4} text={t.desciption4} icon={icons[3]} />
            <FeatureCard delay={0.5} title={t.text5} text={t.desciption5} icon={icons[4]} />
            <FeatureCard delay={0.6} title={t.text6} text={t.desciption6} icon={icons[5]} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
