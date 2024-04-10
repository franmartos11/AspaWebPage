import BentoGrid from "../Components/BendoGrid/BentoGrid";
import CardProyect from "../Components/CardProyect/CardProyect";
import CardProyectApp from "../Components/CardProyect/CardProyectApp";
import CardProyectImgGrid from "../Components/CardProyect/CardProyectImgGrid";
import CardProyectWeb from "../Components/CardProyect/CardProyectWebs";
import GrowStats from "../Components/GrowStats/GrowStats";
import { MacbookScrollDemo } from "../Components/MackBookScroll/MacbookScrollDemo";
import { MacbookScroll } from "../Components/MackBookScroll/Mackbookscroll";
import Services from "../Components/ServiceShowcase/Services";
import ShowServices from "../Components/ServicesC/ShowServices";
import Nav from "../Components/nav/Nav";
import NavBar from "../Components/nav/NavBar";
import ServicesPage from "../Components/servicesPage/ServicesPage";
import { TabsDemo } from "../Components/tabs/TabsDemo";

export default function(){

    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <ServicesPage></ServicesPage>
            <CardProyect></CardProyect>
            <CardProyectImgGrid></CardProyectImgGrid>
            <MacbookScrollDemo></MacbookScrollDemo>
            <CardProyectWeb></CardProyectWeb>
            <CardProyectImgGrid></CardProyectImgGrid>
            <CardProyectApp></CardProyectApp>
            <CardProyectImgGrid></CardProyectImgGrid>
        </div>
    );
}