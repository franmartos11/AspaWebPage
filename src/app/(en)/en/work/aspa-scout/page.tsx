import { CasoView, casoMeta } from "@/views/caso/CasoView";

export const metadata = casoMeta("aspa-scout", "en");

export default function Page() {
  return <CasoView slug="aspa-scout" lang="en" />;
}
