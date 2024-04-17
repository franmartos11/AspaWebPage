import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MacbookScroll } from "./Mackbookscroll";

export function MacbookScrollDemo() {
    return (
        <div className="overflow-hidden  w-full">
            <MacbookScroll
                title={
                    <span className=" text-5xl" >
                        Estás listo para aprovechar las ventajas<br/>del desarrollo web?
                    </span>
                }
                badge={
                    <Link title="link" target="_blank" href="https://ar.linkedin.com/company/aspa-sofware-development">
                        <Badge className="h-10 w-10 transform -rotate-12" />
                    </Link>
                }
                src={`/aspahome6.png`}
                showGradient={false}
            />
        </div>
    );
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
    return (
        <Image
            alt="badge"
            title="badge"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="/aspaLogo.webp"
            width={50}
            height={50}
        ></Image>
    );
};
