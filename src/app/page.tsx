import Services from "./Components/ServiceShowcase/Services";
import { HeroHome } from "./Components/HeroHome/HeroHome";
import { CardHome } from "./Components/CardsHome/CardHome";
import { TextGenerateEffect } from "./Components/GenerativeText/TextGenerateEffect";
import NavBar from "./Components/nav/NavBar";
import { BentoGridDemo } from "./Components/Grid/BentoGridDemo";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Partners from "./Components/Partners/Partners";
import { AnimatedPinDemo } from "./Components/TeamDisplay/AnimatedPinDemo";
import Showcase from "./Components/ttt/Showcase";



export default function Home() {
    return (
        <div>
            <NavBar></NavBar>
            <HeroHome></HeroHome>
            <div className="flex justify-center items-center h-20rem ">
                <div className="text-center  w-[60rem]">
                    <TextGenerateEffect words="Creamos Aspa con el objetivo de poder brindar a las empresas un software o sistemas de información que puedan ayudar a cumplir sus objetivos." />
                </div>
            </div>
            <CardHomeTriple></CardHomeTriple>
            <Showcase></Showcase>
            <AnimatedPinDemo></AnimatedPinDemo>
            <Partners></Partners>
        </div>
    );
}
