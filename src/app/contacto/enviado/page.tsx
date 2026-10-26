import type { Metadata } from "next";
import { Notice } from "@/components/Notice";

export const metadata: Metadata = { title: "Mensaje enviado", robots: { index: false, follow: true } };

export default function Page() {
  return <Notice ok={true} />;
}
