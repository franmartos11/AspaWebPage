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
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    
                    <img
                        src="/aspa-carcheck.png"
                        alt="image"
                        
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
        {
            title: "Auditorias",
            value: "services",
            link: 'a',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    
                    <img
                        src="/aspa-carcheck.png"
                        alt="image"
                        
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
        {
            title: "Paginas Web",
            value: "playground",
            link: 'a',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    
                    <img
                        src="/aspa-carcheck.png"
                        alt="image"
                        
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
        {
            title: "Apps a Medida",
            value: "content",
            link: 'a',
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    
                    <img
                        src="/aspa-carcheck.png"
                        alt="image"
                        
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="h-[20rem] md:h-[37rem] [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-40">
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
