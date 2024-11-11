"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../Components/Tablet/ContainerScroll"; 

export function HeroScrollDemoCarcheck() {
    return (
        <div className="flex flex-col pt-0 overflow-hidden bg-black">
            <ContainerScroll
                titleComponent={
                    <>
                        <h2 className="text-3xl font-semibold text-white">
                            Organizamos tu Taller con <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Aspa CarCheck
                            </span>
                        </h2>
                    </>
                }
            >
                <Image
                    src={`/carcheckHome2.png`}
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
