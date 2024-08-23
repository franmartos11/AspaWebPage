'use client'
import { cn } from "@/utils/cn"; 
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
 
export function FeaturesSectionDemo2() {
  const features = [
    {
      title: "Genera Presupuestos",
      description:
        "Crea presupuestos precisos para servicios y reparaciones, calculando automáticamente los costos de piezas y mano de obra.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Registra clientes",
      description:
        "Guarda y gestiona la información de tus clientes, incluyendo datos de contacto y el historial de servicios.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Registra Vehiculos",
      description:
        "Mantén un registro detallado de los vehículos, con información sobre marca, modelo y servicios realizados",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ordena tu Stock",
      description: "Controla tu inventario de piezas y materiales, realiza inventarios y gestiona pedidos de manera eficiente.",
      icon: <IconCloud />,
    },
    {
      title: "Asigna Turnos",
      description: "Asigna turnos a los clientes para manejar mejor tu tiempo.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Registra Servicios",
      description:
        "Documenta cada servicio realizado, incluyendo fecha, descripción y costo, para un historial completo.",
      icon: <IconHelp />,
    },
    {
      title: "Registra ingresos",
      description:
        "Registra cada ingreso de vehiculo para una gestión eficiente.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Organiza tus trabajos",
      description: "Coordina y prioriza trabajos pendientes, asigna tareas y supervisa el progreso para una gestión eficiente.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}
 
const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};