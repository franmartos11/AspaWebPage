"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./CardContainer";
import { CardHomeProps } from "./CardHomeTriple";


export function CardHome({ title, paragraph, img }: CardHomeProps) {
    return (
        <CardContainer className="inter-var p-1">
            <CardBody className=" relative group/card hover:shadow-2xl hover:shadow-blue-500/[5] bg-black border-white/[0.2]  w-auto sm:w-[23rem] h-[25rem] rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                >
                    {title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className=" text-sm max-w-sm mt-2 text-neutral-300"
                >
                    {paragraph}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src={img}
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
