import Form from "../Components/Forms/Form";
import { TracingBeamCarcheck } from "../Components/TricingBean/TracingBeamCarcheck";
import Nav from "../Components/nav/Nav";


export default function () {
    return (
        <div className="bg-black">
            <Nav page={"servicios"}></Nav>
            <TracingBeamCarcheck></TracingBeamCarcheck>
            <Form service="Carcheck"  ></Form>
        </div>
    );
}