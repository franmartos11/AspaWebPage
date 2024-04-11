import Form from "../Components/Forms/Form";
import { TracingBeamWeb } from "../Components/TricingBean/TracingBeansWeb";
import Nav from "../Components/nav/Nav";

export default function () {
    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <TracingBeamWeb></TracingBeamWeb>
            <Form service="Pag-web"  ></Form>
        </div>
    );
}