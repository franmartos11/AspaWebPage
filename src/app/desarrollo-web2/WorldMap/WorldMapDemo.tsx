"use client";
import { motion } from "motion/react";
import { WorldMap } from "./WorldMap";
import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";

export function WorldMapDemo() {
    const { language } = useLanguage('es');

    const texts = {
        en: {
            title1: 'Take Your Business to the',
            title2:'World',
            paragraph: 'Ready to grow your business? We create custom, SEO-optimized websites designed to attract clients and turn visits into sales. Take your brand to every corner of the digital world with an impactful and effective website.',
        },
        es: {
            title1: 'Llevamos tu Negocio al ',
            title2:'Mundo',
            paragraph: '¿Listo para hacer crecer tu negocio? Desarrollamos páginas web personalizadas y optimizadas para SEO, diseñadas para atraer clientes y convertir visitas en ventas. Lleva tu marca a cada rincón del mundo digital con un sitio web impactante y efectivo.',
        }
    }

  return (
    <div className=" py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          {texts[language].title1}{" "}
          <span className="text-neutral-400">
            {texts[language].title2.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          {texts[language].paragraph}
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
    </div>
  );
}
