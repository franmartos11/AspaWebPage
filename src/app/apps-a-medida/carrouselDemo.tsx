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
                web:'https://www.appsheet.com/start/244753a1-fe7e-4a53-8831-666b680fedc2#appName=TestCarCheck-1002064369&page=gallery&sort=%5B%5D&table=MENU&view=Menu'
            },
            {
                title: "Omega Solutions Custom App",
                button: "See More",
                src: "/actividadesHome.png",
                web:'https://www.appsheet.com/start/a506fe5a-6d0f-4fb2-9fab-2755361be24a?platform=desktop#vss=H4sIAAAAAAAAA6WPwW7CMBBE_2XPjgQkEMXXqgdUwQXUS93DOt4gq8FG8aYtivzvtQuIM-1xZvVmZyb4tPS1Y2w_QL5Nd_VCZ5AwKdifT6RAKnjyjgffKxAKtni8mDtitu4QFESI7-LGMwWQ02O4_N93AdaQY9tZGnJWJlPGlUvnTCXjxkAUcBwZdU-_hTNjw9o9G8sbb5LmYSQBPKAL2LL1bm0Sr5turquyKZoadVHNq7JoZroulrrWixXpskaEGFN659sxkHlNo_4wJlf5PqEzlzId9oHiD6TtbE2vAQAA&view=Settings&appName=AspaActividades-1002064369'
            },
            {
                title: "Aspa Audit",
                button: "See More",
                src: "/auditHome1.png",
                web:'/https://www.appsheet.com/start/c227a95b-9a21-479a-ad0e-f6e7dcfc1d95#appName=AplicaciónAuditoríass-4407950&vss=H4sIAAAAAAAAA52OvQ7CMBCD38VzniArYkCoLCAWwhCaqxTRJlWTAFWUd-fCj1iB8Xz-bGdcLF23UbdnyEP-XGuaIZEVdvNIClJh4V2cfK8gFDZ6eIoNuaRQUI7izUYKkPl7VP7fKmANuWg7S1PNqRTzL4bflWCh-lEEhhT1qafHSPaXwlrn2xTI7HnCj9Vh5Za3UTvTeMNxne4DlTudAZXRUQEAAA==&view=Menu'
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
            paragraph: 'Our Latest Proyects',
        },
        es: {
            title: 'Proyetos',
            paragraph: 'Algunos de Nuestros Proyectos',
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
