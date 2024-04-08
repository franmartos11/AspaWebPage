import BentoGrid from "../Components/BendoGrid/BentoGrid";
import CardProyect from "../Components/CardProyect/CardProyect";
import CardProyectImgGrid from "../Components/CardProyect/CardProyectImgGrid";
import GrowStats from "../Components/GrowStats/GrowStats";
import ShowServices from "../Components/ServicesC/ShowServices";
import Nav from "../Components/nav/Nav";
import NavBar from "../Components/nav/NavBar";

export default function(){
    return(
        <div>
            <Nav page={"servicios"}></Nav>
            <BentoGrid></BentoGrid>
            <CardProyect></CardProyect>
            <CardProyectImgGrid></CardProyectImgGrid>
            
            <GrowStats></GrowStats>           
        </div>
    )
}