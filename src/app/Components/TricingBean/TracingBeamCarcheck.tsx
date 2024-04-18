"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./Tracing-beam";
import CardProyect from "../CardProyect/CardProyect";
import Partners from "../Partners/Partners";
import CarrouselDemo from "../imgcarrouselservices/CarrouselDemo";

export function TracingBeamCarcheck() {
    return (
        <TracingBeam className="">
            <div className=" mx-auto antialiased pt-4 relative">
                {dummyContent.map((item, index) => (
                    <div key={`content-${index}`} className="mb-10">
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
const imgsCarcheck = [
    "/carcheck.png",
    "/carcheck4carrousel1.jpeg",
    "/carcheck4carrousel2.jpeg",
    "/carcheck4carrousel3.jpeg",
  ];

const dummyContent = [
    {
        title: "",
        description: (
            <div>
                <CardProyect></CardProyect>
                <div className="flex lg:flex-row flex-col  align-middle justify-center ">
                   <CarrouselDemo slides={imgsCarcheck}></CarrouselDemo>
                </div>
                <Partners></Partners>
            </div>
        ),
        badge: "",
    },
];
