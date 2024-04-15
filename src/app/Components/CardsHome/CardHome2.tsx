"use client";

import Image from "next/image";
import React from "react";

import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./CardContainer";

export function CardHome2() {
  return (
    <CardContainer className="inter-var p-1 ">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-blue-500/[5] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Calidad
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
         Más que cumplir, superamos expectativas. Te ofrecemos software y servicios de la más alta calidad, diseñados para impulsar tu éxito.</CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://inteligenciaemocionalaplicada.com/wp-content/uploads/2021/03/MASTER-2.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="calidad img"
            title="calidad img"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          
        </div>
      </CardBody>
    </CardContainer>
  );
}
