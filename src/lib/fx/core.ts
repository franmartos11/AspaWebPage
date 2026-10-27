// Utilidades del sistema de movimiento y un único "tick" por cuadro.
// El original corría un requestAnimationFrame permanente; acá el tick se pide
// solo cuando hay scroll, resize o alguna animación que lo necesite.

export const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
export const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => [...c.querySelectorAll<T>(s)];
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const EXPO = "cubic-bezier(.16,1,.3,1)";

/** Idioma de la página (lo fija el layout raíz en <html lang>): para los textos que arma el movimiento. */
export const pageLang = (): "es" | "en" => (document.documentElement.lang.startsWith("en") ? "en" : "es");

export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isDesk = () => innerWidth > 980;

type Tick = (now: number) => boolean | void; // devolver true pide otro cuadro

const ticks = new Set<Tick>();
let raf = 0;

function frame(now: number) {
  raf = 0;
  let again = false;
  ticks.forEach((t) => {
    if (t(now)) again = true;
  });
  if (again) requestTick();
}

export function requestTick() {
  if (!raf) raf = requestAnimationFrame(frame);
}

/** Registra una función que corre en cada cuadro pedido. Devuelve la función para quitarla. */
export function onTick(t: Tick) {
  ticks.add(t);
  requestTick();
  return () => ticks.delete(t);
}

let wired = false;
/** Escucha scroll y resize una sola vez para todo el sitio. */
export function wireScroll() {
  if (wired) return;
  wired = true;
  addEventListener("scroll", requestTick, { passive: true });
  addEventListener("resize", requestTick);
}

/** Corre fn cuando las fuentes ya cargaron (los cortes por línea dependen del ancho real del texto). */
export const fontsReady = () => (document.fonts ? document.fonts.ready : Promise.resolve());
