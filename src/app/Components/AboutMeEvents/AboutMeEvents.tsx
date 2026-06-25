"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../AALenguageContext/LenguageContext";
import AboutMeCard from "./AboutMeCard";

export default function AboutMeEvents() {
  const { language } = useLanguage("es");
  const texts = {
    es: {
      badge: "Nuestra Trayectoria",
      title: "Eventos",
      subtitle: "Momentos clave donde compartimos conocimiento, innovación y tecnología con la comunidad.",
      card1: {
        type: "Formación",
        title: "Impulso 21",
        text: "Participamos de una incubadora de negocios, practicando la validación, evaluación y planificación de ideas.",
        place: "Córdoba",
        link: "https://21.edu.ar/impulso-21",
        linkName: "Impulso21.com",
        img: "/impulso21.jpg",
      },
      card2: {
        type: "Expositores",
        title: "Feria 21",
        text: "Fuimos exponentes de un software a medida que generaba leads para negocios según rubro y ubicación.",
        place: "Córdoba",
        link: "https://feria.21.edu.ar",
        linkName: "Feria.21.edu.ar",
        img: "/feria21.jpg",
      },
      card3: {
        type: "Formación",
        title: "Evento TV 4.0",
        text: "Fuimos parte de una jornada en la que la ciencia, la innovación y la tecnología fueron las premisas.",
        place: "Córdoba Hotel Centenario",
        link: "https://eldoce.tv/sociedad/tv-4-0-vivo-megaevento-ciencia-innovacion-tecnologia-el-doce_158243/",
        linkName: "TV 4.0 Canal 12",
        img: "/evento3.jpeg",
      },
    },
    en: {
      badge: "Our Trajectory",
      title: "Events",
      subtitle: "Key moments where we share knowledge, innovation, and technology with the community.",
      card1: {
        type: "Training",
        title: "Impulso 21",
        text: "We participated in a business incubator, practicing validation, evaluation, and planning of ideas.",
        place: "Córdoba",
        link: "https://21.edu.ar/impulso-21",
        linkName: "Impulso21.com",
        img: "/impulso21.jpg",
      },
      card2: {
        type: "Exhibitors",
        title: "Feria 21",
        text: "We were exhibitors of custom software that generated leads for businesses based on industry and location.",
        place: "Córdoba",
        link: "https://feria.21.edu.ar",
        linkName: "Feria.21.edu.ar",
        img: "/feria21.jpg",
      },
      card3: {
        type: "Training",
        title: "TV 4.0 Live Event",
        text: "We were part of a day where science, innovation, and technology were the main themes.",
        place: "Córdoba Hotel Centenario",
        link: "https://eldoce.tv/sociedad/tv-4-0-vivo-megaevento-ciencia-innovacion-tecnologia-el-doce_158243/",
        linkName: "TV 4.0 Canal 12",
        img: "/evento3.jpeg",
      },
    },
  };

  const content = texts[language] ?? texts.es;

  return (
    <section className="py-24 relative overflow-hidden bg-black z-10">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="text-center mb-16 px-6 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-400/10">
          {content.badge}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
          {content.title}
        </h2>
        <div className="flex justify-center gap-1 mb-5">
          <motion.span
            className="h-1 bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <span className="w-3 h-1 bg-blue-500 rounded-full" />
          <span className="w-1 h-1 bg-blue-500 rounded-full" />
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
          {content.subtitle}
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <motion.div 
          className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <AboutMeCard
              type={content.card1.type}
              title={content.card1.title}
              text={content.card1.text}
              place={content.card1.place}
              link={content.card1.link}
              linkName={content.card1.linkName}
              img={content.card1.img}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <AboutMeCard
              type={content.card2.type}
              title={content.card2.title}
              text={content.card2.text}
              place={content.card2.place}
              link={content.card2.link}
              linkName={content.card2.linkName}
              img={content.card2.img}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <AboutMeCard
              type={content.card3.type}
              title={content.card3.title}
              text={content.card3.text}
              place={content.card3.place}
              link={content.card3.link}
              linkName={content.card3.linkName}
              img={content.card3.img}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
