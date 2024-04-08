import { HeroHome } from "./Components/HeroHome/HeroHome";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Partners from "./Components/Partners/Partners";
import HomeTeam from "./Components/home-team/HomeTeam";
import ShowServices from "./Components/ServicesC/ShowServices";
import Nav from "./Components/nav/Nav";
import { HeroScrollDemo } from "./Components/Tablet/HeroScrollDemo";

export default function Home() {
    return (
        <div>
            <Nav page={"home"}></Nav>
            <HeroHome></HeroHome>
            <HeroScrollDemo></HeroScrollDemo>
            <CardHomeTriple></CardHomeTriple>
            <ShowServices></ShowServices>
            <HomeTeam></HomeTeam>
            <Partners></Partners>
        </div>
    );
}
