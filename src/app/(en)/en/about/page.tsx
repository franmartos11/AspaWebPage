import { NosotrosView, nosotrosMeta } from "@/views/nosotros/NosotrosView";

export const metadata = nosotrosMeta("en");

export default function Page() {
  return <NosotrosView lang="en" />;
}
