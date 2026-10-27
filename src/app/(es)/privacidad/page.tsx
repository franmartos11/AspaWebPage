import { PrivacidadView, privacidadMeta } from "@/views/privacidad/PrivacidadView";

export const metadata = privacidadMeta("es");

export default function Page() {
  return <PrivacidadView lang="es" />;
}
