"use client";

import { useLanguage } from "@/app/Components/AALenguageContext/LenguageContext";
import { Carousel } from "./carrousel";
export function CarouselDemo() {
    const { language } = useLanguage('es');
    const slideData = {
        en: [
            {
                title: "Visual Peephole",
                button: "Visit the Website",
                src: "/viusualPeephole2.jpeg",
                web:'https://www.visualpeephole.com'
            },
            {
                title: "Omega Solutions",
                button: "Visit the Website",
                src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                web:'https://www.omegasoluciones.com.ar'
            },
            {
                title: "Alfonso Lozita",
                button: "Visit the Website",
                src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                web:'https://alfonsolozita.com'
            },
        ],
        es: [
            {
                title: "Visual Peephole",
                button: "Visita la Web",
                src: "/viusualPeephole2.jpeg",
                web:'https://www.visualpeephole.com'
            },
            {
                title: "Omega Soluciones",
                button: "Visita la Web",
                src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                web:'https://www.omegasoluciones.com.ar'
            },
            {
                title: "Alfonso Lozita",
                button: "Visita la Web",
                src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                web:'https://alfonsolozita.com'
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
