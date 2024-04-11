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
                    <Link href="/https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A85621550&keywords=aspa&origin=RICH_QUERY_SUGGESTION&position=0&searchId=21a66180-1022-4554-805c-4a49c9de9c92&sid=80)&spellCorrectionEnabled=false">
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
            alt="gallery"
            className="block h-full w-full rounded-lg object-cover object-center"
            src="/aspaLogo.webp"
            width={50}
            height={50}
        ></Image>
    );
};
