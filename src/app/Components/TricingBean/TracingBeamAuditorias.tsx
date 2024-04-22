"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./Tracing-beam";
import CardProyectAuditoria from "../CardProyect/CardProyectAuditoria";
import MoovingLogos from "../MoovingLogos/MoovingLogos";
import Form from "../Forms/Form";

export default function () {
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

const dummyContent = [
    {
        title: "",
        description: (
            <div>
                <CardProyectAuditoria></CardProyectAuditoria>
                <MoovingLogos></MoovingLogos>
                <Form service="Auditorias"  ></Form>
            </div>
        ),
        badge: "",
    },
];
