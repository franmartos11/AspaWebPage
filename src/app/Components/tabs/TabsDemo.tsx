"use client";
import Image from "next/image";
import { Tabs } from "./Tabs";

export function TabsDemo() {
    const tabs = [
        {
            title: "CarCheck",
            value: "product",
            link: "/carcheck",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    <img
                        src="/aspacarcheckbanner.png"
                        alt="carcheck-data"
                        title="carcheck-data"
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
        {
            title: "Audit",
            value: "services",
            link: "/auditorias",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    <img
                        src="/aspaAuditBanner.png"
                        alt="Auditorias-data"
                        title="Auditorias-data"
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
        {
            title: "Páginas Web",
            value: "playground",
            link: "/desarrollo-web",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    <img
                        src="/desarrolloWebBanner.png"
                        alt="Paginas-Web-data"
                        title="Paginas-Web-data"
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
        {
            title: "Apps a Medida",
            value: "content",
            link: "/apps-a-medida",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl  text-center align-middle justify-center font-bold text-white  from-blue-500 to-blue-900">
                    <img
                        src="/appsAMedidaBanner.png"
                        alt="Apps-a-Medida-data"
                        title="Apps-a-Medida-data"
                        className="rounded-2xl"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="h-[20rem] md:h-[37rem] bg-black [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-10 mb-40">
            <Tabs tabs={tabs} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <Image
            src="/desarrollado.jpg"
            alt="image"
            title="image"
            width="500"
            height="500"
            className="object-cover object-left-top h-[90%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};
