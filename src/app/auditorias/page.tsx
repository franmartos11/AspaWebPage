import Form from "../Components/Forms/Form";
import TracingBeamAuditorias from "../Components/TricingBean/TracingBeamAuditorias";
import Nav from "../Components/nav/Nav";


export default function () {
    return (
        <div className="bg-black">
            <Nav page={"servicios"}></Nav>
            <TracingBeamAuditorias></TracingBeamAuditorias>
            <Form service="Auditorias"  ></Form>
        </div>
    );
}