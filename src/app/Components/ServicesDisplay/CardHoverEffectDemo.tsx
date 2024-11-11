"use client";
import { HoverEffect } from "./CardHover";
import Image, { ImageProps } from "next/image";


export function CardHoverEffectDemo() {
    return (
        <div className="max-w-[80rem] gowun-batang-regular mx-auto px-8 pt-[4rem]">
            <h3 className=" pb-0 text-4xl font-semibold gowun-batang-bold text-white  text-center">Modulos</h3>
            <HoverEffect items={projects} />
        </div>
    );
}
export const projects = [
    {
        title: "CLIENTES",
        description:
            "Da de alta clientes, registra sus datos importantes y accede a su historial detallado.",
        link: "/ExteriorRenders",
        Content:<div>
            <div className="bg-gray-300 rounded-2xl p-[1rem] m-[1rem]">
            <div>
                <h2>lorem ipsum</h2>
            </div>
            <div>
            <Image
                    src={`/hud.png`}
                    alt="tablet"
                    title="tablet"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </div>
            </div>
            <div className="bg-gray-300 rounded-2xl p-[1rem] m-[1rem]">
            <div>
                <h2>lorem ipsum</h2>
            </div>
            <div>
            <Image
                    src={`/hud.png`}
                    alt="tablet"
                    title="tablet"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </div>
            </div>
            <div className="bg-gray-300 rounded-2xl p-[1rem] m-[1rem]">
            <div>
                <h2>lorem ipsum</h2>
            </div>
            <div>
            <Image
                    src={`/hud.png`}
                    alt="tablet"
                    title="tablet"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </div>
            </div>
            <div className="bg-gray-300 rounded-2xl p-[1rem] m-[1rem]">
            <div>
                <h2>lorem ipsum</h2>
            </div>
            <div>
            <Image
                    src={`/hud.png`}
                    alt="tablet"
                    title="tablet"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </div>
            </div>
            <div className="bg-gray-300 rounded-2xl p-[1rem] m-[1rem]">
            <div>
                <h2>lorem ipsum</h2>
            </div>
            <div>
            <Image
                    src={`/hud.png`}
                    alt="tablet"
                    title="tablet"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </div>
            </div>
        </div>
    },
    {
        title: "VEHICULOS",
        description:
            "Registra vehículos, asígnalos a clientes y lleva un historial clínico completo de cada uno.",
        link: "/InteriorRenders",
        Content:<div/>,
    },
    {
        title: "ALISTAJES",
        description:
            "Realiza diagnósticos, asigna trabajos, repuestos y genera informes automáticos.",
        link: "/Animations",
        Content:<div/>,
    },
    {
        title: "PRESUPUESTOS",
        description:
            "Crea y exporta presupuestos fácilmente utilizando plantillas personalizables.",
        link: "/Modeling",
        Content:<div/>,
    },
    {
        title: "TURNOS",
        description:
            "Asigna turnos a clientes, visualiza el calendario y ajusta formularios según las necesidades.",
        link: "/bim",
        Content:<div/>,
    },
    {
        title: "SERVICIOS",
        description:
            "Crea servicios, ajusta precios masivamente y gestiona la oferta de tu taller.",
        link: "/SolidWorks",
        Content:<div/>,
    },
    {
        title: "STOCK",
        description:
            "Registra stock, proveedores, ajusta precios en masa y organiza tu inventario.",
        link: "/SolidWorks",
        Content:<div/>,
    },
    {
        title: "MARKETING",
        description:
            "Envía campañas masivas y recordatorios automatizados por WhatsApp y correo.",
        link: "/SolidWorks",
        Content:<div/>,
    },{
        title: "REPORTES",
        description:
            "Visualiza indicadores clave y tableros para el análisis de rendimiento por taller.",
        link: "/SolidWorks",
        Content:<div/>,
    },
   
];
