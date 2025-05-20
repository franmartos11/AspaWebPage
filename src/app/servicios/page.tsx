import { TracingBeamDemo } from "../Components/TricingBean/TracingBeamWrapper";
import Nav from "../Components/nav/Nav";
import ServicesPage from "../Components/servicesPage/ServicesPage";

export default function () {
  return (
    <div className="bg-black">
      <Nav page={"servicios"}></Nav>
      <ServicesPage></ServicesPage>
      <TracingBeamDemo></TracingBeamDemo>
    </div>
  );
}
