"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function FaqSection() {
  const { language } = useLanguage("es");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const texts = {
    es: {
      badge: "Respuestas Clave",
      title: "Preguntas Frecuentes",
      faqs: [
        {
          question: "¿Cuánto tiempo toma desarrollar un sitio web?",
          answer: "El tiempo depende de la complejidad del proyecto. Una landing page o sitio corporativo simple puede tomar entre 2 a 4 semanas. Proyectos más complejos con funcionalidades a medida o e-commerce pueden llevar de 1 a 3 meses. Siempre establecemos un cronograma claro desde el principio."
        },
        {
          question: "¿Los sitios web están optimizados para celulares y SEO?",
          answer: "Absolutamente. Desarrollamos bajo el enfoque 'Mobile-First', garantizando que tu web se vea y funcione perfecto en cualquier dispositivo. Además, aplicamos las mejores prácticas de SEO técnico para que tu página posicione en los primeros lugares de Google desde el día uno."
        },
        {
          question: "¿Ofrecen mantenimiento después del lanzamiento?",
          answer: "Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, monitoreo de rendimiento, backups periódicos y soporte técnico para asegurarnos de que tu web siempre esté funcionando al 100%."
        },
        {
          question: "¿Puedo gestionar el contenido de mi web yo mismo?",
          answer: "¡Claro que sí! Integramos administradores de contenido (CMS) intuitivos que te permitirán actualizar textos, subir imágenes o agregar productos sin necesidad de tener conocimientos de programación."
        }
      ]
    },
    en: {
      badge: "Key Answers",
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "How long does it take to develop a website?",
          answer: "The timeline depends on project complexity. A landing page or simple corporate site can take 2 to 4 weeks. More complex projects with custom features or e-commerce can take 1 to 3 months. We always set a clear timeline from the start."
        },
        {
          question: "Are the websites optimized for mobile and SEO?",
          answer: "Absolutely. We develop using a 'Mobile-First' approach, ensuring your web looks and works perfectly on any device. We also apply technical SEO best practices so your page ranks high on Google from day one."
        },
        {
          question: "Do you offer post-launch maintenance?",
          answer: "Yes, we offer monthly maintenance plans that include security updates, performance monitoring, regular backups, and technical support to ensure your website is always running at 100%."
        },
        {
          question: "Can I manage my website content myself?",
          answer: "Of course! We integrate intuitive Content Management Systems (CMS) that allow you to update texts, upload images, or add products without needing any coding knowledge."
        }
      ]
    }
  };

  const t = texts[language] ?? texts.es;

  return (
    <div className="relative py-24 bg-black z-10">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
            {t.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl text-white font-bold">{t.title}</h3>
        </div>

        <div className="space-y-4">
          {t.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#0a0a0a] border-blue-500/30' : 'bg-transparent border-white/5 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-blue-400' : 'text-gray-200'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-blue-500/20 rotate-180' : 'bg-white/5'}`}>
                    <svg className={`w-5 h-5 ${isOpen ? 'text-blue-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
