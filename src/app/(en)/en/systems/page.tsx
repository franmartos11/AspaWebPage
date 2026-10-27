import { SistemasView, sistemasMeta } from "@/views/sistemas/SistemasView";

export const metadata = sistemasMeta("en");

export default function Page() {
  return <SistemasView lang="en" />;
}
