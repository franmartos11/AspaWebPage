import { TracingBeamDemo } from "../Components/TricingBean/TracingBeamWrapper";
import Nav from "../Components/nav/Nav";
import ServicesPage from "../Components/servicesPage/ServicesPage";

export default function () {
    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <TracingBeamDemo></TracingBeamDemo>
        </div>
    );
}