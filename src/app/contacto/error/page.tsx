import type { Metadata } from "next";
import { Notice } from "@/components/Notice";

export const metadata: Metadata = { title: "No pudimos enviar el mensaje", robots: { index: false, follow: true } };

export default function Page() {
  return <Notice ok={false} />;
}
