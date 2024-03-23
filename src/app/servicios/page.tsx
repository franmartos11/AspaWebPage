import GrowStats from "../Components/GrowStats/GrowStats";
import ShowServices from "../Components/ServicesC/ShowServices";
import NavBar from "../Components/nav/NavBar";

export default function(){
    return(
        <div>
            <NavBar></NavBar>
            <GrowStats></GrowStats>
            <ShowServices></ShowServices>
        </div>
    )
}