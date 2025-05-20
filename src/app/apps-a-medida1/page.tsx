import { TracingBeamApps } from "../Components/TricingBean/TracingBeanApps";
import Nav from "../Components/nav/Nav";

export default function () {
  return (
    <div className="bg-black">
      <Nav page={"servicios"}></Nav>
      <TracingBeamApps></TracingBeamApps>
    </div>
  );
}
