"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";

const logos = [
  { href: "https://www.instagram.com/charlatanes.prod/", src: "/charlatanes-logo.png", alt: "Charlatanes", className: "h-[4rem]" },
  { href: "https://www.visualpeephole.com/", src: "/vplogo.png", alt: "Visual Peephole", className: "h-[4rem]" },
  { href: "https://www.facebook.com/Inaebnitautomotriz/?locale=es_LA", src: "/In_Aebnit_logo.png", alt: "In Aebnit Automotriz", className: "h-[13rem]" },
  { href: "https://alfonsolozita.com", src: "/alfonso-logo.png", alt: "Alfonso Lozita", className: "h-[4.4rem]" },
  { href: "https://www.facebook.com/CarRefinishesKolor/?locale=es_LA", src: "/Car_Refinishes_Logo.png", alt: "Car Refinishes", className: "h-[11rem]" },
  { href: "https://www.instagram.com/m.nortebosch/?hl=es", src: "/servicios-norte-logo.png", alt: "Servicios Norte", className: "h-[5rem]" },
  { href: "https://www.omegasoluciones.com.ar", src: "/omega2.png", alt: "Omega Soluciones", className: "h-[6rem]" },
  { href: "https://www.instagram.com/autolack.pinturayestetica", src: "/autolack.png", alt: "Autolack", className: "h-[6rem]" },
];

export default function MoovingLogos() {
  const { language } = useLanguage("es");
  const texts = {
    es: {
      label: "Nuestros Clientes",
      title: "Quienes confían en nosotros",
    },
    en: {
      label: "Our Clients",
      title: "Those who trust us",
    },
  };

  return (
    <div className="py-24 relative overflow-hidden flex flex-col justify-center min-h-[60vh]">
      {/* Encabezado animado */}
      <motion.div
        className="mb-16 text-center px-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-blue-500 font-bold mb-4 tracking-[0.2em] uppercase text-xs">
          {texts[language]?.label ?? texts.es.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          {texts[language]?.title ?? texts.es.title}
        </h2>
      </motion.div>

      {/* 
        Carrusel Container 
        Using mask-image to fade out the left and right edges so logos 
        appear smoothly from the background.
      */}
      <div 
        className="relative flex overflow-hidden group max-w-[100vw] mx-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        {/* Track 1 */}
        <div className="animate-loop-scroll group-hover:[animation-play-state:paused] flex flex-row items-center whitespace-nowrap">
          {logos.map((logo, idx) => (
            <a
              key={`logo-1-${idx}`}
              title={logo.alt}
              target="_blank"
              rel="noopener noreferrer"
              href={logo.href}
              className="group/logo relative flex justify-center items-center h-28 w-[22rem] mx-4 rounded-3xl overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}
            >
              {/* Border that illuminates on hover */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover/logo:border-blue-500/30 transition-colors duration-500" />
              
              {/* Internal glow on hover */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover/logo:bg-blue-500/5 transition-colors duration-500" />
              
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.alt}
                className={`${logo.className} object-contain transition-transform duration-500 group-hover/logo:scale-105 filter grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100`}
              />
            </a>
          ))}
        </div>
        
        {/* Track 2 (duplicado para loop infinito) */}
        <div
          className="animate-loop-scroll group-hover:[animation-play-state:paused] flex flex-row items-center whitespace-nowrap"
          aria-hidden="true"
        >
          {logos.map((logo, idx) => (
            <a
              key={`logo-2-${idx}`}
              title={logo.alt}
              target="_blank"
              rel="noopener noreferrer"
              href={logo.href}
              className="group/logo relative flex justify-center items-center h-28 w-[22rem] mx-4 rounded-3xl overflow-hidden transition-all duration-300"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}
            >
              <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover/logo:border-blue-500/30 transition-colors duration-500" />
              <div className="absolute inset-0 bg-blue-500/0 group-hover/logo:bg-blue-500/5 transition-colors duration-500" />
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.alt}
                className={`${logo.className} object-contain transition-transform duration-500 group-hover/logo:scale-105 filter grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100`}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
