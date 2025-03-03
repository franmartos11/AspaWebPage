import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MacbookScroll } from "./Mackbookscroll";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export function MacbookScrollDemo() {
    const { language } = useLanguage('es');

    const texts = {
        en: {
            paragraph1: 'Are you ready to take advantage of the benefits',
            paragraph2: 'of web development?',
        },
        es: {
            paragraph1: 'Estás listo para aprovechar las ventajas',
            paragraph2: 'del desarrollo web?',
        }
    }
    return (
        <div className="overflow-hidden sm:block hidden w-full">
            <MacbookScroll
                title={
                    <span className=" text-5xl">
                        {texts[language].paragraph1}
                        <br />
                        {texts[language].paragraph2}
                    </span>
                }
                badge={
                    <Link
                        title="link"
                        target="_blank"
                        href="https://ar.linkedin.com/company/aspa-sofware-development"
                    >
                        <Badge className="h-10 w-10 transform -rotate-12" />
                    </Link>
                }
                src={`/aspahome6.png`}
                showGradient={false}
            />
        </div>
    );
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
    return (
        <Image
            alt="badge"
            title="badge"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="/aspaLogo.webp"
            width={50}
            height={50}
        ></Image>
    );
};
