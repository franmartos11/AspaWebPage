import Form from "../Components/Forms/Form";
import { TracingBeamWeb } from "../Components/TricingBean/TracingBeansWeb";
import Nav from "../Components/nav/Nav";

export default function () {
    return (
        <div className="bg-black">
            <Nav page={"servicios"}></Nav>
            <TracingBeamWeb></TracingBeamWeb>
            <Form service="Pag-web"></Form>
        </div>
    );
}
