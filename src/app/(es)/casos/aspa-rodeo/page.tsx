import { CasoView, casoMeta } from "@/views/caso/CasoView";

export const metadata = casoMeta("aspa-rodeo", "es");

export default function Page() {
  return <CasoView slug="aspa-rodeo" lang="es" />;
}
