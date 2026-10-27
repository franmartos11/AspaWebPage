import { PlanesView, planesMeta } from "@/views/planes/PlanesView";

export const metadata = planesMeta("en");

export default function Page() {
  return <PlanesView lang="en" />;
}
