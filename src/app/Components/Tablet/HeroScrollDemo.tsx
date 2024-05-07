"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ContainerScroll";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden bg-black">
            <ContainerScroll
                titleComponent={
                    <>
                        <h2 className="text-3xl font-semibold text-white">
                            Nos ocupamos de impulsarte <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Digitalizando Procesos
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
