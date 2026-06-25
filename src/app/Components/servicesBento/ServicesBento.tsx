"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import Link from "next/link";

const BentoCard = ({
  title,
  description,
  colSpanClass,
  delay,
  link,
}: {
  title: string;
  description: string;
  colSpanClass: string;
  delay: number;
  link: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-1 ${colSpanClass}`}
    >
      {/* Fondo sólido moderno */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 z-0" />
      
      {/* Patrón sutil o textura */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

      {/* Contenido (Textos) */}
      <div className="relative z-20 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-sm font-light mb-6 flex-grow">
          {description}
        </p>
        
        {/* Botón de explorar */}
        <Link href={link}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium text-sm hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 cursor-pointer w-fit group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Ver más
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
      
      {/* Brillo en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent transition-opacity duration-700 pointer-events-none z-10" />
    </motion.div>
  );
};

export default function ServicesBento() {
  const { language } = useLanguage("es");

  const texts = {
    es: {
      titulo: "Nuestros Servicios",
      subtitulo: "Soluciones tecnológicas integrales para potenciar tu negocio al siguiente nivel.",
      servicios: [
        {
          id: "web",
          nombre: "Desarrollo Web",
          descripcion: "Creamos páginas web institucionales, e-commerce y landing pages de alto rendimiento con los mejores estándares del mercado y diseño vanguardista.",
          imgpath: "/desarrolloWebBanner.png",
          link: "/desarrollo-web",
          colSpan: "md:col-span-2",
        },
        {
          id: "audit",
          nombre: "Auditoría IT",
          descripcion: "Analizamos tu infraestructura, seguridad y rendimiento para optimizar tus recursos tecnológicos.",
          imgpath: "/aspaAuditBanner.png",
          link: "/auditorias",
          colSpan: "md:col-span-1",
        },
        {
          id: "carcheck",
          nombre: "Carcheck Software",
          descripcion: "Plataforma integral especializada para talleres mecánicos. Gestión de vehículos, turnos y clientes.",
          imgpath: "/aspacarcheckbanner.png",
          link: "/carcheck",
          colSpan: "md:col-span-1",
        },
        {
          id: "apps",
          nombre: "Apps a Medida",
          descripcion: "Desarrollo de software y aplicaciones móviles personalizadas que se adaptan exactamente a las necesidades operativas de tu empresa.",
          imgpath: "/appsAMedidaBanner.png",
          link: "/apps-a-medida",
          colSpan: "md:col-span-2",
        },
      ],
    },
    en: {
      titulo: "Our Services",
      subtitulo: "Comprehensive technological solutions to boost your business to the next level.",
      servicios: [
        {
          id: "web",
          nombre: "Web Development",
          descripcion: "We create institutional websites, e-commerce, and high-performance landing pages with the best market standards and avant-garde design.",
          imgpath: "/desarrolloWebBanner.png",
          link: "/desarrollo-web",
          colSpan: "md:col-span-2",
        },
        {
          id: "audit",
          nombre: "IT Audit",
          descripcion: "We analyze your infrastructure, security, and performance to optimize your technological resources.",
          imgpath: "/aspaAuditBanner.png",
          link: "/auditorias",
          colSpan: "md:col-span-1",
        },
        {
          id: "carcheck",
          nombre: "Carcheck Software",
          descripcion: "Comprehensive specialized platform for mechanical workshops. Management of vehicles, appointments, and clients.",
          imgpath: "/aspacarcheckbanner.png",
          link: "/carcheck",
          colSpan: "md:col-span-1",
        },
        {
          id: "apps",
          nombre: "Custom Apps",
          descripcion: "Development of custom software and mobile applications that fit exactly the operational needs of your company.",
          imgpath: "/appsAMedidaBanner.png",
          link: "/apps-a-medida",
          colSpan: "md:col-span-2",
        },
      ],
    },
  };

  const currentTexts = texts[language] || texts.es;

  return (
    <section className="py-12 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center" id="servicios">
      {/* Background Decorativo */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        {/* Encabezado */}
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {currentTexts.titulo}
          </h2>
          <div className="flex justify-center mb-6">
            <motion.span
              className="inline-block h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full" />
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full" />
          </div>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            {currentTexts.subtitulo}
          </p>
        </motion.div>

        {/* Grilla Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-6">
          {currentTexts.servicios.map((servicio, idx) => (
            <BentoCard
              key={servicio.id}
              title={servicio.nombre}
              description={servicio.descripcion}
              image={servicio.imgpath}
              link={servicio.link}
              colSpanClass={servicio.colSpan}
              delay={0.1 * (idx + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
