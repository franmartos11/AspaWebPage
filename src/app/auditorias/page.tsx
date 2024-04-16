import Form from "../Components/Forms/Form";
import TracingBeamAuditorias from "../Components/TricingBean/TracingBeamAuditorias";
import Nav from "../Components/nav/Nav";


export default function () {
    return (
        <div>
            <Nav page={"servicios"}></Nav>
            <TracingBeamAuditorias></TracingBeamAuditorias>
            <Form service="Auditorias"  ></Form>
        </div>
    );
}