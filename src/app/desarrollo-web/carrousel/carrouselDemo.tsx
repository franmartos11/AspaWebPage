"use client";

import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";
import { Carousel } from "./carrousel";
export function CarouselDemo() {
  const { language } = useLanguage("es");
  const slideData = {
    en: [
      {
        number: "01",
        title: "Visual Peephole",
        button: "Visit the Website",
        src: "/vpHome2.png",
        web: "https://www.visualpeephole.com",
        techs: ["Next.js", "Tailwind", "Framer Motion"]
      },
      {
        number: "02",
        title: "Omega Solutions",
        button: "Visit the Website",
        src: "/omegaHome.png",
        web: "https://www.omegasoluciones.com.ar",
        techs: ["React", "CSS3", "Vercel"]
      },
      {
        number: "03",
        title: "Alfonso Lozita",
        button: "Visit the Website",
        src: "/alfonsoHome.png",
        web: "https://alfonsolozita.com",
        techs: ["Next.js", "TypeScript", "Tailwind"]
      },
    ],
    es: [
      {
        number: "01",
        title: "Visual Peephole",
        button: "Visita la Web",
        src: "/vpHome2.png",
        web: "https://www.visualpeephole.com",
        techs: ["Next.js", "Tailwind", "Framer Motion"]
      },
      {
        number: "02",
        title: "Omega Soluciones",
        button: "Visita la Web",
        src: "/omegaHome.png",
        web: "https://www.omegasoluciones.com.ar",
        techs: ["React", "CSS3", "Vercel"]
      },
      {
        number: "03",
        title: "Alfonso Lozita",
        button: "Visita la Web",
        src: "/alfonsoHome.png",
        web: "https://alfonsolozita.com",
        techs: ["Next.js", "TypeScript", "Tailwind"]
      },
    ],
  };
  const texts = {
    en: {
      title: "Proyects",
      paragraph: "Our latest proyects",
    },
    es: {
      title: "Proyetos",
      paragraph: "Algunos de nuestros proyectos",
    },
  };
  return (
    <div className="relative z-10">
      <div className="mb-[4rem] text-center px-6">
        <h2 className="text-blue-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">
          {texts[language].title}
        </h2>
        <h3 className="text-4xl md:text-5xl text-white text-center font-bold">
          {texts[language].paragraph}
        </h3>
      </div>

      <div className="relative overflow-hidden w-full h-full pb-20 pt-8">
        <Carousel slides={slideData[language]} />
      </div>
    </div>
  );
}
