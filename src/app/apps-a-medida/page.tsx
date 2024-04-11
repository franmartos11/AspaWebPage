import Form from "../Components/Forms/Form";
import { TracingBeamCarcheck } from "../Components/TricingBean/TracingBeamCarcheck";
import { TracingBeamApps } from "../Components/TricingBean/TracingBeanApps";
import Nav from "../Components/nav/Nav";


export default function () {
    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <TracingBeamApps></TracingBeamApps>
            <Form service="Apps-a-medida"  ></Form>
        </div>
    );
}