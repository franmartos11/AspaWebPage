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
import { CanvasRevealEffectDemo3 } from "./Components/RevealEffect/CanvasRevealEffectDemo3";
import DisplayOptions from "./Components/DisplayOptions/DisplayOptions";
import HomeTeam from "./Components/home-team/HomeTeam";
import Footer from "./Components/Footer/Footer";



export default function Home() {
    return (
        <div>
            <NavBar></NavBar>
            <HeroHome></HeroHome>
            <CardHomeTriple></CardHomeTriple>
            <Showcase></Showcase>
            <HomeTeam></HomeTeam>
            <Partners></Partners>
            
        </div>
    );
}
