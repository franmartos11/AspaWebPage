"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./Tracing-beam";
import CardProyect from "../CardProyect/CardProyect";
import CarrouselDemo from "../imgcarrouselservices/CarrouselDemo";
import MoovingLogos from "../MoovingLogos/MoovingLogos";
import Form from "../Forms/Form";

export function TracingBeamCarcheck() {
  return (
    <TracingBeam className="">
      <div className=" mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
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
export const imgsCarcheck = [
  "/carcheck.png",
  "/carcheck4carrousel2.jpeg",
  "/carcheck4carrousel1.jpeg",
  "/carcheck4carrousel3.jpeg",
];
export const imgsCarcheck2 = [
  "/carcheck4carrousel4.png",
  "/carcheck_1.png",
  "/carcheck_2.png",
  "/carcheck_3.png",
  "/carcheck_4.png",
  "/carcheck_5.png",
];

const dummyContent = [
  {
    title: "",
    description: (
      <div>
        <CardProyect></CardProyect>
        <div className="flex lg:flex-row flex-col  align-middle justify-center ">
          <CarrouselDemo slides={imgsCarcheck}></CarrouselDemo>
          <CarrouselDemo slides={imgsCarcheck2}></CarrouselDemo>
        </div>
        <MoovingLogos></MoovingLogos>
        <Form service="Carcheck"></Form>
      </div>
    ),
    badge: "",
  },
];
