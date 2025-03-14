import Form from "../Components/Forms/Form";
import Nav from "../Components/nav/Nav";
import DevelopmentMethodology from "./DevelopmentMethodology";
import Ventajas from "./Ventajas";


export default function () {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-black">
            <Nav page={"servicios"}></Nav>
            <Ventajas></Ventajas>
            <DevelopmentMethodology></DevelopmentMethodology>
            <Form service={"Apps-a-medida"}></Form>
        </div>
    );
}