import { CasoView, casoMeta } from "@/views/caso/CasoView";

export const metadata = casoMeta("aspa-scout", "es");

export default function Page() {
  return <CasoView slug="aspa-scout" lang="es" />;
}
