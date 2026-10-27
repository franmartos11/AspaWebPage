import { PlanesView, planesMeta } from "@/views/planes/PlanesView";

export const metadata = planesMeta("es");

export default function Page() {
  return <PlanesView lang="es" />;
}
