"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function ConsultingExamplesIA() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      badge: "Consultoría Personalizada",
      title: "Soluciones a Medida de tu Negocio",
      description: "No creemos en soluciones genéricas. Auditamos tus procesos y desarrollamos herramientas de Inteligencia Artificial que resuelven tus problemas reales. Algunos ejemplos de lo que podemos construir para vos:",
      examples: [
        {
          title: "Chatbots de Atención Inteligente",
          desc: "Asistentes virtuales con procesamiento de lenguaje natural (NLP) que responden consultas complejas, agendan citas y derivan ventas 24/7.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        },
        {
          title: "Automatización de Facturación y Datos",
          desc: "Sistemas RPA que extraen datos de PDFs, facturas o correos (OCR) y los cargan automáticamente en tu sistema contable sin errores.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        },
        {
          title: "Predicción de Demanda e Inventario",
          desc: "Modelos predictivos que analizan el historial de ventas para prever picos de demanda y optimizar el stock, evitando quiebres o excesos.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        },
        {
          title: "Asistentes Internos (Copilotos)",
          desc: "IA entrenada con los manuales y bases de datos de tu empresa para que tus empleados encuentren información al instante.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        },
        {
          title: "Análisis de Sentimiento de Clientes",
          desc: "Herramientas que leen miles de reseñas, correos y menciones en redes sociales para entender qué opinan tus clientes en tiempo real.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        },
        {
          title: "Generación de Reportes Automáticos",
          desc: "Bots que recopilan datos de múltiples plataformas (Google Ads, Meta, ERPs) y arman informes ejecutivos diarios en formato PDF o Excel.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        }
      ]
    },
    en: {
      badge: "Custom Consulting",
      title: "Solutions Tailored to Your Business",
      description: "We don't believe in generic solutions. We audit your processes and develop Artificial Intelligence tools that solve your real problems. Some examples of what we can build for you:",
      examples: [
        {
          title: "Intelligent Customer Service Chatbots",
          desc: "Virtual assistants with Natural Language Processing (NLP) that answer complex queries, schedule appointments, and drive sales 24/7.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        },
        {
          title: "Billing & Data Automation",
          desc: "RPA systems that extract data from PDFs, invoices, or emails (OCR) and load them automatically into your accounting system without errors.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        },
        {
          title: "Demand & Inventory Prediction",
          desc: "Predictive models that analyze sales history to forecast demand peaks and optimize stock, avoiding shortages or excesses.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        },
        {
          title: "Internal Assistants (Copilots)",
          desc: "AI trained with your company's manuals and databases so your employees can find information instantly.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        },
        {
          title: "Customer Sentiment Analysis",
          desc: "Tools that read thousands of reviews, emails, and social media mentions to understand what your customers think in real-time.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        },
        {
          title: "Automatic Report Generation",
          desc: "Bots that collect data from multiple platforms (Google Ads, Meta, ERPs) and put together daily executive reports in PDF or Excel.",
          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        }
      ]
    }
  };

  const t = texts[language] ?? texts.es;

  return (
    <div className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.examples.map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 hover:bg-[#111] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {example.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                {example.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {example.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
