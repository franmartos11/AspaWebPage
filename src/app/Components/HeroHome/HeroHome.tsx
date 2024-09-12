"use client";
import React from "react";
import { SparklesCore } from "./SparklesCore";
import { TextGenerateEffect } from "../GenerativeText/TextGenerateEffect";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export function HeroHome() {
    const { language, setLanguage } = useLanguage('es');
    //empezando a generar multiidioma
    const texts = {
        es: 'Impulsamos tu negocio con software a medida',
        en: 'We Boost Your Business with Custom Software'
    }
    

    return (
        <div className="h-[40rem]  w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-6xl lg:text-9xl font-bold text-center text-white relative z-20">
                Aspa Software
            </h1>
            <div className="w-[80rem] h-40 relative">
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
                <div className="">
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full  relative"
                        particleColor="#87CEFA"
                    />
                </div>
                <div className="absolute  inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_190px_at_top,transparent_10%,white)]"></div>
                <div className="absolute  inset-0 w-full h-full">
                    <div className="flex flex-col items-center pt-[0.5rem]  ">
                        <div className="text-center pb-12 z-50  h-[150%] w-[60vw] ">
                            <TextGenerateEffect words={texts[language]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
