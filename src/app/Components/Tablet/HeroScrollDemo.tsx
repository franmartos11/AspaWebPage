"use client";
import React from "react";
import { ContainerScroll, ScrollStep } from "./ContainerScroll";
import { stepVisualComponents } from "./StepVisuals";
import { useLanguage } from "../AALenguageContext/LenguageContext";

export function HeroScrollDemo() {
  const { language } = useLanguage("es");

  const steps: Record<string, ScrollStep[]> = {
    es: [
      {
        label: "Lo que hacemos",
        title: "Automatizamos tus procesos",
        description:
          "Creamos software a medida que elimina tareas repetitivas y libera a tu equipo para lo que realmente importa.",
      },
      {
        label: "Cómo lo hacemos",
        title: "Desarrollamos tu idea",
        description:
          "Desde el concepto hasta el deployment. Nuestro equipo se encarga de cada detalle técnico, vos solo te enfocás en crecer.",
      },
      {
        label: "Para qué sirve",
        title: "Digitalizamos tu empresa",
        description:
          "Tu negocio gana velocidad, eficiencia y ventaja competitiva con herramientas hechas exactamente para vos.",
      },
    ],
    en: [
      {
        label: "What we do",
        title: "We automate your processes",
        description:
          "Custom software that eliminates repetitive tasks and frees your team to focus on what truly matters.",
      },
      {
        label: "How we do it",
        title: "We develop your idea",
        description:
          "From concept to deployment. Our team takes care of every technical detail, you just focus on growing.",
      },
      {
        label: "Why it matters",
        title: "We digitize your business",
        description:
          "Your business gains speed, efficiency, and competitive advantage with tools built exactly for you.",
      },
    ],
  };

  return (
    <div className="bg-black">
      <ContainerScroll steps={steps[language] ?? steps.es} stepVisuals={stepVisualComponents} />
    </div>
  );
}
