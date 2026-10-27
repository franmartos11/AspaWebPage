import { CasosView, casosMeta } from "@/views/casos/CasosView";

export const metadata = casosMeta("es");

export default function Page() {
  return <CasosView lang="es" />;
}
