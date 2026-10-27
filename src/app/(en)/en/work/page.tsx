import { CasosView, casosMeta } from "@/views/casos/CasosView";

export const metadata = casosMeta("en");

export default function Page() {
  return <CasosView lang="en" />;
}
