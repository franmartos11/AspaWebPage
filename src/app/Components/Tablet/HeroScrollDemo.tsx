"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ContainerScroll";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export function HeroScrollDemo() {
    const { language, setLanguage } = useLanguage('es');
    const texts = {
        es:{
            txt1:'Nos ocupamos de impulsarte',
            txt2:'Digitalizando Procesos',
        },
        en:{
            txt1:'We Take Care of Boosting You by',
            txt2:'Digitizing Processes',
        }
    }
    return (
        <div className="flex flex-col overflow-hidden bg-black">
            <ContainerScroll
                titleComponent={
                    <>
                        <h2 className="text-3xl font-semibold text-white">
                            {texts[language].txt1} <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                            {texts[language].txt2}
                            </span>
                        </h2>
                    </>
                }
            >
                <Image
                    src={`/hud.png`}
                    alt="tablet"
                    title="tablet"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
