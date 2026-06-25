"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function PricingSaaS() {
  const { language } = useLanguage("es");

  const plans = {
    es: [
      {
        name: "Plan Mensual",
        price: "50",
        period: "/mes",
        description: "Perfecto para talleres que recién comienzan a digitalizarse.",
        features: [
          "Gestión de clientes y vehículos",
          "Creación de órdenes de trabajo",
          "Presupuestos y facturas ilimitadas",
          "Soporte técnico 24/7",
        ],
        popular: false,
      },
      {
        name: "Plan Anual",
        price: "500",
        period: "/año",
        description: "La mejor opción para escalar tu taller con el máximo ahorro.",
        features: [
          "Todas las características del Plan Mensual",
          "Descuento del 20% (Ahorrás 100 USD)",
          "Capacitación inicial gratuita",
          "Actualizaciones premium incluidas",
        ],
        popular: true,
      },
    ],
    en: [
      {
        name: "Monthly Plan",
        price: "50",
        period: "/month",
        description: "Perfect for workshops just starting to go digital.",
        features: [
          "Client and vehicle management",
          "Work order creation",
          "Unlimited estimates and invoices",
          "24/7 technical support",
        ],
        popular: false,
      },
      {
        name: "Annual Plan",
        price: "500",
        period: "/year",
        description: "The best option to scale your workshop with maximum savings.",
        features: [
          "All features of the Monthly Plan",
          "20% discount (Save 100 USD)",
          "Free initial training",
          "Premium updates included",
        ],
        popular: true,
      },
    ],
  };

  const btn = {
    es: "Comenzar Ahora",
    en: "Get Started Now",
  };

  const texts = {
    es: {
      title1: "Planes Simples y ",
      title2: "Transparentes",
      subtitle:
        "Obtén acceso a todas las herramientas que necesitas para llevar tu taller al siguiente nivel, sin costos ocultos.",
      popularBadge: "MÁS ELEGIDO",
    },
    en: {
      title1: "Simple and ",
      title2: "Transparent Plans",
      subtitle:
        "Get access to all the tools you need to take your workshop to the next level, with no hidden fees.",
      popularBadge: "MOST POPULAR",
    },
  };

  const t = texts[language] ?? texts.es;
  const currentPlans = plans[language] ?? plans.es;

  return (
    <section className="py-16 lg:py-24 px-6 relative overflow-hidden bg-black z-10">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t.title1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              {t.title2}
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full bg-[#0a0a0a] transition-all duration-300 ${
                plan.popular 
                  ? "border border-blue-500/50 shadow-[0_0_50px_rgba(37,99,235,0.15)] transform md:-translate-y-4" 
                  : "border border-white/5 hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-lg shadow-blue-500/20 border border-blue-400/30">
                    {t.popularBadge}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-4xl md:text-5xl font-black text-white">
                  <span className="text-2xl text-gray-500 mr-1">$</span>
                  {plan.price}
                </span>
                <span className="text-gray-500 text-lg ml-2 font-medium">USD{plan.period}</span>
              </div>

              <div className="w-full h-px bg-white/5 mb-8" />

              <ul className="space-y-5 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
                onClick={() => {
                  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {btn[language] ?? btn.es}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
