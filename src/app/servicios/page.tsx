import CardProyect from "../Components/CardProyect/CardProyect";
import CardProyectApp from "../Components/CardProyect/CardProyectApp";
import CardProyectImgGrid from "../Components/CardProyect/CardProyectImgGrid";
import CardProyectWeb from "../Components/CardProyect/CardProyectWebs";
import { MacbookScrollDemo } from "../Components/MackBookScroll/MacbookScrollDemo";
import Nav from "../Components/nav/Nav";
import ServicesPage from "../Components/servicesPage/ServicesPage";

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