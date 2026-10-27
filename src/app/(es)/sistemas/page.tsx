import { SistemasView, sistemasMeta } from "@/views/sistemas/SistemasView";

export const metadata = sistemasMeta("es");

export default function Page() {
  return <SistemasView lang="es" />;
}
