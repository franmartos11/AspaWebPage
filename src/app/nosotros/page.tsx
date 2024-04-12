import AboutMeEvents from "../Components/AboutMeEvents/AboutMeEvents";
import ImageWithContent from "../Components/ImageWithContent/ImageWithContent";
import ImageWithContent2 from "../Components/ImageWithContent/ImageWithContent2";
import NosotrosTeam from "../Components/NosotrosTeam/NosotrosTeam";
import Partners from "../Components/Partners/Partners";
import ShowServices from "../Components/ServicesC/ShowServices";
import HomeTeam from "../Components/home-team/HomeTeam";
import Nav from "../Components/nav/Nav";


export default function () {
    return (
        <div>
            <Nav page={"nosotros"}></Nav>
            <NosotrosTeam></NosotrosTeam>
            <ImageWithContent></ImageWithContent>
            <AboutMeEvents></AboutMeEvents>
            <ImageWithContent2></ImageWithContent2>
            <Partners></Partners>
        </div>
    );


}
