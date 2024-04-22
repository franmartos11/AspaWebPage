"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./Tracing-beam";
import CardProyectApp from "../CardProyect/CardProyectApp";
import MoovingLogos from "../MoovingLogos/MoovingLogos";

export function TracingBeamApps() {
    return (
        <TracingBeam >
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

const dummyContent = [
    {
        title: "",
        description: (
            <div>
                <div id="desarrollo-medida"></div>
                <CardProyectApp></CardProyectApp>
                <MoovingLogos></MoovingLogos>
            </div>
        ),
        badge: "",
    },
];
