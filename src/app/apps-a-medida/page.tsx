import Form from "../Components/Forms/Form";
import Nav from "../Components/nav/Nav";
import { AppHero } from "./components/AppHero";
import Ventajas from "./Ventajas";
import DevelopmentMethodology from "./DevelopmentMethodology";
import { AppTechStack } from "./components/AppTechStack";
import { AppProjectsGrid } from "./components/AppProjectsGrid";

export default function AppsAMedidaPage() {
  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <Nav page={"servicios"}></Nav>
      
      <div className="relative z-10">
        <AppHero />
        <Ventajas />
        <DevelopmentMethodology />
        <AppTechStack />
        <AppProjectsGrid />
      </div>

      <Form service={"Apps-a-medida"}></Form>
    </div>
  );
}
