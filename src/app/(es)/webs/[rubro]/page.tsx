import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { isRubro } from "@/lib/rubros";
import { RUBROS } from "@/lib/webs";
import { RubroView, rubroMeta } from "@/views/rubro/RubroView";

type Props = { params: Promise<{ rubro: string }> };

export function generateStaticParams() {
  return RUBROS.map((r) => ({ rubro: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).rubro;
  return isRubro(slug) ? rubroMeta("es", slug) : {};
}

// Los params van dentro de <Suspense> (requisito de cacheComponents para la navegación); como
// generateStaticParams lista los 7 rubros, cada página igual se genera completa en el build.
export default function Page({ params }: Props) {
  return (
    <main id="main" className="view">
      <Suspense>
        <Rubro params={params} />
      </Suspense>
    </main>
  );
}

async function Rubro({ params }: Props) {
  const slug = (await params).rubro;
  if (!isRubro(slug)) notFound();
  return <RubroView lang="es" slug={slug} />;
}
