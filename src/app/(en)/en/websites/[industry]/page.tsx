import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RUBRO_SLUGS } from "@/i18n";
import { RubroView, rubroFromEn, rubroMeta } from "@/views/rubro/RubroView";

type Props = { params: Promise<{ industry: string }> };

export function generateStaticParams() {
  return Object.values(RUBRO_SLUGS).map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = rubroFromEn((await params).industry);
  return slug ? rubroMeta("en", slug) : {};
}

// Los params van dentro de <Suspense> (requisito de cacheComponents para la navegación); como
// generateStaticParams lista los 7 rubros, cada página igual se genera completa en el build.
export default function Page({ params }: Props) {
  return (
    <main id="main" className="view">
      <Suspense>
        <Industry params={params} />
      </Suspense>
    </main>
  );
}

async function Industry({ params }: Props) {
  const slug = rubroFromEn((await params).industry);
  if (!slug) notFound();
  return <RubroView lang="en" slug={slug} />;
}
