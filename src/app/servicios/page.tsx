import BentoGrid from "../Components/BendoGrid/BentoGrid";
import CardProyect from "../Components/CardProyect/CardProyect";
import CardProyectImgGrid from "../Components/CardProyect/CardProyectImgGrid";
import GrowStats from "../Components/GrowStats/GrowStats";
import ShowServices from "../Components/ServicesC/ShowServices";
import Nav from "../Components/nav/Nav";
import NavBar from "../Components/nav/NavBar";
import ServicesPage from "../Components/servicesPage/ServicesPage";
import { TabsDemo } from "../Components/tabs/TabsDemo";

export default function(){
    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <div className="flex justify-center align-middle text-center">
                <p className="sm:text-7xl text-4xl sm:pt-[10rem] pt-[3rem] pb-[0rem] font-bold sm:pb-[4rem]">
                    NUESTROS SERVICIOS
                </p>
            </div>
            <CardProyect></CardProyect>
            <CardProyectImgGrid></CardProyectImgGrid>
            <GrowStats></GrowStats>
        </div>
    );
}