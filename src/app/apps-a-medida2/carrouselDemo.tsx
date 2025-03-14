"use client";

import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";
import { Carousel } from "./carrousel";
export function CarouselDemo2() {
    const { language } = useLanguage('es');
    const slideData = {
        en: [
            {
                title: "Carcheck",
                button: "See More",
                src: "/carcheckmobile.png",
                web:'/carcheck'
            },
            {
                title: "Omega Solutions Custom App",
                button: "See More",
                src: "/actividadesHome.png",
                web:'https://www.omegasoluciones.com.ar'
            },
            {
                title: "Aspa Audit",
                button: "See More",
                src: "/auditHome1.png",
                web:'/auditorias'
            },
        ],
        es: [
            {
                title: "Carcheck",
                button: "Ver Mas",
                src: "/carcheckmobile.png",
                web:'/carcheck'
            },
            {
                title: "Omega Soluciones Custom App",
                button: "Ver Mas",
                src: "/actividadesHome.png",
                web:'https://www.omegasoluciones.com.ar'
            },
            {
                title: "Aspa Auditorias",
                button: "Ver Mas",
                src:"/auditHome1.png",
                web:'/auditorias'
            },
        ]
    };
    const texts = {
        en: {
            title: 'Proyects',
            paragraph: 'Our latest proyects',
        },
        es: {
            title: 'Proyetos',
            paragraph: 'Algunos de nuestros proyectos',
        }
    }
    return (
        <div>
            <div className="mb-[2rem] text-center">
                <h2 className="text-blue-600 text-center font-medium mb-4 block">
                    {texts[language].title}
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                    {texts[language].paragraph}
                </h3>
            </div>

            <div className="relative overflow-hidden w-full h-full pb-20 pt-8">
                <Carousel slides={slideData[language]} />
            </div>
        </div>
    );
}
