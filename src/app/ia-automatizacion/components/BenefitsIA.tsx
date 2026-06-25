"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function BenefitsIA() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Beneficios de la IA",
      title: "¿Por qué integrar IA en tu empresa?",
      subtitle: "La Inteligencia Artificial no es el futuro, es el presente. Descubrí cómo podemos potenciar tus resultados.",
      cards: [
        {
          title: "Automatización de Tareas Repetitivas",
          description: "Liberamos a tu equipo de tareas manuales y monótonas mediante robots de software (RPA) y scripts inteligentes, permitiéndoles enfocarse en tareas de alto valor.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        },
        {
          title: "Análisis Predictivo de Datos",
          description: "Utilizamos machine learning para analizar tu histórico de datos y predecir tendencias de mercado, comportamiento de clientes y fluctuaciones de demanda.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        },
        {
          title: "Atención al Cliente 24/7",
          description: "Implementamos agentes conversacionales avanzados (Chatbots con NLP) que pueden resolver dudas complejas, agendar turnos y cerrar ventas sin intervención humana.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        },
        {
          title: "Reducción de Errores Operativos",
          description: "Los sistemas automatizados y modelos de IA no sufren de fatiga. Garantizamos precisión absoluta en el procesamiento de datos y la gestión de inventarios.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        }
      ]
    },
    en: {
      badge: "AI Benefits",
      title: "Why integrate AI into your company?",
      subtitle: "Artificial Intelligence is not the future, it is the present. Discover how we can boost your results.",
      cards: [
        {
          title: "Repetitive Task Automation",
          description: "We free your team from manual and monotonous tasks using software robots (RPA) and smart scripts, allowing them to focus on high-value tasks.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        },
        {
          title: "Predictive Data Analysis",
          description: "We use machine learning to analyze your historical data and predict market trends, customer behavior, and demand fluctuations.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        },
        {
          title: "24/7 Customer Support",
          description: "We implement advanced conversational agents (Chatbots with NLP) that can resolve complex queries, schedule appointments, and close sales without human intervention.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        },
        {
          title: "Reduction of Operational Errors",
          description: "Automated systems and AI models do not suffer from fatigue. We guarantee absolute precision in data processing and inventory management.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        }
      ]
    }
  };

  const t = texts[language] ?? texts.es;

  return (
    <div className="py-24 bg-black relative z-10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
            {t.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl text-white font-bold mb-5">
            {t.title}
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center border border-white/10 mb-6 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-colors duration-300">
                <svg className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {card.icon}
                </svg>
              </div>
              
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {card.title}
              </h4>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
