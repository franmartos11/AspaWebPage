import { HeroHome } from "./Components/HeroHome/HeroHome";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import HomeTeam from "./Components/home-team/HomeTeam";
import Nav from "./Components/nav/Nav";
import { HeroScrollDemo } from "./Components/Tablet/HeroScrollDemo";
import { TabsDemo } from "./Components/tabs/TabsDemo";
import MoovingLogos from "./Components/MoovingLogos/MoovingLogos";
import { useLanguage } from "./Components/AALenguageContext/LenguageContext";



export default function Home( ) {
    
    return (
        <div className="bg-black">
            <Nav page={"home"}></Nav>
            <HeroHome></HeroHome>
            <HeroScrollDemo></HeroScrollDemo>           
            <TabsDemo></TabsDemo>
            <CardHomeTriple></CardHomeTriple>
            <HomeTeam></HomeTeam>
            <MoovingLogos></MoovingLogos>
        </div>
    );
}
