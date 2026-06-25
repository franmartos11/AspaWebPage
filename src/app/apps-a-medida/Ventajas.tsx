"use client";
import { useLanguage } from "../Components/AALenguageContext/LenguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

const Ventajas: React.FC = () => {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      title: "Hace Crecer tu Negocio con el",
      title2: "Desarrollo de Apps",
      paragraph:
        "Desarrollamos soluciones digitales a medida para optimizar procesos, mejorar productividad y potenciar tu negocio.",
      subtitle1: "Consultoría Estratégica",
      subtext1:
        "Te ayudamos a definir qué tipo de app es ideal para tu negocio y cómo monetizarla.",
      subtitle2: "Desarrollo Optimizado",
      subtext2: "Ahorra hasta un 800% en costos utilizando nuestros frameworks avanzados.",
      subtitle3: "Publicación en Tiendas",
      subtext3: "Nos encargamos de todo el proceso burocrático en Google Play y App Store.",
      subtitle4: "Lanzamiento y Soporte",
      subtext4: "Planificamos el lanzamiento y te brindamos soporte técnico continuo.",
    },
    en: {
      title: "Grow Your Business with",
      title2: "App Development",
      paragraph:
        "We develop custom digital solutions to optimize processes, improve productivity, and boost your business.",
      subtitle1: "Strategic Consulting",
      subtext1:
        "We help you define what type of app is ideal for your business and how to monetize it.",
      subtitle2: "Optimized Development",
      subtext2: "Save up to 800% in costs using our advanced frameworks.",
      subtitle3: "Store Publishing",
      subtext3: "We handle all the bureaucratic process in Google Play and App Store.",
      subtitle4: "Launch and Support",
      subtext4: "We plan the launch and provide continuous technical support.",
    },
  };

  const t = texts[language] ?? texts.es;

  return (
    <section className="relative py-12 lg:py-16 px-6 z-10">
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-6">
            {t.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {t.title2}
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t.paragraph}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Box 1 - Consultoría (Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 relative group p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Image src="/analisisM.png" alt="Consultoría" width={24} height={24} className="drop-shadow-md" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {t.subtitle1}
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  {t.subtext1}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 2 - Desarrollo (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 relative group p-8 rounded-3xl bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Image src="/desarrollo2.png" alt="Desarrollo" width={28} height={28} className="drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {t.subtitle2}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t.subtext2}
              </p>
            </div>
            
            {/* Decorative Element */}
            <div className="mt-8 relative h-32 w-full rounded-xl border border-white/5 bg-[#111] overflow-hidden flex items-center justify-center group-hover:border-blue-500/30 transition-colors">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                -800%
              </div>
            </div>
          </motion.div>

          {/* Box 3 - Publicación */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 relative group p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Image src="/upload.png" alt="Publicación" width={28} height={28} className="drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {t.subtitle3}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.subtext3}
              </p>
            </div>
          </motion.div>

          {/* Box 4 - Lanzamiento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 relative group p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Image src="/lanzamiento.png" alt="Lanzamiento" width={28} height={28} className="drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {t.subtitle4}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.subtext4}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Ventajas;
