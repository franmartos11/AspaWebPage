'use client'
import Link from "next/link";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export default function () {
    const { language, setLanguage } = useLanguage();

    const texts = {
        es : {
            op1:'Inicio',
            op2:'Servicios',
            op3:'Nosotros',
            op4:'Contacto'
        },
        en : {
            op1: 'Home',
            op2:'Services',
            op3: 'About Us',
            op4: 'Contact',
        },
    }
    
    
    return (
        <div className="relative   px-4 pt-20 bg-black">
            <hr className="h-px mb-[5rem] mt-[-5.5rem] bg-black"></hr>
            <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-black p-1">
                <Link title="link" href={"#top-page"}>
                    <img
                        className="h-full object-contain"
                        src="/aspaLogo.webp"
                        alt="aspa logo"
                        title="aspa logo"
                    />
                </Link>
            </div>
            <nav
                aria-label="Footer Navigation"
                className="mx-auto  mb-10 flex max-w-lg flex-col gap-10 text-center justify-center sm:flex-row sm:text-left"
            >
                <a title="link" href="/" className="font-medium text-white">
                    {texts[language].op1}
                </a>
                <a
                    title="link"
                    href="/servicios"
                    className="font-medium text-white"
                >
                    {texts[language].op2}
                </a>
                <a
                    title="link"
                    href="/nosotros"
                    className="font-medium text-white"
                >
                    {texts[language].op3}
                </a>
                <a
                    title="link"
                    href="/contact"
                    className="font-medium text-white"
                >
                    {texts[language].op4}
                </a>
            </nav>
            <p className="py-10 text-center text-gray-300">
                © 2024 Aspa Software | All Rights Reserved
            </p>
        </div>
    );
}
