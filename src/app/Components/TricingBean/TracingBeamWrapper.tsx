"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./Tracing-beam";
import dynamic from "next/dynamic";
import { imgsCarcheck, imgsCarcheck2 } from "./TracingBeamCarcheck";

const CardProyect = dynamic(() => import("../CardProyect/CardProyect"), { ssr: false });
const CardProyectApp = dynamic(() => import("../CardProyect/CardProyectApp"), { ssr: false });
const CardProyectWeb = dynamic(() => import("../CardProyect/CardProyectWebs"), { ssr: false });
const CardProyectAuditoria = dynamic(() => import("../../auditorias/components/AuditFeatures"), { ssr: false });
const CarrouselDemo = dynamic(() => import("../imgcarrouselservices/CarrouselDemo"), { ssr: false });
const MoovingLogos = dynamic(() => import("../MoovingLogos/MoovingLogos"), { ssr: false });

export function TracingBeamDemo() {
  return (
    <TracingBeam>
      <div className=" mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-[2.6rem]">
              {item.badge}
            </h2>

            <p className={twMerge("text-xl mb-4")}>{item.title}</p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "",
    description: (
      <div>
        <div id="desarrollo-web"></div>
        <CardProyectWeb></CardProyectWeb>
      </div>
    ),
    badge: "",
  },
  {
    title: "",
    description: (
      <div>
        <div id="desarrollo-medida"></div>
        <CardProyectApp></CardProyectApp>
      </div>
    ),
    badge: "",
  },
  {
    title: "",
    description: (
      <div>
        <div id="carcheck"></div>
        <CardProyect></CardProyect>
        <div className="flex lg:flex-row flex-col  align-middle justify-center ">
          <CarrouselDemo slides={imgsCarcheck}></CarrouselDemo>
          <CarrouselDemo slides={imgsCarcheck2}></CarrouselDemo>
        </div>
      </div>
    ),
    badge: "",
  },
  {
    title: "",
    description: (
      <div>
        <div id=""></div>
        <CardProyectAuditoria></CardProyectAuditoria>
        <MoovingLogos></MoovingLogos>
      </div>
    ),
    badge: "",
  },
];
