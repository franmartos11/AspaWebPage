"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __fx?: boolean;
  }
}

/** Movimiento común a todo el sitio (header, menú, scroll suave, campo de luz, revelados del footer). */
export function SiteFx() {
  useEffect(() => {
    window.__fx = true;
    let off: (() => void) | undefined;
    let alive = true;
    import("@/lib/fx/site").then(({ initSite }) => {
      if (alive) off = initSite();
    });
    return () => {
      alive = false;
      off?.();
    };
  }, []);
  return null;
}

// Movimiento propio de cada página: se descarga solo en esa ruta.
const PAGES = {
  home: () => import("@/lib/fx/home").then((m) => m.initHome),
  sistemas: () => import("@/lib/fx/sistemas").then((m) => m.initSistemas),
  webs: () => import("@/lib/fx/webs").then((m) => m.initWebs),
  rubro: () => import("@/lib/fx/rubro").then((m) => m.initRubro),
  casos: () => import("@/lib/fx/casos").then((m) => m.initCasos),
  caso: () => import("@/lib/fx/casos").then((m) => m.initCaso),
  planes: () => import("@/lib/fx/faq").then((m) => m.initFaq),
  // páginas sin movimiento propio: solo los revelados
  nosotros: async () => () => () => {},
  texto: async () => () => () => {},
  contacto: () => import("@/lib/fx/contacto").then((m) => m.initContacto),
};

/** Movimiento de una página + los revelados (bloques, títulos por línea, contadores). */
export function PageFx({ page }: { page: keyof typeof PAGES }) {
  useEffect(() => {
    let off: (() => void)[] = [];
    let alive = true;
    Promise.all([PAGES[page](), import("@/lib/fx/reveal")]).then(([init, reveal]) => {
      if (!alive) return;
      const main = document.getElementById("main")!;
      off = [init(), reveal.initReveals(main)];
    });
    return () => {
      alive = false;
      off.forEach((f) => f());
    };
  }, [page]);
  return null;
}
