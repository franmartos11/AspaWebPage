"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./Tracing-beam";
import { MacbookScrollDemo } from "../MackBookScroll/MacbookScrollDemo";
import CardProyectWeb from "../CardProyect/CardProyectWebs";

export function TracingBeamWeb() {
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

const dummyContent = [
    {
        title: "",
        description: (
            <div>
                <div id="desarrollo-web"></div>
                <MacbookScrollDemo></MacbookScrollDemo>
                <CardProyectWeb></CardProyectWeb>
            </div>
        ),
        badge: "",
    }]