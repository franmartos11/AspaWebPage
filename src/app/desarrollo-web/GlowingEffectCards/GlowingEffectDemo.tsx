"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "./GlowingEffect";

export function GlowingEffectDemo() {
  return (
    <div className="mt-[5rem]">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
        titulo
      </h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
        descripcion
      </p>

      <ul className="mx-[3rem] mt-[2rem] grid grid-cols-1 grid-rows-none gap-0 md:grid-cols-12 md:grid-rows-2 lg:gap-0 xl:max-h-[34rem] xl:grid-rows-2 place-items-stretch">
        {/* Dos tarjetas a la izquierda */}
        <GridItem
          area="md:[grid-area:1/1/2/6] xl:[grid-area:1/1/2/6]"
          icon={
            <Settings className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="📈 Optimización para Conversiones"
          description="Nuestras webs están diseñadas para convertir visitantes en clientes, maximizando las oportunidades de venta."
        />
        <GridItem
          area="md:[grid-area:2/1/3/6] xl:[grid-area:2/1/3/6]"
          icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="🚀 Webs Rápidas y Seguras"
          description="Desarrollamos sitios web ultra rápidos, optimizados para SEO y con las mejores prácticas de seguridad."
        />

        {/* Tarjeta centrada verticalmente y ocupando todo el espacio */}
        <GridItem
          area="md:[grid-area:1/6/3/8] xl:[grid-area:1/6/3/8]"
          icon={
            <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="🤝 Soporte y Mantenimiento Constante"
          description="No solo creamos tu web, también te acompañamos con soporte continuo y actualizaciones necesarias."
        />

        {/* Dos tarjetas a la derecha */}
        <GridItem
          area="md:[grid-area:1/8/2/13] xl:[grid-area:1/8/2/13]"
          icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="🎨 Diseño Profesional y Personalizado"
          description="Cada web es única, con un diseño moderno que refleja la identidad de tu marca y mejora la experiencia del usuario."
        />
        <GridItem
          area="md:[grid-area:2/8/3/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="🔍 Visibilidad en Motores de Búsqueda"
          description="Implementamos estrategias SEO avanzadas para que tu negocio destaque en Google y otros motores de búsqueda."
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={` min-h-[17rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
