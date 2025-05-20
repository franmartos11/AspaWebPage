"use client";

import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";
import { Carousel } from "./carrousel";
export function CarouselDemo() {
  const { language } = useLanguage("es");
  const slideData = {
    en: [
      {
        title: "Visual Peephole",
        button: "Visit the Website",
        src: "/vpHome2.png",
        web: "https://www.visualpeephole.com",
      },
      {
        title: "Omega Solutions",
        button: "Visit the Website",
        src: "/omegaHome.png",
        web: "https://www.omegasoluciones.com.ar",
      },
      {
        title: "Alfonso Lozita",
        button: "Visit the Website",
        src: "/alfonsoHome.png",
        web: "https://alfonsolozita.com",
      },
    ],
    es: [
      {
        title: "Visual Peephole",
        button: "Visita la Web",
        src: "/vpHome2.png",
        web: "https://www.visualpeephole.com",
      },
      {
        title: "Omega Soluciones",
        button: "Visita la Web",
        src: "/omegaHome.png",
        web: "https://www.omegasoluciones.com.ar",
      },
      {
        title: "Alfonso Lozita",
        button: "Visita la Web",
        src: "/alfonsoHome.png",
        web: "https://alfonsolozita.com",
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
    <div className="bg-black">
      <div className="mb-[2rem] text-center">
        <h2 className="text-blue-600 text-center font-medium mb-4 block">
          {texts[language].title}
        </h2>
        <h3 className="text-4xl text-white text-center font-bold">
          {texts[language].paragraph}
        </h3>
      </div>

      <div className="relative overflow-hidden w-full h-full pb-20 pt-8">
        <Carousel slides={slideData[language]} />
      </div>
    </div>
  );
}
