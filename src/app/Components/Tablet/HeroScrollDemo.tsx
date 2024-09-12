"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ContainerScroll";

export function HeroScrollDemo() {

    let es1 = 'Nos ocupamos de impulsarte'
    let es2 = 'Digitalizando Procesos'

    let en1 = 'We Take Care of Boosting You by'
    let en2 = 'Digitizing Processes'
    return (
        <div className="flex flex-col overflow-hidden bg-black">
            <ContainerScroll
                titleComponent={
                    <>
                        <h2 className="text-3xl font-semibold text-white">
                            {es1} <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                {es2}
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
