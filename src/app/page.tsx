import { HeroHome } from "./Components/HeroHome/HeroHome";
import CardHomeTriple from "./Components/CardsHome/CardHomeTriple";
import Partners from "./Components/Partners/Partners";
import HomeTeam from "./Components/home-team/HomeTeam";
import Nav from "./Components/nav/Nav";
import { HeroScrollDemo } from "./Components/Tablet/HeroScrollDemo";
import { TabsDemo } from "./Components/tabs/TabsDemo";
import MoovingLogosPartners from "./Components/MoovingLogos/MoovingLogosPartners";

export default function Home() {
    return (
        <div>
            <Nav page={"home"}></Nav>
            <HeroHome></HeroHome>
            <HeroScrollDemo></HeroScrollDemo>
            <div className="container    px-6 pt-7 pb-0 mx-auto sm:pt-0  ">
                <h2 className="text-4xl pt-16  font-semibold text-center  capitalize lg:text-6xl text-white">
                    Nuestros Servicios
                </h2>
                <div className="flex justify-center mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
            </div>
            <TabsDemo></TabsDemo>
            <CardHomeTriple></CardHomeTriple>
            <HomeTeam></HomeTeam>
            <Partners></Partners>
            <MoovingLogosPartners></MoovingLogosPartners>
        </div>
    );
}
