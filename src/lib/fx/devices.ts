// WEBS · visor del selector de rubros: la web de cada rubro en la MacBook (escritorio) y el
// iPhone (celular). Este módulo es liviano (sin Three.js): maneja la leyenda, la imagen de
// respaldo y la carga diferida de la escena (devices3d.ts), como la notebook del Home.
import { reducedMotion } from "./core";

export type WebView = {
  /** nombre de la web (leyenda del visor y barra del navegador) */
  name: string;
  /** captura de escritorio: /webs-3d/<d>.webp (≈1600 px) y /webs-3d/<d>-sm.webp (≈900 px) */
  d: string;
  /** captura de celular: /webs-3d/<m>.webp (≈600 px); null = el rubro no tiene versión celular */
  m: string | null;
};

// rubro → web que se muestra (VIEW + WEBS del diseño)
export const RUBRO_WEBS: Record<string, WebView> = {
  arquitectos: { name: "Paula Gil", d: "paula-gil-desktop", m: "paula-gil-mobile" },
  "estudios-de-arquitectura": { name: "Obliqua", d: "obliqua-desktop", m: "obliqua-mobile" },
  interiorismo: { name: "Nogal", d: "nogal-desktop", m: null },
  constructoras: { name: "DH Engineering", d: "dh-engineering-desktop", m: "dh-engineering-mobile" },
  "constructoras-de-vivienda": { name: "Casa Norte", d: "casa-norte-desktop", m: "casa-norte-mobile" },
  "steel-framing": { name: "Trama", d: "trama-desktop", m: null },
  desarrollistas: { name: "Architecture 360", d: "architecture-360-desktop", m: "architecture-360-mobile" },
};
export const FIRST_RUBRO = "arquitectos";

/** Ruta de una captura del visor (sm: la versión de ≈900 px de las de escritorio). */
export const webShot = (key: string, sm = false) => `/webs-3d/${key}${sm ? "-sm" : ""}.webp`;

type Scene = { show(v: WebView): void; dispose(): void };

/**
 * Monta el visor en .rb-viewer (con .m3d.dev-3d, su .dev-2d img de respaldo y .dev-cap).
 * set(slug) cambia de web (leyenda e imagen al instante, pantallas con su transición);
 * off() lo desarma todo.
 */
export function initDevices(viewer: HTMLElement): { set(slug: string): void; off(): void } {
  const m = viewer.querySelector<HTMLElement>(".m3d");
  const cap = viewer.querySelector<HTMLElement>(".dev-cap");
  const fb = viewer.querySelector<HTMLElement>(".dev-2d");
  const html = document.documentElement;
  let cur: string | null = null;
  let scene: Scene | null = null;
  let dead = false;
  let swapT = 0;

  const set = (slug: string) => {
    const v = RUBRO_WEBS[slug];
    if (!v || slug === cur) return;
    cur = slug;
    if (cap) {
      const b = document.createElement("b");
      b.textContent = v.name;
      cap.replaceChildren(b);
    }
    // respaldo: la captura de escritorio (sin el srcset de next/image, que pisaría el src)
    const img = fb?.querySelector("img");
    if (img) {
      img.removeAttribute("srcset");
      img.removeAttribute("sizes");
      img.src = webShot(v.d, true);
    }
    // como en el diseño: pasar rápido por varios rubros no dispara una transición por cada uno
    clearTimeout(swapT);
    swapT = window.setTimeout(() => scene?.show(v), 90);
  };

  const noop = { set, off: () => clearTimeout(swapT) };
  if (!m || !html.classList.contains("has3d") || reducedMotion()) return noop;

  // La escena se descarga en diferido: en escritorio cuando el visor se acerca a la vista y la
  // página está ociosa; en táctiles recién con la primera interacción. Mientras, la imagen fija.
  const coarse = matchMedia("(pointer: coarse)").matches;
  let started = false,
    idle = 0,
    timer = 0;
  const showFallback = (on: boolean) => fb && (fb.style.opacity = on ? "1" : "");
  const start = () => {
    if (started || dead) return;
    started = true;
    cleanupTriggers();
    // si en 9 s no arrancó, que se vea la imagen fija (se vuelve a ocultar si arranca después)
    timer = window.setTimeout(() => !m.classList.contains("live") && showFallback(true), 9000);
    import("./devices3d")
      .then(({ mountDevices }) => {
        if (dead) return;
        scene = mountDevices(m, viewer, RUBRO_WEBS[cur ?? FIRST_RUBRO], coarse || innerWidth < 981, () => showFallback(false));
      })
      .catch((err) => {
        console.warn("3D desactivado:", err);
        html.classList.replace("has3d", "no3d");
        showFallback(true);
      })
      .finally(() => clearTimeout(timer));
  };
  const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"];
  const ric = (f: () => void) => (window.requestIdleCallback ? window.requestIdleCallback(f, { timeout: 1500 }) : window.setTimeout(f, 1));
  let io: IntersectionObserver | null = null;
  const later = () => (idle = window.setTimeout(() => ric(start), 4000));
  const cleanupTriggers = () => {
    events.forEach((e) => removeEventListener(e, start));
    removeEventListener("load", later);
    io?.disconnect();
    clearTimeout(idle);
  };
  if (coarse) events.forEach((e) => addEventListener(e, start, { passive: true, once: true }));
  else {
    // cerca de la vista (a menos de una pantalla) → apenas el navegador quede libre
    io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && ric(start), { rootMargin: "100% 0px" });
    io.observe(viewer);
    // y si no, igual se precarga después de que la página terminó de cargar
    if (document.readyState === "complete") later();
    else addEventListener("load", later, { once: true });
  }

  return {
    set,
    off() {
      dead = true;
      clearTimeout(swapT);
      clearTimeout(timer);
      cleanupTriggers();
      scene?.dispose();
      scene = null;
      showFallback(false);
    },
  };
}
