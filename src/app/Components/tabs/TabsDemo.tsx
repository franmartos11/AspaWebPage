"use client";
import Image from "next/image";
import { Tabs } from "./Tabs";

export function TabsDemo() {
    const tabs = [
        {
            title: "Carcheck ",
            value: "product",
            link: '/servicios',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-center align-middle justify-center font-bold text-white bg-gradient-to-br from-blue-500 to-blue-900">
                    <p className="md:text-4xl text-xl pb-[1rem] text-center ">Aspa Carcheck</p>
                    
                    <Image
                        src="/image2.png"
                        alt="image"
                        width="500"
                        height="500"
                        className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
                    />
                </div>
            ),
        },
        {
            title: "Auditorias",
            value: "services",
            link: 'a',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-blue-900">
                    <p>Services tab</p> 
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Paginas Web",
            value: "playground",
            link: 'a',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-blue-900">
                    <p>Playground tab</p>
                    <Image
                        src="/desarrolloWeb.png"
                        alt="image"
                        width="500"
                        height="500"
                        className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
                    />
                </div>
            ),
        },
        {
            title: "Automatizacion Procesos",
            value: "content",
            link: 'a',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-blue-900">
                    <p>Content tab</p>
                    <DummyContent />
                </div>
            ),
        },
    ];

    return (
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-40">
            <Tabs tabs={tabs} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <Image
            src="/desarrollado.jpg"
            alt="image"
            width="500"
            height="500"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};
