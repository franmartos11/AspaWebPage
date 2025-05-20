import { TracingBeamCarcheck } from "../Components/TricingBean/TracingBeamCarcheck";
import Nav from "../Components/nav/Nav";

export default function () {
  return (
    <div className="bg-black">
      <Nav page={"servicios"}></Nav>
      <TracingBeamCarcheck></TracingBeamCarcheck>
    </div>
  );
}
