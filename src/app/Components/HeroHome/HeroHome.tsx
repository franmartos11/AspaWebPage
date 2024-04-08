"use client";
import React from "react";
import { SparklesCore } from "./SparklesCore";
import { TextGenerateEffect } from "../GenerativeText/TextGenerateEffect";

export function HeroHome() {
    return (
        <div className="h-[40rem]  w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-6xl lg:text-9xl font-bold text-center text-white relative z-20">
                Aspa Software
            </h1>
            <div className="w-[80rem] h-40 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
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

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute  inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_190px_at_top,transparent_10%,white)]">
                    
                </div>
                <div className="absolute  inset-0 w-full h-full">
                    <div className="flex flex-col items-center pt-[0.5rem]  ">
                        <div className="text-center pb-12 z-50  h-[150%] w-[60vw] ">
                            <TextGenerateEffect words="Impulsamos tu negocio digitalizando procesos con sistemas a medida." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
