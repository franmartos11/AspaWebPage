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
    },
  ],
};

const btn = {
  es: 'Elegir Plan',
  en: 'Choose Plan',
};

const text = {
  es: {
    text2: 'Elige tu ',
    text3: 'Plan Perfecto',
    text4: 'Obtén acceso a todas las herramientas que necesitas para llevar tu taller al siguiente nivel.',
    text5: 'Ver Funcionalidades',
  },
  en: {
    text2: 'Choose your ',
    text3: 'Perfect Plan',
    text4: 'Get access to all the tools you need to take your workshop to the next level.',
    text5: 'View Features',
  },
};



export const PricingSection = () => {
  
  // lenguaje function
  const { language, setLanguage } = useLanguage('es');
    
  return (
    <section className="py-16 px-6">
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Título */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-8">
        {text[language].text2}<span className="text-blue-700">{text[language].text3}</span>
        </h2>
        <p className="text-lg text-gray-400 mb-12">
        {text[language].text4}
        </p>

        {/* Tarjetas de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans[language].map((plan, index) => (
            <motion.div
              key={index}
              className="bg-gray-200 rounded-lg shadow-md p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-gray-800 mb-6">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">
                    • {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition duration-300">
                {btn[language]}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

