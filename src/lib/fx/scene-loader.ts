// Carga diferida de una escena 3D (sin Three.js en el bundle de la página): en escritorio cuando
// la escena está a menos de una pantalla, en táctiles con la primera interacción. Mientras tanto
// (y sin WebGL, con movimiento reducido o si falla) se ve la imagen de respaldo (.m3d-fb).
import { reducedMotion } from "./core";

type Loader = () => Promise<{ mount: (el: HTMLElement) => () => void }>;

export function lazyScene(el: HTMLElement, load: Loader) {
  const html = document.documentElement;
  if (!html.classList.contains("has3d") || reducedMotion()) return () => {};
  let unmount: (() => void) | null = null,
    started = false,
    alive = true;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const start = () => {
    if (started) return;
    started = true;
    io.disconnect();
    events.forEach((e) => removeEventListener(e, onInput));
    const timer = setTimeout(() => !el.classList.contains("live") && el.classList.add("fb-show"), 9000);
    load()
      .then((m) => {
        if (alive) unmount = m.mount(el);
      })
      .catch((err) => {
        console.warn("3D desactivado:", err);
        el.classList.add("fb-show");
      })
      .finally(() => clearTimeout(timer));
  };
  // táctil: recién con la primera interacción (y si la escena está cerca)
  let near = false;
  const onInput = () => near && start();
  const events = ["scroll", "pointerdown", "touchstart", "keydown"];
  const io = new IntersectionObserver(
    (es) => {
      near = es[0].isIntersecting;
      if (near && !coarse) start();
    },
    { rootMargin: "100% 0px" },
  );
  io.observe(el);
  if (coarse) events.forEach((e) => addEventListener(e, onInput, { passive: true }));
  return () => {
    alive = false;
    io.disconnect();
    events.forEach((e) => removeEventListener(e, onInput));
    unmount?.();
  };
}
