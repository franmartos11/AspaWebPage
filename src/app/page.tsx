import { HeroHome } from "./Components/HeroHome/HeroHome";
import NavBar from "./Components/nav/NavBar";
import { BentoGridDemo } from "./Components/Grid/BentoGridDemo";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Partners from "./Components/Partners/Partners";
import Showcase from "./Components/ttt/Showcase";
import HomeTeam from "./Components/home-team/HomeTeam";
import BentoGrid from "./Components/BendoGrid/BentoGrid";
import ShowServices from "./Components/ServicesC/ShowServices";
import Nav from "./Components/nav/Nav";




export default function Home() {
    return (
        <div>
            <Nav page={"home"}></Nav>
            <HeroHome></HeroHome>
            <ShowServices></ShowServices>
            <CardHomeTriple></CardHomeTriple>
            <HomeTeam></HomeTeam>
            <Partners></Partners>
        </div>
    );
}
