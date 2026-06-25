"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";

const plans = {
  es: [
    {
      name: "Plan Mensual",
      price: "50 USD/mes",
      features: [
        "Gestión de clientes y vehículos",
        "Creación de órdenes de trabajo",
        "Presupuestos y facturas ilimitadas",
        "Soporte técnico 24/7",
      ],
    },
    {
      name: "Plan Anual",
      price: "500 USD/año",
      features: [
        "Todas las características del Plan Mensual",
        "Descuento del 20% en el pago anual",
        "Capacitación inicial gratuita",
        "Actualizaciones premium incluidas",
      ],
      popular: true,
    },
  ],
  en: [
    {
      name: "Monthly Plan",
      price: "50 USD/month",
      features: [
        "Client and vehicle management",
        "Work order creation",
        "Unlimited estimates and invoices",
        "24/7 technical support",
      ],
    },
    {
      name: "Annual Plan",
      price: "500 USD/year",
      features: [
        "All features of the Monthly Plan",
        "20% discount on annual payment",
        "Free initial training",
        "Premium updates included",
      ],
      popular: true,
    },
  ],
};

const btn = {
  es: "Elegir Plan",
  en: "Choose Plan",
};

const text = {
  es: {
    text2: "Elige tu ",
    text3: "Plan Perfecto",
    text4:
      "Obtén acceso a todas las herramientas que necesitas para llevar tu taller al siguiente nivel.",
    popularBadge: "MÁS ELEGIDO",
  },
  en: {
    text2: "Choose your ",
    text3: "Perfect Plan",
    text4:
      "Get access to all the tools you need to take your workshop to the next level.",
    popularBadge: "MOST POPULAR",
  },
};

export const PricingSection = () => {
  const { language } = useLanguage("es");

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="container mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          {text[language].text2}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            {text[language].text3}
          </span>
        </h2>
        <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
          {text[language].text4}
        </p>

        {/* Tarjetas de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans[language].map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border transition-all duration-300 text-left flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 ${
                plan.popular ? "border-blue-500/60 shadow-blue-500/10" : "border-white/10 hover:border-blue-500/30"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg shadow-blue-500/30">
                    {text[language].popularBadge}
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                {plan.name}
              </h3>
              <p className="text-4xl sm:text-5xl font-extrabold text-white mb-8">
                {plan.price.split("/")[0]}
                <span className="text-xl text-gray-400 font-medium">/{plan.price.split("/")[1]}</span>
              </p>
              
              <ul className="text-gray-300 mb-10 space-y-4 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button 
                className={`w-full py-4 rounded-xl font-semibold transition-colors duration-300 ${
                  plan.popular 
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {btn[language]}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
