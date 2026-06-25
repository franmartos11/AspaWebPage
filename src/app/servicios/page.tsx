import { TracingBeamDemo } from "../Components/TricingBean/TracingBeamWrapper";
import Nav from "../Components/nav/Nav";
import ServicesPage from "../Components/servicesPage/ServicesPage";
import { Methodology } from "../Components/servicesPage/Methodology";
import { TechStack } from "../Components/servicesPage/TechStack";
import { CTA } from "../Components/servicesPage/CTA";

export default function () {
  return (
    <div className="bg-black">
      <Nav page={"servicios"}></Nav>
      <ServicesPage></ServicesPage>
      <Methodology></Methodology>
      <TechStack></TechStack>
      <TracingBeamDemo></TracingBeamDemo>
      <CTA></CTA>
    </div>
  );
}
