"use client";

import Image from "next/image";
import React from "react";

import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./CardContainer";

export function CardHome() {
    return (
        <CardContainer className="inter-var p-1">
            <CardBody className=" relative group/card hover:shadow-2xl hover:shadow-blue-500/[5] bg-black border-white/[0.2]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                >
                    Personalización
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className=" text-sm max-w-sm mt-2 text-neutral-300"
                >
                    Despídete de las soluciones genéricas. En Aspa, creamos
                    estrategias personalizadas que se adaptan a tus necesidades
                    y te ayudan a alcanzar tus objetivos.
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src="https://fc-abogados.com/es/wp-content/uploads/2021/12/Diseno-sin-titulo-5.png"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="personalizacion img"
                        title="personalizacion img"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-20"></div>
            </CardBody>
        </CardContainer>
    );
}
