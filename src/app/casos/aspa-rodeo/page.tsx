import type { Metadata } from "next";
import { CasoPage } from "@/components/Caso";
import { CASOS } from "@/lib/casos";
import { pageMeta } from "@/lib/seo";
import "@/styles/prodname.css";
import "../casos.css";

const c = CASOS["aspa-rodeo"];

export const metadata: Metadata = pageMeta({ path: c.path, title: c.seoTitle, description: c.description });

export default function Page() {
  return <CasoPage c={c} />;
}
