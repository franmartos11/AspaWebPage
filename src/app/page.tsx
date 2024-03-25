import { HeroHome } from "./Components/HeroHome/HeroHome";
import NavBar from "./Components/nav/NavBar";
import { BentoGridDemo } from "./Components/Grid/BentoGridDemo";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Partners from "./Components/Partners/Partners";
import Showcase from "./Components/ttt/Showcase";
import HomeTeam from "./Components/home-team/HomeTeam";
import BentoGrid from "./Components/BendoGrid/BentoGrid";




export default function Home() {
    return (
        <div>
            <NavBar></NavBar>
            <HeroHome></HeroHome>
            <Showcase></Showcase>
            
            <CardHomeTriple></CardHomeTriple>
            <HomeTeam></HomeTeam>
            <Partners></Partners>
            
        </div>
    );
}
