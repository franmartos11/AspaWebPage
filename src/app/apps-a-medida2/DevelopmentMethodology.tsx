"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";
import { text } from "stream/consumers";

const steps = {
  es: [
    {
      id: 1,
      title: "Análisis de requisitos",
      description: "Nuestros asesores te contactarán para valorar cuál es la mejor solución de desarrollo de app para tu negocio.",
      icon: "/analisis.png",
    },
    {
      id: 2,
      title: "Análisis de marketing",
      description: "Estudiaremos desde una perspectiva de negocio qué funcionalidades pueden aportarte un mayor valor y cómo posicionar tu app en el mercado.",
      icon: "/analisisM.png",
    },
    {
      id: 3,
      title: "Diseño de UI",
      description: "Nuestros creativos diseñarán tu app asegurando en todo momento la mejor experiencia para el usuario.",
      icon: "/ui.png",
    },
    {
      id: 4,
      title: "Desarrollo",
      description: "Nuestro equipo de desarrolladores de apps construirá tu aplicación utilizando las tecnologías más adecuadas, ya sea en desarrollo de aplicaciones nativas o multiplataforma.",
      icon: "/desarrollo2.png",
    },
    {
      id: 5,
      title: "Testing",
      description: "Todas las funcionalidades pasarán por un entorno de prueba en el que verificaremos que todo esté correcto.",
      icon: "/testing.png",
    },
    {
      id: 6,
      title: "Lanzamiento",
      description: "La publicación en las plataformas será cosa nuestra. Trabajaremos con Google y Apple para la aprobación y distribución de tu app en Google Play y App Store.",
      icon: "/lanzamiento.png",
    },
  ],
  en: [
    {
      id: 1,
      title: "Requirement Analysis",
      description: "Our consultants will contact you to assess the best app development solution for your business.",
      icon: "/analisis.png",
    },
    {
      id: 2,
      title: "Marketing Analysis",
      description: "We will study, from a business perspective, which features can add the most value and how to position your app in the market.",
      icon: "/analisisM.png",
    },
    {
      id: 3,
      title: "UI Design",
      description: "Our creative team will design your app, ensuring the best user experience at all times.",
      icon: "/ui.png",
    },
    {
      id: 4,
      title: "Development",
      description: "Our team of app developers will build your application using the most suitable technologies, whether for native or cross-platform development.",
      icon: "/desarrollo2.png",
    },
    {
      id: 5,
      title: "Testing",
      description: "All functionalities will go through a testing environment where we will verify that everything works correctly.",
      icon: "/testing.png",
    },
    {
      id: 6,
      title: "Launch",
      description: "We will take care of publishing your app. We work with Google and Apple for approval and distribution on Google Play and the App Store.",
      icon: "/lanzamiento.png",
    },
  ],
};

const texts = {
  es:{
    title1:'Nuestra Metodología de ',
    title2:'Desarrollo de Apps',
    subtitle:'Trabajamos contigo en cada fase del proyecto, desde la definición de la idea hasta su publicación, pasando por el diseño, desarrollo y lanzamiento de tu aplicación.'
  },
  en:{
    title1:'Our Methodology for ',
    title2:'App Development',
    subtitle:'We work with you through every stage of the project, from defining the idea to publication, including design, development, and launch.'
  }
};

const DevelopmentMethodology: React.FC = () => {
  const { language } = useLanguage('es');
  return (
    <section className="py-[6rem] px-6 text-center">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {texts[language].title1} <span className="text-blue-600 transition-all">{texts[language].title2}</span>
      </motion.h2>
      <motion.p
        className="mt-4 text-gray-400 text-lg max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      > {texts[language].subtitle}</motion.p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {steps[language].map((step, index) => (
          <motion.div
            key={step.id}
            className="bg-gray-950 shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 cursor-pointer border-[1px] border-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          >
            <img src={step.icon} alt={step.title} className="w-16 h-16" />
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentMethodology;
