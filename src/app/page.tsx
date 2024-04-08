import { HeroHome } from "./Components/HeroHome/HeroHome";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Partners from "./Components/Partners/Partners";
import HomeTeam from "./Components/home-team/HomeTeam";
import ShowServices from "./Components/ServicesC/ShowServices";
import Nav from "./Components/nav/Nav";
import { HeroScrollDemo } from "./Components/Tablet/HeroScrollDemo";
import BentoGrid from "./Components/BendoGrid/BentoGrid";
import CarrouselMamado from "./Components/carrouselScroll/CarrouselMamado";

export default function Home() {
    return (
        <div>
            <Nav page={"home"}></Nav>
            <HeroHome></HeroHome>
            <HeroScrollDemo></HeroScrollDemo>
            <CarrouselMamado></CarrouselMamado>
            <BentoGrid></BentoGrid>
            <CardHomeTriple></CardHomeTriple>
            
            <HomeTeam></HomeTeam>
            <Partners></Partners>
        </div>
    );
}
