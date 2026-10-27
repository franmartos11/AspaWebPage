import { PrivacidadView, privacidadMeta } from "@/views/privacidad/PrivacidadView";

export const metadata = privacidadMeta("en");

export default function Page() {
  return <PrivacidadView lang="en" />;
}
