import { TracingBeamApps } from "../Components/TricingBean/TracingBeanApps";
import Nav from "../Components/nav/Nav";
import DevelopmentMethodology from "./DevelopmentMethodology";
import { Hero } from "./Hero";
import Ventajas from "./Ventajas";


export default function () {
    return (
        <div className="bg-black">
            <Nav page={"servicios"}></Nav>
            <Ventajas></Ventajas>
            <DevelopmentMethodology></DevelopmentMethodology>
            
            
        </div>
    );
}