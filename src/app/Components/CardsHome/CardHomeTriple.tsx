"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import React, { useRef } from "react";

// ─── SVG Icons (larger & refined) ─────────────────────────────────────────────

const PersonalizationIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <motion.circle cx="40" cy="28" r="11" stroke="#3b82f6" strokeWidth="2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    <motion.path d="M18 66c0-12.15 9.85-22 22-22s22 9.85 22 22"
      stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
    />
    {[0, 120, 240].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x = 40 + 28 * Math.cos(rad);
      const y = 28 + 28 * Math.sin(rad);
      return (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.2, duration: 0.4 }}
        >
          <circle cx={x} cy={y} r="6" fill="rgba(29,78,216,0.8)" stroke="#60a5fa" strokeWidth="1.5" />
          <motion.line x1="40" y1="28" x2={x} y2={y} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.35"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.9 + i * 0.2, duration: 0.4 }}
          />
        </motion.g>
      );
    })}
    <motion.circle cx="40" cy="28" r="18" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0"
      animate={{ r: [18, 26, 18], strokeOpacity: [0.3, 0, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </svg>
);

const QualityIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <motion.path
      d="M40 8L12 20v17c0 15 11.5 29.5 28 33 16.5-3.5 28-18 28-33V20L40 8z"
      stroke="#818cf8" strokeWidth="2" strokeLinejoin="round"
      fill="rgba(79,70,229,0.12)"
      initial={{ pathLength: 0, fillOpacity: 0 }}
      animate={{ pathLength: 1, fillOpacity: 1 }}
      transition={{ duration: 1.2 }}
    />
    <motion.path d="M28 40l8 8 16-17"
      stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
    />
    {[[14,12],[66,12],[10,54],[70,54]].map(([x,y], i) => (
      <motion.circle key={i} cx={x} cy={y} r="3" fill="#818cf8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0,1,0.7,1], scale: 1 }}
        transition={{ delay: 1.3 + i * 0.15, duration: 0.4 }}
      />
    ))}
  </svg>
);

const ClientIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <motion.circle cx="28" cy="25" r="9" stroke="#22d3ee" strokeWidth="2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8 }}
    />
    <motion.path d="M10 56c0-9.94 8.06-18 18-18s18 8.06 18 18"
      stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
    <motion.circle cx="56" cy="22" r="7.5" stroke="#67e8f9" strokeWidth="2"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
    <motion.path d="M42 56c0-7.73 6.27-14 14-14s14 6.27 14 14"
      stroke="#67e8f9" strokeWidth="2" strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    />
    <motion.path d="M36 37 L44 33"
      stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    />
    <motion.path d="M22 64 l4-5 l4 10 l4-16 l4 10 l4-5"
      stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
    />
  </svg>
);

// ─── Feature Card ──────────────────────────────────────────────────────────────

interface CardData {
  title: string;
  paragraph: string;
  features: string[];
  stat: string;
  statLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  borderGradient: string;
  featured?: boolean;
}

function FeatureCard({ card, delay }: { card: CardData; delay: number }) {
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
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-3xl overflow-hidden cursor-default"
      style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #111111 100%)" }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: card.borderGradient,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Mouse glow */}
      <motion.div
        className="pointer-events-none absolute w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          left: glowX, top: glowY,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${card.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Featured badge */}
      {card.featured && (
        <div className="absolute top-5 right-5 z-10">
          <motion.span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: `${card.glowColor.replace("0.15", "0.2")}`, color: card.accentColor, border: `1px solid ${card.accentColor}40` }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ★ Destacado
          </motion.span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-7 md:p-8">
        {/* Icon */}
        <div className="w-20 h-20 mb-7 flex-shrink-0">
          {card.icon}
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold mb-3 transition-colors duration-300"
          style={{ color: card.featured ? card.accentColor : "white" }}
        >
          {card.title}
        </h3>

        {/* Paragraph */}
        <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-6">
          {card.paragraph}
        </p>

        {/* Feature list */}
        <ul className="space-y-2.5 mb-7 flex-1">
          {card.features.map((feat, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + i * 0.1 }}
              className="flex items-start gap-2.5 text-sm text-gray-300"
            >
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke={card.accentColor} strokeOpacity="0.3" />
                <path d="M5 8l2 2 4-4" stroke={card.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {feat}
            </motion.li>
          ))}
        </ul>

        {/* Divider */}
        <motion.div
          className="h-px mb-6"
          style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}50, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.5 }}
        />

        {/* Stat */}
        <div className="flex items-center justify-between">
          <div>
            <motion.p
              className="text-3xl font-black"
              style={{ color: card.accentColor }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.6 }}
            >
              {card.stat}
            </motion.p>
            <p className="text-gray-600 text-xs mt-0.5">{card.statLabel}</p>
          </div>
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: `1px solid ${card.accentColor}40`, color: card.accentColor }}
            whileHover={{ scale: 1.2, backgroundColor: `${card.accentColor}15` }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export interface CardHomeProps { title: string; paragraph: string; img: string; }

export default function CardHomeTriple() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      title: "En Qué Nos Diferenciamos",
      subtitle: "No somos una empresa genérica de software. Estos son los pilares que nos distinguen.",
      cards: [
        {
          title: "Personalización Total",
          paragraph: "Olvidate de las soluciones enlatadas. En Aspa, cada línea de código se escribe pensando en tu negocio, tus procesos y tus objetivos específicos.",
          features: [
            "Análisis profundo de tus necesidades antes de escribir código",
            "Arquitectura diseñada para escalar con tu negocio",
            "Iteraciones continuas hasta que encaje perfecto",
          ],
          stat: "100%", statLabel: "proyectos a medida",
          accentColor: "#3b82f6",
          glowColor: "rgba(59,130,246,0.15)",
          borderGradient: "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(59,130,246,0.05) 50%, rgba(59,130,246,0.2))",
          icon: <PersonalizationIcon />,
        },
        {
          title: "Calidad sin Compromiso",
          paragraph: "No entregamos software que funcione; entregamos software que impresiona. Cada feature pasa por testing riguroso y revisión de calidad antes de llegar a tus manos.",
          features: [
            "Testing automatizado con cobertura de +90%",
            "Code reviews y auditorías de seguridad",
            "Soporte post-entrega incluido en todos los proyectos",
          ],
          stat: "+95%", statLabel: "satisfacción de clientes",
          accentColor: "#818cf8",
          glowColor: "rgba(129,140,248,0.15)",
          borderGradient: "linear-gradient(135deg, rgba(129,140,248,0.5), rgba(79,70,229,0.05) 50%, rgba(129,140,248,0.3))",
          icon: <QualityIcon />,
          featured: true,
        },
        {
          title: "Orientación al Cliente",
          paragraph: "Tu éxito no termina el día del deploy. Estamos presentes en cada etapa, desde la idea inicial hasta el crecimiento de tu producto en producción.",
          features: [
            "Comunicación directa con el equipo de desarrollo",
            "Documentación clara y transferencia de conocimiento",
            "Soporte reactivo y proactivo post-lanzamiento",
          ],
          stat: "24/7", statLabel: "soporte disponible",
          accentColor: "#22d3ee",
          glowColor: "rgba(34,211,238,0.12)",
          borderGradient: "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(6,182,212,0.05) 50%, rgba(34,211,238,0.2))",
          icon: <ClientIcon />,
        },
      ],
    },
    en: {
      title: "What Sets Us Apart",
      subtitle: "We're not a generic software company. These are the pillars that distinguish us.",
      cards: [
        {
          title: "Total Personalization",
          paragraph: "Forget off-the-shelf solutions. At Aspa, every line of code is written with your business, processes, and specific goals in mind.",
          features: [
            "Deep analysis of your needs before writing code",
            "Architecture designed to scale with your business",
            "Continuous iterations until it fits perfectly",
          ],
          stat: "100%", statLabel: "custom projects",
          accentColor: "#3b82f6",
          glowColor: "rgba(59,130,246,0.15)",
          borderGradient: "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(59,130,246,0.05) 50%, rgba(59,130,246,0.2))",
          icon: <PersonalizationIcon />,
        },
        {
          title: "Uncompromising Quality",
          paragraph: "We don't deliver software that works; we deliver software that impresses. Every feature goes through rigorous testing and quality review.",
          features: [
            "Automated testing with +90% coverage",
            "Code reviews and security audits",
            "Post-delivery support included in all projects",
          ],
          stat: "+95%", statLabel: "client satisfaction",
          accentColor: "#818cf8",
          glowColor: "rgba(129,140,248,0.15)",
          borderGradient: "linear-gradient(135deg, rgba(129,140,248,0.5), rgba(79,70,229,0.05) 50%, rgba(129,140,248,0.3))",
          icon: <QualityIcon />,
          featured: true,
        },
        {
          title: "Client Orientation",
          paragraph: "Your success doesn't end on deploy day. We're present at every stage, from the initial idea to growing your product in production.",
          features: [
            "Direct communication with the dev team",
            "Clear documentation and knowledge transfer",
            "Reactive and proactive post-launch support",
          ],
          stat: "24/7", statLabel: "support available",
          accentColor: "#22d3ee",
          glowColor: "rgba(34,211,238,0.12)",
          borderGradient: "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(6,182,212,0.05) 50%, rgba(34,211,238,0.2))",
          icon: <ClientIcon />,
        },
      ],
    },
  };

  const current = texts[language] ?? texts.es;

  return (
    <div className="min-h-screen flex flex-col justify-center py-20">
      {/* Section header */}
      <motion.div
        className="text-center mb-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
          {current.title}
        </h2>
        <div className="flex justify-center gap-1 mb-5">
          <motion.span className="h-1 bg-blue-500 rounded-full"
            initial={{ width: 0 }} whileInView={{ width: "8rem" }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <span className="w-3 h-1 bg-blue-500 rounded-full" />
          <span className="w-1 h-1 bg-blue-500 rounded-full" />
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{current.subtitle}</p>
      </motion.div>

      {/* Cards */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {current.cards.map((card, i) => (
            <FeatureCard key={card.title} card={card} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </div>
  );
}
